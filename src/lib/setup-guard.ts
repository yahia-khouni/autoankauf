import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

const SETUP_TOKEN_HEADER = "x-setup-token";

export function requireSetupToken(request: NextRequest): NextResponse | null {
  const configuredToken = process.env.SETUP_ADMIN_TOKEN?.trim();

  if (!configuredToken) {
    logger.error("[Setup] Missing SETUP_ADMIN_TOKEN environment variable");
    return NextResponse.json(
      { error: "Setup endpoint is not configured" },
      { status: 503 }
    );
  }

  const providedToken = request.headers.get(SETUP_TOKEN_HEADER)?.trim();
  if (!providedToken || providedToken !== configuredToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function isSetupRequired(): Promise<boolean> {
  const adminCount = await prisma.admin.count();
  return adminCount === 0;
}
