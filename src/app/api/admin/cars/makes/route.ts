import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { Prisma } from "@prisma/client";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

import { createMakeSchema, makesQuerySchema } from "@/lib/validations/admin";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {

    const { searchParams } = request.nextUrl;
    const parsed = makesQuerySchema.safeParse({
      search: searchParams.get("search") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      order: searchParams.get("order") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const { search, page, limit, sort, order } = parsed.data;
    const skip = (page - 1) * limit;

    const where: Prisma.CarMakeWhereInput = {};
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

    const [makes, total] = await Promise.all([
      prisma.carMake.findMany({
        where,
        include: { _count: { select: { models: true } } },
        orderBy: { [sortField]: order },
        skip,
        take: limit,
      }),
      prisma.carMake.count({ where }),
    ]);

    return NextResponse.json({
      makes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error("[GET /api/admin/cars/makes]", error);
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
    const parsed = createMakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const duplicate = await prisma.carMake.findFirst({
      where: {
        OR: [{ name: parsed.data.name }, { slug: parsed.data.slug }],
      },
      select: { id: true },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "Make name or slug already exists" },
        { status: 409 }
      );
    }

    const make = await prisma.carMake.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        logoUrl: parsed.data.logoUrl ? parsed.data.logoUrl : null,
      },
      include: { _count: { select: { models: true } } },
    });

    return NextResponse.json(make, { status: 201 });
  } catch (error) {
    logger.error("[POST /api/admin/cars/makes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

