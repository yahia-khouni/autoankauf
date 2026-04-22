"use client";

import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import { ChevronRight } from "lucide-react";

interface Location {
  id: string;
  name: string;
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  carMake: string;
  carModel: string;
  carYear: number;
  status: string;
  createdAt: Date;
  location: Location | null;
}

interface LeadsTableProps {
  leads: Lead[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Fahrzeug</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Standort</th>
            <th className="px-6 py-3">Eingegangen</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => router.push(`/admin/leads/${lead.id}`)}
              className="cursor-pointer border-b border-slate-50 transition hover:bg-slate-50"
            >
              <td className="px-6 py-3">
                <p className="font-medium text-slate-800">
                  {lead.firstName} {lead.lastName}
                </p>
                <p className="text-xs text-slate-400">{lead.email}</p>
              </td>
              <td className="px-6 py-3 text-slate-600">
                {lead.carMake} {lead.carModel}{" "}
                <span className="text-slate-400">({lead.carYear})</span>
              </td>
              <td className="px-6 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-3 text-slate-500">
                {lead.location?.name ?? "—"}
              </td>
              <td className="px-6 py-3 text-slate-400">
                {new Date(lead.createdAt).toLocaleDateString("de-DE")}
              </td>
              <td className="px-6 py-3">
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-12 text-center text-slate-400"
              >
                Keine Leads gefunden
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
