import Link from "next/link";
import { MapPin, Users, ChevronRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface CityCardProps {
  stateSlug: string;
  slug: string;
  name: string;
  population: number;
  maxPopulation?: number;
  index?: number;
}

/**
 * City card with population bar visualization and staggered animation.
 */
export function CityCard({ stateSlug, slug, name, population, maxPopulation, index = 0 }: CityCardProps) {
  const populationPercent = maxPopulation ? Math.max((population / maxPopulation) * 100, 8) : 50;

  return (
    <Link
      href={`/standorte/${stateSlug}/${slug}`}
      className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-gold-200 hover:shadow-gold transition-all duration-300 card-gradient-border animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-center gap-3 relative z-10 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-50 to-amber-50 border border-gold-100 flex items-center justify-center group-hover:border-gold-200 transition-colors flex-shrink-0">
          <MapPin className="h-4 w-4 text-gold-500 pin-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-navy-900 group-hover:text-gold-700 transition-colors text-sm truncate">
            {name}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Users className="h-3 w-3" />
              {formatNumber(population)}
            </div>
            {/* Population bar */}
            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
              <div
                className="h-full bg-gradient-to-r from-gold-300 to-gold-500 rounded-full transition-all duration-700 group-hover:from-gold-400 group-hover:to-gold-600"
                style={{ width: `${populationPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all relative z-10 flex-shrink-0 ml-2" />
    </Link>
  );
}
