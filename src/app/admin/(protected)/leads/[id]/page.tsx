import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import StatusBadge from "@/components/admin/StatusBadge";
import StatusUpdateForm from "@/components/admin/StatusUpdateForm";
import AdminNotesForm from "@/components/admin/AdminNotesForm";
import StatusTimeline from "@/components/admin/StatusTimeline";
import ClientHistory from "@/components/admin/ClientHistory";
import DeleteLeadButton from "@/components/admin/DeleteLeadButton";

interface PageProps {
  params: { id: string };
}

async function getLead(id: string) {
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      location: true,
      statusHistory: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!lead) return null;

  const clientHistory = await prisma.lead.findMany({
    where: { email: lead.email, id: { not: lead.id } },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { location: true },
  });

  return { lead, clientHistory };
}

export default async function LeadDetailPage({ params }: PageProps) {
  const data = await getLead(params.id);
  if (!data) notFound();

  const { lead, clientHistory } = data;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {lead.firstName} {lead.lastName}
          </h1>
        </div>
        <StatusBadge status={lead.status} className="ml-auto text-sm" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Client Info */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-700">
              Kontaktdaten
            </h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <InfoRow label="Vorname" value={lead.firstName} />
              <InfoRow label="Nachname" value={lead.lastName} />
              <InfoRow label="E-Mail" value={lead.email} />
              <InfoRow label="Telefon" value={lead.phone} />
              <InfoRow
                label="Bevorzugter Kontakt"
                value={lead.preferredContact}
              />
              <InfoRow
                label="Standort"
                value={lead.location?.name ?? lead.postalCode ?? "—"}
              />
            </dl>
          </div>

          {/* Car Info */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-700">
              Fahrzeugdaten
            </h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <InfoRow label="Marke" value={lead.carMake} />
              <InfoRow label="Modell" value={lead.carModel} />
              <InfoRow label="Baujahr" value={String(lead.carYear)} />
              <InfoRow
                label="Kilometerstand"
                value={`${lead.carMileage.toLocaleString("de-DE")} km`}
              />
              <InfoRow label="Zustand" value={lead.carCondition} />
              {lead.knownIssues && (
                <InfoRow label="Bekannte Mängel" value={lead.knownIssues} />
              )}
              {lead.description && (
                <div className="sm:col-span-2">
                  <InfoRow label="Beschreibung" value={lead.description} />
                </div>
              )}
            </dl>
          </div>

          {/* Status Timeline */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-700">
              Statusverlauf
            </h2>
            <StatusTimeline history={lead.statusHistory} />
          </div>

          {/* Client History */}
          {clientHistory.length > 0 && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-700">
                Weitere Anfragen dieses Kunden
              </h2>
              <ClientHistory leads={clientHistory as Parameters<typeof ClientHistory>[0]["leads"]} />
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <StatusUpdateForm leadId={lead.id} currentStatus={lead.status} />
          <AdminNotesForm leadId={lead.id} initialNotes={lead.adminNotes ?? ""} />
          <DeleteLeadButton
            leadId={lead.id}
            customerName={`${lead.firstName} ${lead.lastName}`}
          />

          {/* Meta info */}
          <div className="rounded-xl bg-white p-6 shadow-sm text-sm">
            <h2 className="mb-3 font-semibold text-slate-700">Metadaten</h2>
            <div className="space-y-2 text-slate-500">
              <p>
                <span className="font-medium text-slate-600">Erstellt: </span>
                {new Date(lead.createdAt).toLocaleString("de-DE")}
              </p>
              {lead.contactedAt && (
                <p>
                  <span className="font-medium text-slate-600">Kontaktiert: </span>
                  {new Date(lead.contactedAt).toLocaleString("de-DE")}
                </p>
              )}
              {lead.closedAt && (
                <p>
                  <span className="font-medium text-slate-600">Abgeschlossen: </span>
                  {new Date(lead.closedAt).toLocaleString("de-DE")}
                </p>
              )}
              {lead.utmSource && (
                <p>
                  <span className="font-medium text-slate-600">UTM Source: </span>
                  {lead.utmSource}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-slate-700">{value}</dd>
    </div>
  );
}
