import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { ensureCarCatalogInitialized } from "@/lib/car-catalog";
import { createModelSchema, modelsQuerySchema } from "@/lib/validations/admin";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureCarCatalogInitialized();

    const { searchParams } = request.nextUrl;
    const parsed = modelsQuerySchema.safeParse({
      search: searchParams.get("search") ?? undefined,
      makeId: searchParams.get("makeId") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      order: searchParams.get("order") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const { search, makeId, page, limit, sort, order } = parsed.data;
    const skip = (page - 1) * limit;

    const where: Prisma.CarModelWhereInput = {};
    if (makeId) {
      where.makeId = makeId;
    }
    if (search) {
      where.OR = [{ name: { contains: search } }, { slug: { contains: search } }];
    }

    const allowedSortFields: Record<string, true> = {
      createdAt: true,
      updatedAt: true,
      name: true,
      slug: true,
    };
    const sortField = allowedSortFields[sort] ? sort : "createdAt";

    const [models, total] = await Promise.all([
      prisma.carModel.findMany({
        where,
        include: { make: { select: { id: true, name: true, slug: true } } },
        orderBy: { [sortField]: order },
        skip,
        take: limit,
      }),
      prisma.carModel.count({ where }),
    ]);

    return NextResponse.json({
      models,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error("[GET /api/admin/cars/models]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createModelSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const make = await prisma.carMake.findUnique({
      where: { id: parsed.data.makeId },
      select: { id: true },
    });

    if (!make) {
      return NextResponse.json({ error: "Make not found" }, { status: 404 });
    }

    const duplicate = await prisma.carModel.findUnique({
      where: { makeId_slug: { makeId: parsed.data.makeId, slug: parsed.data.slug } },
      select: { id: true },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "Model slug already exists for this make" },
        { status: 409 }
      );
    }

    const model = await prisma.carModel.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        makeId: parsed.data.makeId,
        yearsProduced: parsed.data.yearsProduced ? parsed.data.yearsProduced : null,
      },
      include: { make: { select: { id: true, name: true, slug: true } } },
    });

    return NextResponse.json(model, { status: 201 });
  } catch (error) {
    logger.error("[POST /api/admin/cars/models]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

