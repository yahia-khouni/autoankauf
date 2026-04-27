import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { isLoginLocked, recordFailedLogin, clearLoginAttempts } from "@/lib/login-limiter";
import { logger } from "@/lib/logger";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();

        // Brute-force protection: block if too many recent failures
        if (isLoginLocked(email)) {
          logger.warn(`[Auth] Login blocked — too many attempts for: ${email}`);
          throw new Error("TOO_MANY_ATTEMPTS");
        }

        const admin = await prisma.admin.findUnique({
          where: { email },
        });

        if (!admin) {
          recordFailedLogin(email);
          return null;
        }

        const passwordValid = await bcrypt.compare(
          credentials.password,
          admin.passwordHash
        );

        if (!passwordValid) {
          const locked = recordFailedLogin(email);
          if (locked) {
            logger.warn(`[Auth] Account locked after repeated failures: ${email}`);
          }
          return null;
        }

        // Successful login — clear failure counter
        clearLoginAttempts(email);

        // Update lastLoginAt
        await prisma.admin.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name ?? admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};
