import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { getNationData, getAllStates, getCitiesByState } from "@/data/location-data";
import { MapPin, ArrowRight, Shield, Zap, Star, TrendingUp, Phone, CheckCircle } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";
import { StatsCounter } from "@/components/locations/stats-counter";
import { LocationBreadcrumb } from "@/components/locations/breadcrumb";
import { GermanyMapSvg } from "@/components/locations/germany-map-svg";
import { BreadcrumbSchema } from "@/components/seo/schema-markup";
import { InteractiveLocationsExplorer } from "@/components/locations/interactive-explorer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { formatNumber } from "@/lib/utils";

const nation = getNationData();

export const metadata: Metadata = {
  title: nation.meta.title,
  description: nation.meta.description,
  keywords: nation.meta.keywords,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Large states that get a double-wide card
const LARGE_STATES = ["nordrhein-westfalen", "bayern", "baden-wuerttemberg"];

export default async function StandortePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("locations");

  const states = getAllStates();
  const totalCities = states.reduce((sum, state) => sum + state.cities.length, 0);

  // Build state cards data with city names for pills
  const stateCards = states.map((state) => {
    const cities = getCitiesByState(state.slug);
    return {
      slug: state.slug,
      name: state.name,
      stateCode: state.stateCode,
      cityCount: state.cities.length,
      cities: cities.map((c) => ({ slug: c.slug, name: c.name })),
      topCities: cities.slice(0, 4).map((c) => ({ slug: c.slug, name: c.name })),
      isLarge: LARGE_STATES.includes(state.slug),
    };
  });

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://autoankauf.de";

  return (
    <div className="relative overflow-hidden">
      {/* Schema.org Breadcrumb */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Standorte", url: `${baseUrl}/standorte` },
        ]}
      />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-40 lg:pt-40 lg:pb-56 min-h-[70vh] lg:min-h-[90vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />

        {/* Decorative Germany map */}
        <GermanyMapSvg className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] text-gold-400 pointer-events-none hidden lg:block" />

        {/* Decorative orbs */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-navy-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <LocationBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Standorte" },
            ]}
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-gold-400/30 backdrop-blur-sm px-4 py-2 mb-6">
            <MapPin className="h-4 w-4 text-gold-400" />
            <span className="text-sm font-medium text-gold-300">{t("badge")}</span>
          </div>

          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("heroTitleBase")}
              <span className="text-gold-gradient">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-[80%]">
              {t("heroText1")}
              <strong className="text-white">16 {t("heroText2")}</strong> {t("heroText3")}
              <strong className="text-white">{totalCities} {t("heroText4")}</strong>{t("heroText5")}
            </p>
          </div>

          {/* Animated Stats */}
          <StatsCounter stats={[
            { value: t("trustCert"), iconName: "ShieldCheck" as const },
            { value: t("trustExp"), iconName: "Award" as const },
            { value: t("trustCust"), iconName: "CarFront" as const },
          ]} />
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ── INTERACTIVE STATES EXPLORER ── */}
      <InteractiveLocationsExplorer 
        states={stateCards}
        translations={{
          allStates: t("allStates"),
          selectStateTitle: t("selectStateTitle"),
          selectStateDesc: t("selectStateDesc"),
          searchPlaceholder: t("searchCity") || "Stadt suchen...",
          noResults: t("noResults") || "Keine Ergebnisse gefunden"
        }}
      />

      {/* ── WHY US ── */}
      <section className="py-16 lg:py-24">
        <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-navy-900 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-6 shadow-sm">
                  <Shield className="h-4 w-4 text-gold-400" />
                  {t("whyUsLabel")}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                  {t("ctaOfferTitle")}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                  {t("description")}
                </p>

                {/* Trust stats strip */}
                <div className="flex flex-wrap gap-4 mb-10">
                  {[
                    { value: "7", accent: "+", label: t("expYears") },
                    { value: formatNumber(50000), accent: "+", label: t("vehicles") },
                    { value: "4.9", accent: "★", label: t("reviews") },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-slate-50/80 rounded-xl px-5 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100/50"
                    >
                      <span className="text-xl font-bold text-navy-900">
                        {stat.value}
                        <span className="text-gold-500">{stat.accent}</span>
                      </span>
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  {[
                    { icon: Zap, title: t("feature1Title"), desc: t("feature1Desc") },
                    { icon: Shield, title: t("feature2Title"), desc: t("feature2Desc") },
                    { icon: TrendingUp, title: t("feature3Title"), desc: t("feature3Desc") },
                    { icon: Phone, title: t("feature4Title"), desc: t("feature4Desc") },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:shadow-[0_4px_15px_rgba(255,180,0,0.3)] transition-all duration-300">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-bold text-navy-900 text-lg mb-1">{item.title}</div>
                        <div className="text-slate-500 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card Container with Sticky positioning */}
              <div className="lg:sticky lg:top-32">
                <div className="relative">
                  <div className="relative bg-navy-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden shadow-2xl border border-navy-800">
                    <div className="absolute inset-0 bg-hero-pattern opacity-10" />
                    
                    {/* Dark gradient to ensure contrast */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-navy-800 border border-navy-700/50 rounded-full px-4 py-1.5 text-sm font-medium text-white mb-8">
                        <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                        {t("premiumService")}
                      </div>

                      <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                        {t("ctaOfferTitle")}
                        <span className="block text-gold-400 mt-2">{t("ctaOfferSub")}</span>
                      </h3>

                      <div className="space-y-6 mb-10">
                        {[
                          { step: "01", text: t("step1") },
                          { step: "02", text: t("step2") },
                          { step: "03", text: t("step3") },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-5 overflow-hidden animate-fade-in-up" style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}>
                            <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 text-gold-400 flex items-center justify-center font-bold text-lg flex-shrink-0 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:border-gold-500">
                              {item.step}
                            </div>
                            <span className="text-slate-300 font-medium text-lg">{item.text}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href="/#lead-form"
                        id="standorte-cta-hero"
                        className="group inline-flex items-center gap-3 w-full justify-center bg-gold-500 text-navy-900 font-bold px-8 py-5 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,180,0,0.4)] hover:-translate-y-1"
                      >
                        {t("btnOffer")}
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ── CITY NOT FOUND CTA ── */}
      <section className="py-16 lg:py-24 overflow-hidden">
        <div className="container">
          <AnimateOnScroll>
            <div className="relative bg-navy-900 rounded-3xl p-10 lg:p-16 text-center overflow-hidden shadow-2xl border border-navy-800">
              {/* Subtle background noise/texture instead of a muddy gradient */}
              <div className="absolute inset-0 bg-hero-pattern opacity-[0.03] mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />

              <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                <AnimateOnScroll delay={100} className="w-20 h-20 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center mb-8 shadow-sm hover:scale-105 transition-transform duration-500 group">
                  <MapPin className="h-10 w-10 text-gold-400 group-hover:fill-gold-400/20 transition-all duration-500" />
                </AnimateOnScroll>
                
                <AnimateOnScroll delay={200}>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                    {t("cityNotFoundTitle")}
                  </h2>
                </AnimateOnScroll>

                <AnimateOnScroll delay={300}>
                  <p className="text-slate-200 md:text-lg mb-10 leading-relaxed font-medium">
                    {t("cityNotFoundDesc")}
                  </p>
                </AnimateOnScroll>
                
                <AnimateOnScroll delay={400}>
                  <MagneticButton>
                    <Link
                      href="/#lead-form"
                      id="standorte-bottom-cta"
                      className="group relative inline-flex items-center justify-center gap-3 bg-gold-400 text-navy-900 font-bold px-10 py-5 rounded-2xl transition-all duration-300 overflow-hidden"
                      style={{
                        boxShadow: "0 4px 15px rgba(255, 180, 0, 0.4), 0 0 30px rgba(255, 180, 0, 0.1)"
                      }}
                    >
                      {/* Shine animation overlay */}
                      <span className="absolute inset-0 w-1/4 bg-white/30 mix-blend-overlay animate-sweep pointer-events-none" />
                      
                      <span className="relative z-10">{t("btnOffer")}</span>
                      <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </MagneticButton>
                </AnimateOnScroll>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}