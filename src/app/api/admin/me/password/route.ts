import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { changePasswordSchema } from "@/lib/validations/admin";
import bcrypt from "bcryptjs";

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = parsed.data;

    const admin = await prisma.admin.findUnique({
      where: { email: session.user!.email! },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const passwordValid = await bcrypt.compare(currentPassword, admin.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const newHash = await bcrypt.hash(newPassword, 12);

    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash: newHash },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PATCH /api/admin/me/password]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
