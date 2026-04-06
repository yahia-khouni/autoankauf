import Link from "next/link";
import { useTranslations } from "next-intl";
import { germanStates } from "@/data/locations";
import { MapPin, ChevronRight, Map } from "lucide-react";

export function LocationsMapSection() {
  const t = useTranslations("locations");

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 border border-navy-100 px-4 py-2 mb-6">
            <Map className="h-4 w-4 text-navy-600" />
            <span className="text-sm font-medium text-navy-700">Deutschlandweit</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-navy-900">{t("title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {germanStates.map((state, index) => (
            <Link
              key={state.slug}
              href={`/standorte/${state.slug}`}
              className="group relative bg-white rounded-2xl border border-slate-100 p-5 hover:border-gold-300 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/0 to-gold-400/0 group-hover:from-gold-400/5 group-hover:to-gold-400/10 transition-all duration-300" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center group-hover:from-gold-100 group-hover:to-gold-200 transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900 truncate group-hover:text-gold-600 transition-colors">
                    {state.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {state.cities.length > 0 ? `${state.cities.length} Städte` : "Stadtstaat"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/standorte" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-navy-900 bg-white border-2 border-navy-200 hover:border-gold-400 hover:shadow-lg transition-all group"
          >
            {t("viewAll")}
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
