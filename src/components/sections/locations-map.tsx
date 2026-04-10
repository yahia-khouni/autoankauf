import Link from "next/link";
import { useTranslations } from "next-intl";
import { germanStates } from "@/data/locations";
import { MapPin, ChevronRight, Map } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function LocationsMapSection() {
  const t = useTranslations("locations");

  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Decorative Elements - Hidden on Mobile */}
      <div className="hidden sm:block absolute top-20 left-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 right-0 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl" />

      {/* Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(212,175,55,0.045)_1px,transparent_0)] [background-size:32px_32px] pointer-events-none" />

      <div className="container relative px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <AnimateOnScroll delay={0}>
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-navy-50 border border-navy-100 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <Map className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-navy-600" />
              <span className="text-xs sm:text-sm font-medium text-navy-700">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 text-navy-900">
              {t("title")}
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
              {t("description")}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Location Cards Grid - 2 cols on mobile, 3 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4">
          {germanStates.map((state, index) => (
            <Link
              key={state.slug}
              href={`/standorte/${state.slug}`}
              className="group relative bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-3 sm:p-5 hover:border-gold-400 hover:shadow-[0_4px_20px_rgba(212,175,55,0.12)] transition-all duration-300 active:scale-[0.98] sm:active:scale-100"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Hover Glow - Desktop Only */}
              <div className="hidden sm:block absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-400/0 group-hover:from-gold-400/5 group-hover:to-gold-400/10 transition-all duration-300" />

              {/* Mobile: Compact Vertical Layout */}
              <div className="relative sm:hidden flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-50 to-gold-100 flex items-center justify-center group-hover:from-gold-100 group-hover:to-gold-200 transition-colors duration-300">
                  <MapPin className="pin-bounce h-4 w-4 text-navy-600 group-hover:text-gold-600 transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-xs text-navy-900 truncate group-hover:text-gold-600 transition-colors">
                    {state.name}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {state.cities.length > 0
                      ? `${state.cities.length} ${t("cities")}`
                      : t("cityState")}
                  </p>
                </div>
              </div>

              {/* Desktop: Horizontal Layout */}
              <div className="relative hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 flex items-center justify-center group-hover:from-gold-100 group-hover:to-gold-200 transition-colors duration-300">
                  <MapPin className="pin-bounce h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900 truncate group-hover:text-gold-600 transition-colors">
                    {state.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {state.cities.length > 0
                      ? `${state.cities.length} ${t("cities")}`
                      : t("cityState")}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button - Mobile Optimized */}
        <AnimateOnScroll delay={150}>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/standorte"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base bg-navy-900 text-white hover:bg-navy-800 hover:shadow-[0_4px_20px_rgba(16,42,67,0.25)] transition-all group active:scale-[0.98] border border-navy-700 hover:border-gold-500"
            >
              {t("viewAll")}
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
