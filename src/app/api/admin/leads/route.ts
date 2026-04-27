import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { leadsQuerySchema } from "@/lib/validations/admin";
import { Prisma } from "@prisma/client";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const parsed = leadsQuerySchema.safeParse({
      status: searchParams.get("status") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      order: searchParams.get("order") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const { status, search, page, limit, sort, order } = parsed.data;
    const skip = (page - 1) * limit;

    const where: Prisma.LeadWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { carMake: { contains: search } },
        { carModel: { contains: search } },
      ];
    }

    const allowedSortFields: Record<string, boolean> = {
      createdAt: true,
      updatedAt: true,
      firstName: true,
      lastName: true,
      status: true,
      carMake: true,
    };

    const sortField = allowedSortFields[sort] ? sort : "createdAt";

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: { location: true },
        orderBy: { [sortField]: order },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error("[GET /api/admin/leads]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
