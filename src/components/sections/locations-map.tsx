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
          <AnimateOnScroll delay={100} className="relative order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[600px] aspect-square rounded-full flex items-center justify-center">
              {/* Glow layers */}
              <div className="absolute inset-0 bg-gold-400/20 blur-[100px] rounded-full pointer-events-none" />
              
              {/* Image Map */}
              <Image 
                src="/images/map.png"
                alt="Germany Locations Map"
                width={800}
                height={800}
                className="relative z-10 w-full h-auto object-contain filter drop-shadow-2xl"
              />
            </div>
          </AnimateOnScroll>

          {/* Right: Scrollable Location List */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="bg-navy-900 rounded-3xl shadow-premium-lg border border-navy-800 overflow-hidden flex flex-col h-[500px]">
              <div className="p-6 sm:p-8 border-b border-navy-800 bg-navy-950/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
                <h3 className="relative text-xl sm:text-2xl font-bold text-white mb-2">Verfügbar in ganz Deutschland</h3>
                <p className="relative text-sm text-slate-300">Wählen Sie Ihr Bundesland aus, um lokale Händler zu finden.</p>
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
            
            {/* View All Button */}
            <AnimateOnScroll delay={150} className="mt-8 text-center lg:text-left">
              <Link
                href="/standorte"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/20 hover:shadow-[0_8px_25px_rgba(16,42,67,0.35)] transition-all group active:scale-[0.98] border border-navy-700 hover:border-gold-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400/0 via-gold-400/20 to-gold-400/0 -translate-x-full group-hover:animate-shimmer" />
                <span className="relative z-10">{t("viewAll")}</span>
                <ChevronRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
