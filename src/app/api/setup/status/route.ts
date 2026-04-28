import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { isSetupRequired, requireSetupToken } from "@/lib/setup-guard";

export async function GET(request: NextRequest) {
  const unauthorized = requireSetupToken(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const setupRequired = await isSetupRequired();

    return NextResponse.json({
      success: true,
      setupRequired,
      message: setupRequired
        ? "No admin account found. Setup required."
        : "Admin account exists. Setup complete.",
    });
  } catch (error) {
    logger.error("[GET /api/setup/status]", error);
    return NextResponse.json(
      { success: false, error: "Failed to check setup status" },
      { status: 500 }
    );
  }
}
