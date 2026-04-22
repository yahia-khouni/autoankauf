import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-slate-400",
  CONTACTED: "bg-blue-500",
  OFFER_MADE: "bg-amber-500",
  NEGOTIATING: "bg-orange-500",
  SOLD: "bg-green-500",
  LOST: "bg-red-500",
  SPAM: "bg-gray-400",
};

const STATUS_LABELS: Record<string, string> = {
  NEW: "Neu",
  CONTACTED: "Kontaktiert",
  OFFER_MADE: "Angebot",
  NEGOTIATING: "Verhandlung",
  SOLD: "Verkauft",
  LOST: "Verloren",
  SPAM: "Spam",
};

interface HistoryEntry {
  id: string;
  from: string;
  to: string;
  note: string | null;
  changedBy: string | null;
  createdAt: Date;
}

interface StatusTimelineProps {
  history: HistoryEntry[];
}

export default function StatusTimeline({ history }: StatusTimelineProps) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-slate-400">Keine Statusänderungen vorhanden</p>
    );
  }

  return (
    <ol className="relative border-l border-slate-200 pl-5 space-y-5">
      {history.map((entry) => (
        <li key={entry.id} className="relative">
          <span
            className={cn(
              "absolute -left-[1.35rem] flex h-4 w-4 items-center justify-center rounded-full",
              STATUS_COLORS[entry.to] ?? "bg-slate-400"
            )}
          />
          <div className="ml-1">
            <p className="text-sm font-medium text-slate-700">
              {STATUS_LABELS[entry.from] ?? entry.from} →{" "}
              <span className="text-indigo-600">
                {STATUS_LABELS[entry.to] ?? entry.to}
              </span>
            </p>
            {entry.note && (
              <p className="mt-0.5 text-xs text-slate-500">{entry.note}</p>
            )}
            <p className="mt-0.5 text-xs text-slate-400">
              {new Date(entry.createdAt).toLocaleString("de-DE")}
              {entry.changedBy && ` · ${entry.changedBy}`}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
