import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/validations/admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [statusCounts, thisMonth, lastMonth, recentLeads] = await Promise.all([
      prisma.lead.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      prisma.lead.count({
        where: { createdAt: { gte: startOfThisMonth } },
      }),
      prisma.lead.count({
        where: {
          createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
        },
      }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { location: true },
      }),
    ]);

    const totals: Record<string, number> = { all: 0 };
    for (const s of LEAD_STATUSES) {
      totals[s] = 0;
    }

    for (const row of statusCounts) {
      totals[row.status] = row._count.id;
      totals.all += row._count.id;
    }

    const soldCount = totals["SOLD"] ?? 0;
    const conversionRate =
      totals.all > 0 ? Math.round((soldCount / totals.all) * 100) : 0;

    return NextResponse.json({
      totals,
      thisMonth,
      lastMonth,
      conversionRate,
      recentLeads,
    });
  } catch (error) {
    console.error("[GET /api/admin/stats]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
