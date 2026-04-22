import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { adminNotesSchema } from "@/lib/validations/admin";

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
    const parsed = adminNotesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updated = await prisma.lead.update({
      where: { id: params.id },
      data: { adminNotes: parsed.data.adminNotes },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/admin/leads/[id]/notes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
