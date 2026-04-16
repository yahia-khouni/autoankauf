import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { germanStates } from "@/data/locations";
import { MapPin, ChevronRight, ArrowRight, Shield, Zap, Star, TrendingUp, Phone } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Autoankauf Standorte in Deutschland | Alle Bundesländer & Städte",
  description:
    "Autoankauf in ganz Deutschland. Finden Sie unseren Service in Ihrem Bundesland oder Ihrer Stadt. Bayern, NRW, Berlin, Hamburg und mehr. Schnell, fair und unkompliziert.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const stateEmojis: Record<string, string> = {
  "bayern": "🏔️",
  "nordrhein-westfalen": "🏭",
  "berlin": "🐻",
  "hamburg": "⚓",
  "hessen": "🏛️",
  "niedersachsen": "🌾",
  "sachsen": "🏰",
  "rheinland-pfalz": "🍷",
  "thueringen": "🌲",
  "schleswig-holstein": "⛵",
  "sachsen-anhalt": "🏞️",
  "mecklenburg-vorpommern": "🌊",
  "bremen": "🦅",
  "saarland": "⛏️",
  "brandenburg": "🦌",
  "baden-wuerttemberg": "⚙️",
};

const trustStats = [
  { value: "16", label: "Bundesländer", icon: MapPin },
  { value: "100+", label: "Städte", icon: TrendingUp },
  { value: "24h", label: "Angebot", icon: Zap },
  { value: "5.0★", label: "Bewertung", icon: Star },
];

export default async function StandortePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const totalCities = germanStates.reduce((sum, state) => sum + state.cities.length, 0);

  return (
    <div className="relative overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />

        {/* Decorative orbs */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-navy-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/4 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-slate-400 hover:text-gold-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-gold-400">Standorte</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-gold-400/30 backdrop-blur-sm px-4 py-2 mb-6">
            <MapPin className="h-4 w-4 text-gold-400" />
            <span className="text-sm font-medium text-gold-300">Deutschlandweit verfügbar</span>
          </div>

          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Autoankauf in{" "}
              <span className="text-gold-gradient">ganz Deutschland</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Wir kaufen Ihr Auto in allen <strong className="text-white">16 Bundesländern</strong> und
              über <strong className="text-white">{totalCities} Städten</strong>. Schnell, fair und mit
              sofortiger Auszahlung — egal wo Sie sich befinden.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-4 text-center"
              >
                <stat.icon className="h-5 w-5 text-gold-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATES GRID ── */}
      <section className="py-16 lg:py-24 bg-slate-50/50">
        <div className="container">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 text-gold-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
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

          {/* States grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {germanStates.map((state) => {
              const topCities = state.cities.slice(0, 4);
              const emoji = stateEmojis[state.slug] || "📍";

              return (
                <div
                  key={state.slug}
                  className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-gold-200 hover:shadow-gold transition-all duration-400 card-hover"
                >
                  {/* Gradient accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card header */}
                  <Link href={`/standorte/${state.slug}`} className="block p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{emoji}</div>
                        <div>
                          <h3 className="font-bold text-navy-900 group-hover:text-gold-600 transition-colors text-sm leading-tight">
                            Autoankauf {state.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {state.cities.length > 0
                              ? `${state.cities.length} ${state.cities.length === 1 ? "Stadt" : "Städte"}`
                              : "Stadtstaatservice"}
                          </p>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-gold-50 border border-slate-200 group-hover:border-gold-200 flex items-center justify-center transition-all flex-shrink-0">
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>

                  {/* City pills */}
                  {topCities.length > 0 && (
                    <div className="px-5 pb-5">
                      <div className="h-px bg-slate-100 mb-3" />
                      <div className="flex flex-wrap gap-1.5">
                        {topCities.map((city) => (
                          <Link
                            key={city.slug}
                            href={`/standorte/${state.slug}/${city.slug}`}
                            className="text-xs px-2.5 py-1 bg-slate-50 hover:bg-gold-50 text-slate-600 hover:text-gold-700 border border-slate-200 hover:border-gold-200 rounded-lg transition-all font-medium"
                          >
                            {city.name}
                          </Link>
                        ))}
                        {state.cities.length > 4 && (
                          <Link
                            href={`/standorte/${state.slug}`}
                            className="text-xs px-2.5 py-1 text-gold-600 hover:text-gold-700 font-semibold transition-colors"
                          >
                            +{state.cities.length - 4} mehr →
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
                Der zuverlässige Autoankauf-Service in Deutschland
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Seit Jahren kaufen wir Fahrzeuge in ganz Deutschland an. Unser Netzwerk ermöglicht es uns,
                schnell und unkompliziert zu reagieren — egal ob Sie in einer Großstadt oder auf dem Land wohnen.
              </p>

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
                {/* Decorative pattern */}
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
