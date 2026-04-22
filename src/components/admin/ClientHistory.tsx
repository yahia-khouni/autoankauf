import Link from "next/link";
import StatusBadge from "./StatusBadge";

interface Location {
  id: string;
  name: string;
}

interface Lead {
  id: string;
  carMake: string;
  carModel: string;
  carYear: number;
  status: string;
  createdAt: Date;
  location: Location | null;
}

interface ClientHistoryProps {
  leads: Lead[];
}

export default function ClientHistory({ leads }: ClientHistoryProps) {
  return (
    <ul className="space-y-3">
      {leads.map((lead) => (
        <li key={lead.id}>
          <Link
            href={`/admin/leads/${lead.id}`}
            className="flex items-center justify-between rounded-lg border border-slate-100 p-3 transition hover:bg-slate-50"
          >
            <div>
              <p className="text-sm font-medium text-slate-700">
                {lead.carMake} {lead.carModel} ({lead.carYear})
              </p>
              <p className="text-xs text-slate-400">
                {new Date(lead.createdAt).toLocaleDateString("de-DE")}
                {lead.location && ` · ${lead.location.name}`}
              </p>
            </div>
            <StatusBadge status={lead.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
