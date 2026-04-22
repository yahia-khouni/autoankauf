import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { z } from "zod";

const leadIdParamsSchema = z.object({
  id: z.string().min(1),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        location: true,
        statusHistory: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const clientHistory = await prisma.lead.findMany({
      where: {
        email: lead.email,
        id: { not: lead.id },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { location: true },
    });

    return NextResponse.json({ lead, clientHistory });
  } catch (error) {
    console.error("[GET /api/admin/leads/[id]]", error);
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
    const parsedParams = leadIdParamsSchema.safeParse(params);
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid lead id" }, { status: 400 });
    }

    const existingLead = await prisma.lead.findUnique({
      where: { id: parsedParams.data.id },
      select: { id: true },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    await prisma.lead.delete({
      where: { id: parsedParams.data.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/admin/leads/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
