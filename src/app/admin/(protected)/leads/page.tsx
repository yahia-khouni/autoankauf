import { prisma } from "@/lib/db";
import { LEAD_STATUSES, LeadStatus } from "@/lib/validations/admin";
import { Prisma } from "@prisma/client";
import LeadsFilter from "@/components/admin/LeadsFilter";
import LeadsTable from "@/components/admin/LeadsTable";
import Pagination from "@/components/admin/Pagination";

interface PageProps {
  searchParams: {
    status?: string;
    search?: string;
    page?: string;
    sort?: string;
    order?: string;
  };
}

async function getLeads(params: PageProps["searchParams"]) {
  const status =
    params.status && LEAD_STATUSES.includes(params.status as LeadStatus)
      ? (params.status as LeadStatus)
      : undefined;
  const search = params.search?.trim() || undefined;
  const page = Math.max(1, Number(params.page) || 1);
  const limit = 20;
  const sort = params.sort ?? "createdAt";
  const order = params.order === "asc" ? "asc" : "desc";

  const allowedSortFields: Record<string, boolean> = {
    createdAt: true,
    updatedAt: true,
    firstName: true,
    lastName: true,
    status: true,
    carMake: true,
  };
  const sortField = allowedSortFields[sort] ? sort : "createdAt";

  const where: Prisma.LeadWhereInput = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { firstName: { contains: search } },
      { lastName: { contains: search } },
      { email: { contains: search } },
      { carMake: { contains: search } },
      { carModel: { contains: search } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: { location: true },
      orderBy: { [sortField]: order },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  return { leads, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export default async function LeadsPage({ searchParams }: PageProps) {
  const { leads, total, page, totalPages } = await getLeads(searchParams);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
            Anfrageverwaltung
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Leads
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Alle eingehenden Anfragen auf einen Blick.
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          {total} gesamt
        </span>
      </div>

      <div className="mb-4">
        <LeadsFilter />
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <LeadsTable leads={leads as Parameters<typeof LeadsTable>[0]["leads"]} />
      </div>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
