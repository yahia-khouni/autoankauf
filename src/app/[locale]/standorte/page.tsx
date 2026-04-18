import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getNationData, getAllStates, getCitiesByState } from "@/data/location-data";
import { MapPin, ArrowRight, Shield, Zap, Star, TrendingUp, Phone, CheckCircle } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";
import { StateCard } from "@/components/locations/state-card";
import { StatsCounter } from "@/components/locations/stats-counter";
import { LocationBreadcrumb } from "@/components/locations/breadcrumb";
import { GermanyMapSvg } from "@/components/locations/germany-map-svg";
import { BreadcrumbSchema } from "@/components/seo/schema-markup";
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

const trustStats = [
  { value: "TÜV Zertifiziert", iconName: "ShieldCheck" as const },
  { value: "10+ Jahre Erfahrung", iconName: "Award" as const },
  { value: "5.000+ Kunden", iconName: "CarFront" as const },
];

export default async function StandortePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
            <span className="text-sm font-medium text-gold-300">Deutschlandweit verfügbar</span>
          </div>

          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {nation.content.heroTitle.split("ganz Deutschland")[0]}
              <span className="text-gold-gradient">ganz Deutschland</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-[80%]">
              Wir kaufen Ihr Auto in allen{" "}
              <strong className="text-white">16 Bundesländern</strong> und über{" "}
              <strong className="text-white">{totalCities} Städten</strong>. Schnell, fair und mit
              sofortiger Auszahlung — egal wo Sie sich befinden.
            </p>
          </div>

          {/* Animated Stats */}
          <StatsCounter stats={trustStats} />
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ── STATES GRID ── */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-background via-slate-50/80 to-slate-100">
        <div className="container">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-600 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <MapPin className="h-4 w-4" />
              Alle Bundesländer
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              Wählen Sie Ihr Bundesland
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Finden Sie detaillierte Informationen zum Autoankauf in Ihrem Bundesland und Ihrer Stadt.
            </p>
          </div>

          {/* States grid — large states get double width */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stateCards.map((state) => (
              <StateCard key={state.slug} {...state} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-navy-50 border border-navy-100 text-navy-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                <Shield className="h-4 w-4" />
                Warum uns wählen
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                {nation.content.whyUsTitle}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                {nation.content.whyUsDescription}
              </p>

              {/* Trust stats strip */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { value: "7+", label: "Jahre Erfahrung" },
                  { value: formatNumber(50000) + "+", label: "Fahrzeuge" },
                  { value: "4.9★", label: "Bewertung" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-xl px-4 py-2.5"
                  >
                    <span className="text-lg font-bold text-gold-700">{stat.value}</span>
                    <span className="text-xs text-gold-600 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  { icon: Zap, title: "Blitzschnelles Angebot", desc: "Innerhalb von 24 Stunden erhalten Sie ein verbindliches Angebot" },
                  { icon: Shield, title: "100% Seriös & Sicher", desc: "Transparente Abwicklung, keine versteckten Kosten" },
                  { icon: TrendingUp, title: "Faire Marktpreise", desc: "Wir orientieren uns am aktuellen Marktwert Ihres Fahrzeugs" },
                  { icon: Phone, title: "Persönliche Betreuung", desc: "Kein Callcenter — direkte Kommunikation mit Experten" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0 shadow-gold group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5 text-navy-900" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">{item.title}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-gold rounded-3xl blur-2xl opacity-10" />
              <div className="relative bg-gradient-hero rounded-3xl p-8 lg:p-10 text-white overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-hero-pattern opacity-20" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-gold-400/20 border border-gold-400/30 rounded-full px-3 py-1.5 text-sm text-gold-300 font-medium mb-6">
                    <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                    Premium Service
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                    Ihr Auto — Ihr Angebot
                    <span className="block text-gold-gradient text-xl mt-1">In 3 einfachen Schritten</span>
                  </h3>

                  <div className="space-y-4 mb-8">
                    {[
                      { step: "01", text: "Fahrzeugdaten eingeben" },
                      { step: "02", text: "Kostenloses Angebot erhalten" },
                      { step: "03", text: "Sofortige Auszahlung & Abholung" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center font-bold text-navy-900 text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <span className="text-slate-300">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/#lead-form"
                    id="standorte-cta-hero"
                    className="group inline-flex items-center gap-2 w-full justify-center bg-gradient-gold text-navy-900 font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-gold-lg hover:-translate-y-0.5 btn-cta-glow"
                  >
                    Jetzt kostenloses Angebot
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL CITY INDEX (SEO value) ── */}
      <section className="py-12 lg:py-16 bg-slate-50/50 border-t border-slate-100">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-3">
              Alle Standorte auf einen Blick
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm">
              Direkte Links zu allen Städten, in denen wir Ihren Autoankauf abwickeln.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {states
              .filter((s) => s.cities.length > 0)
              .map((state) => {
                const cities = getCitiesByState(state.slug);
                return (
                  <div key={state.slug}>
                    <Link
                      href={`/standorte/${state.slug}`}
                      className="flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors mb-2"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-[10px] font-bold text-gold-700">
                        {state.stateCode}
                      </span>
                      {state.name}
                    </Link>
                    <div className="flex flex-col gap-0.5">
                      {cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/standorte/${state.slug}/${city.slug}`}
                          className="text-xs text-slate-500 hover:text-gold-600 transition-colors py-0.5 pl-8 flex items-center gap-1"
                        >
                          <CheckCircle className="h-2.5 w-2.5 text-gold-300 flex-shrink-0" />
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── CITY NOT FOUND CTA ── */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-8 lg:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gold-400/10 rounded-full blur-3xl" />

            <div className="relative">
              <MapPin className="h-10 w-10 text-gold-400 mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ihre Stadt nicht dabei?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8 text-lg">
                Kein Problem! Wir kaufen Fahrzeuge in ganz Deutschland an — auch bei Ihnen.
                Kontaktieren Sie uns einfach.
              </p>
              <Link
                href="/#lead-form"
                id="standorte-bottom-cta"
                className="group inline-flex items-center gap-2 bg-gradient-gold text-navy-900 font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-gold-lg hover:-translate-y-0.5 btn-cta-glow"
              >
                Jetzt Angebot erhalten
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}