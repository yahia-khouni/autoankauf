import Image from "next/image";
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Artistic Map */}
          <AnimateOnScroll delay={100} className="relative order-2 lg:order-1 flex justify-center items-center h-full">
            <div className="relative w-full max-w-[500px] h-[400px] sm:h-[500px] rounded-[2rem] flex items-center justify-center group overflow-hidden shadow-[0_20px_60px_-15px_rgba(16,42,67,0.4)] border border-slate-200/60 transition-transform duration-500 hover:scale-[1.02] bg-white">
              {/* Glow layers */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-400/10 via-transparent to-navy-900/5 mix-blend-overlay z-20 pointer-events-none" />
              
              {/* Image Map */}
              <Image 
                src="/images/map.png"
                alt="Germany Locations Map"
                fill
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </AnimateOnScroll>

          {/* Right: Scrollable Location List */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="bg-navy-900 rounded-3xl shadow-premium-lg border border-navy-800 overflow-hidden flex flex-col h-[500px]">
              <div className="p-6 sm:p-8 border-b border-navy-800 bg-navy-950/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
                <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Verfügbar in ganz Deutschland</h3>
                    <p className="text-sm text-slate-300">Wählen Sie Ihr Bundesland aus, um lokale Händler zu finden.</p>
                  </div>
                  <Link 
                    href="/standorte" 
                    className="inline-flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group whitespace-nowrap mt-1"
                  >
                    {t("viewAll")}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1 p-4 sm:p-6 sn-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {germanStates.map((state, index) => (
                    <Link
                      key={state.slug}
                      href={`/standorte/${state.slug}`}
                      className="group flex flex-col p-4 rounded-2xl border border-navy-800 bg-navy-950/30 hover:bg-navy-800 hover:border-gold-400/50 transition-all duration-300 active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center border border-navy-700 group-hover:border-gold-500/30 group-hover:bg-navy-900/50 transition-colors">
                            <MapPin className="h-3.5 w-3.5 text-gold-400 group-hover:text-gold-300 transition-colors" />
                          </div>
                          <span className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                            {state.name}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-slate-400 pl-11">
                        {state.cities.length > 0
                          ? `${state.cities.length} ${t("cities")} `
                          : t("cityState")}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
