import Link from "next/link";
import { prisma } from "@/lib/db";
import { LEAD_STATUSES } from "@/lib/validations/admin";
import StatusBadge from "@/components/admin/StatusBadge";
import { Users, Inbox, PhoneCall, CheckCircle, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";

async function getStats() {
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [statusCounts, thisMonth, lastMonth, recentLeads] = await Promise.all([
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfThisMonth } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } } }),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { location: true } }),
  ]);

  const totals: Record<string, number> = { all: 0 };
  for (const s of LEAD_STATUSES) totals[s] = 0;
  for (const row of statusCounts) {
    totals[row.status] = row._count.id;
    totals.all += row._count.id;
  }

  const soldCount = totals["SOLD"] ?? 0;
  const conversionRate = totals.all > 0 ? Math.round((soldCount / totals.all) * 100) : 0;
  const monthTrend = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : null;

  return { totals, thisMonth, lastMonth, conversionRate, monthTrend, recentLeads };
}

export default async function DashboardPage() {
  const { totals, thisMonth, conversionRate, monthTrend, recentLeads } = await getStats();

  const cards = [
    {
      label: "Gesamt Leads",
      value: totals.all,
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      trend: null,
    },
    {
      label: "Neue Leads",
      value: totals["NEW"],
      icon: Inbox,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      trend: monthTrend,
      trendLabel: "vs. Vormonat",
    },
    {
      label: "Kontaktiert",
      value: totals["CONTACTED"],
      icon: PhoneCall,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      trend: null,
    },
    {
      label: "Verkauft",
      value: totals["SOLD"],
      icon: CheckCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      trend: conversionRate,
      trendLabel: "Konversionsrate",
      trendIsPercent: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
            Übersicht
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {new Date().toLocaleDateString("de-DE", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:flex"
        >
          <Inbox className="h-4 w-4" />
          Leads verwalten
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isPositive = (card.trend ?? 0) > 0;
          const isNeutral = card.trend === null || card.trend === 0;
          return (
            <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                {card.trend !== null && !card.trendIsPercent && (
                  <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    isNeutral ? "bg-slate-100 text-slate-500" :
                    isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  }`}>
                    {isNeutral ? <Minus className="h-3 w-3" /> : isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isPositive ? "+" : ""}{card.trend}%
                  </span>
                )}
                {card.trendIsPercent && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                    {card.trend}%
                  </span>
                )}
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-800">{card.value}</p>
              <p className="mt-1 text-sm text-slate-500">{card.label}</p>
              {card.trendLabel && !card.trendIsPercent && (
                <p className="mt-0.5 text-xs text-slate-400">{card.trendLabel}</p>
              )}
              {card.trendLabel && card.trendIsPercent && (
                <p className="mt-0.5 text-xs text-slate-400">{card.trendLabel}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary strip */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl bg-indigo-600 p-5 text-white shadow-sm">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Inbox className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">{thisMonth}</p>
            <p className="text-sm text-indigo-200">Neue Leads diesen Monat</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-emerald-600 p-5 text-white shadow-sm">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">{conversionRate}%</p>
            <p className="text-sm text-emerald-200">Konversionsrate gesamt</p>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-700">Neueste Leads</h2>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Alle anzeigen <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-slate-50 bg-slate-50/60 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Fahrzeug</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="group transition hover:bg-slate-50/60">
                  <td className="px-6 py-3.5">
                    <Link href={`/admin/leads/${lead.id}`} className="block">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                        {lead.firstName} {lead.lastName}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">
                    {lead.carMake} {lead.carModel}{" "}
                    <span className="text-slate-400">({lead.carYear})</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString("de-DE")}
                  </td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-400">
                    Noch keine Leads vorhanden
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
