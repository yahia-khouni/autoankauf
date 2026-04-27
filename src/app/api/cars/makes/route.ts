import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";
import { ensureCarCatalogInitialized } from "@/lib/car-catalog";

export async function GET() {
  try {
    await ensureCarCatalogInitialized();

    const makes = await prisma.carMake.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ makes });
  } catch (error) {
    logger.error("[GET /api/cars/makes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

