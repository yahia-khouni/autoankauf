import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-slate-100 text-slate-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  OFFER_MADE: "bg-amber-100 text-amber-700",
  NEGOTIATING: "bg-orange-100 text-orange-700",
  SOLD: "bg-green-100 text-green-700",
  LOST: "bg-red-100 text-red-700",
  SPAM: "bg-gray-100 text-gray-500",
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

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-slate-100 text-slate-500";
  const label = STATUS_LABELS[status] ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
