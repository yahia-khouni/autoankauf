import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface StateCardProps {
  slug: string;
  name: string;
  stateCode: string;
  cityCount: number;
  topCities: { slug: string; name: string }[];
  isLarge?: boolean;
}

/**
 * Premium state card component
 */
export function StateCard({ slug, name, stateCode, cityCount, topCities, isLarge }: StateCardProps) {
  return (
    <Link
      href={`/standorte/${slug}`}
      className={`group relative bg-white rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 block ${
        isLarge ? "sm:col-span-2" : ""
      }`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* State initial in solid soft gold circle */}
          <div className="w-12 h-12 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold-400/25">
            <span className="text-base font-bold text-gold-600 tracking-tight">
              {stateCode}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-navy-900 text-base leading-tight group-hover:text-gold-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {cityCount > 0
                ? `${cityCount} ${cityCount === 1 ? "Stadt" : "Städte"}`
                : "Stadtstaat"}
            </p>
          </div>
        </div>
        {/* Chevron without border */}
        <ChevronRight className="h-6 w-6 text-slate-300 group-hover:text-gold-500 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
      </div>

      {/* Clean inline city list with native dot separators */}
      {topCities.length > 0 && (
        <div className="mt-5">
          <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
            {topCities.map((c) => c.name).join(" • ")}
            {cityCount > 4 && (
              <span className="text-navy-900 font-semibold ml-1">
                • +{cityCount - 4} mehr
              </span>
            )}
          </p>
        </div>
      )}
    </Link>
  );
}
