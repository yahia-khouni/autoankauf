import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { updateModelSchema } from "@/lib/validations/admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const model = await prisma.carModel.findUnique({
      where: { id: params.id },
      include: { make: { select: { id: true, name: true, slug: true } } },
    });

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    return NextResponse.json(model);
  } catch (error) {
    logger.error("[GET /api/admin/cars/models/[id]]", error);
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
    const parsed = updateModelSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data: Prisma.CarModelUpdateInput = {};

    if (typeof parsed.data.name === "string") {
      data.name = parsed.data.name;
    }
    if (typeof parsed.data.slug === "string") {
      data.slug = parsed.data.slug;
    }
    if (Object.prototype.hasOwnProperty.call(parsed.data, "yearsProduced")) {
      data.yearsProduced = parsed.data.yearsProduced ? parsed.data.yearsProduced : null;
    }

    if (typeof parsed.data.makeId === "string") {
      const make = await prisma.carMake.findUnique({
        where: { id: parsed.data.makeId },
        select: { id: true },
      });

      if (!make) {
        return NextResponse.json({ error: "Make not found" }, { status: 404 });
      }

      data.make = { connect: { id: parsed.data.makeId } };
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No update fields provided" }, { status: 400 });
    }

    const updated = await prisma.carModel.update({
      where: { id: params.id },
      data,
      include: { make: { select: { id: true, name: true, slug: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Model not found" }, { status: 404 });
      }
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Model slug already exists for this make" },
          { status: 409 }
        );
      }
    }

    logger.error("[PATCH /api/admin/cars/models/[id]]", error);
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
    const existing = await prisma.carModel.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    await prisma.carModel.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("[DELETE /api/admin/cars/models/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
