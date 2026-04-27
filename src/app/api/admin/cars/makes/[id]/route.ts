import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { updateMakeSchema } from "@/lib/validations/admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const make = await prisma.carMake.findUnique({
      where: { id: params.id },
      include: { models: { orderBy: { name: "asc" } } },
    });

    if (!make) {
      return NextResponse.json({ error: "Make not found" }, { status: 404 });
    }

    return NextResponse.json(make);
  } catch (error) {
    logger.error("[GET /api/admin/cars/makes/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateMakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data: Prisma.CarMakeUpdateInput = {};
    if (typeof parsed.data.name === "string") {
      data.name = parsed.data.name;
    }
    if (typeof parsed.data.slug === "string") {
      data.slug = parsed.data.slug;
    }
    if (Object.prototype.hasOwnProperty.call(parsed.data, "logoUrl")) {
      data.logoUrl = parsed.data.logoUrl ? parsed.data.logoUrl : null;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No update fields provided" }, { status: 400 });
    }

    const updated = await prisma.carMake.update({
      where: { id: params.id },
      data,
      include: { _count: { select: { models: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Make not found" }, { status: 404 });
      }
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Make name or slug already exists" },
          { status: 409 }
        );
      }
    }

    logger.error("[PATCH /api/admin/cars/makes/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await prisma.carMake.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Make not found" }, { status: 404 });
    }

    await prisma.carMake.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("[DELETE /api/admin/cars/makes/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
