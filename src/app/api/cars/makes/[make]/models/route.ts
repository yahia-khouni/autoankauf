import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { make: string } }
) {
  try {
    const models = await prisma.carModel.findMany({
      where: { makeId: params.make },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ models });
  } catch (error) {
    logger.error("[GET /api/cars/makes/[make]/models]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

