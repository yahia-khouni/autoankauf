import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { statusUpdateSchema } from "@/lib/validations/admin";

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
    const parsed = statusUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { status, note } = parsed.data;

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      select: { id: true, status: true, contactedAt: true, closedAt: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updateData: {
      status: string;
      contactedAt?: Date;
      closedAt?: Date;
    } = { status };

    if (status === "CONTACTED" && !lead.contactedAt) {
      updateData.contactedAt = new Date();
    }

    if (status === "SOLD" || status === "LOST") {
      updateData.closedAt = new Date();
    }

    const [updatedLead] = await prisma.$transaction([
      prisma.lead.update({
        where: { id: params.id },
        data: updateData,
      }),
      prisma.leadStatusHistory.create({
        data: {
          leadId: params.id,
          from: lead.status,
          to: status,
          note: note ?? null,
          changedBy: (session.user as { email?: string | null })?.email ?? null,
        },
      }),
    ]);

    return NextResponse.json(updatedLead);
  } catch (error) {
    logger.error("[PATCH /api/admin/leads/[id]/status]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
