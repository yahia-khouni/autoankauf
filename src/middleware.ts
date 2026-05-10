import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { locales, defaultLocale } from "@/lib/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const adminLoginToken = process.env.ADMIN_LOGIN_TOKEN?.trim();
    const accessToken = request.nextUrl.searchParams.get("token")?.trim();
    const requiresLoginToken = Boolean(adminLoginToken);
    const hasValidLoginToken =
      requiresLoginToken && accessToken === adminLoginToken;

    if (!token && requiresLoginToken && !hasValidLoginToken) {
      return new NextResponse(null, { status: 404 });
    }

    // If on login page with valid token → redirect to dashboard
    if (pathname === "/admin/login" || pathname === "/admin/login/") {
      if (token) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // All other /admin/* paths require auth
    if (!token) {
      if (hasValidLoginToken && accessToken) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("token", accessToken);
        return NextResponse.redirect(loginUrl);
      }

      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  }

  // All non-admin routes → next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
