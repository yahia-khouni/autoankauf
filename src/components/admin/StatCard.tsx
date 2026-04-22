import { cn } from "@/lib/utils";

const COLOR_MAP: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  slate: "bg-slate-100 text-slate-600",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
  trend?: { value: number; label: string };
}

export default function StatCard({
  label,
  value,
  icon,
  color = "indigo",
  trend,
}: StatCardProps) {
  const iconStyle = COLOR_MAP[color] ?? COLOR_MAP.indigo;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={cn("rounded-lg p-2", iconStyle)}>{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-800">{value}</p>
      {trend && (
        <p className="mt-1 text-xs text-slate-400">
          <span
            className={cn(
              "font-medium",
              trend.value > 0 ? "text-green-600" : trend.value < 0 ? "text-red-500" : "text-slate-500"
            )}
          >
            {trend.value > 0 ? "+" : ""}
            {trend.value}%
          </span>{" "}
          {trend.label}
        </p>
      )}
    </div>
  );
}
