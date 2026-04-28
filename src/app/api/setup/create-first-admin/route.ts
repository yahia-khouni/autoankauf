import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { isSetupRequired, requireSetupToken } from "@/lib/setup-guard";
import { createFirstAdminSchema } from "@/lib/validations/setup";

export async function POST(request: NextRequest) {
  const unauthorized = requireSetupToken(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = await request.json();
    const parsed = createFirstAdminSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const setupRequired = await isSetupRequired();
    if (!setupRequired) {
      logger.warn("[Setup] Attempt to create first admin after setup completed");
      return NextResponse.json(
        {
          success: false,
          error:
            "Setup already completed. Admin account already exists. Please use the login page.",
        },
        { status: 403 }
      );
    }

    const { firstName, lastName, email, password } = parsed.data;
    const passwordHash = await bcrypt.hash(password, 12);
    const name = `${firstName} ${lastName}`.trim();

    const admin = await prisma.admin.create({
      data: {
        email,
        passwordHash,
        name,
        role: "ADMIN",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    logger.info(`[Setup] First admin created successfully: ${admin.email}`);

    return NextResponse.json(
      {
        success: true,
        message: "Admin account created successfully. You can now login.",
        data: admin,
        note: "This setup endpoint is now disabled because an admin already exists.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    logger.error("[POST /api/setup/create-first-admin]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create admin account" },
      { status: 500 }
    );
  }
}
