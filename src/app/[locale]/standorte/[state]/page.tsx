import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { germanStates, getStateBySlug } from "@/data/locations";
import {
  MapPin,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Users,
  Zap,
  Euro,
  Car,
  Phone,
  Shield,
  CheckCircle,
  Star,
  Clock,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { LeadForm } from "@/components/forms/lead-form";
import { locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: Locale; state: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; state: string }[] = [];
  locales.forEach((locale) => {
    germanStates.forEach((state) => {
      params.push({ locale, state: state.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) return { title: "Nicht gefunden" };

  return {
    title: `Autoankauf ${state.name} | Auto verkaufen in ${state.name}`,
    description: `Verkaufen Sie Ihr Auto in ${state.name}. Schnell, fair und unkompliziert. Kostenlose Bewertung und sofortige Auszahlung in allen Städten von ${state.name}. Jetzt Angebot erhalten!`,
  };
}

const featureCards = [
  {
    icon: Clock,
    title: "24h Angebot",
    desc: "Schnelle Reaktion",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Euro,
    title: "Faire Preise",
    desc: "Marktgerechter Wert",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    icon: Car,
    title: "Alle Marken",
    desc: "Jedes Fahrzeug",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    icon: Phone,
    title: "Persönlich",
    desc: "Kein Callcenter",
    gradient: "from-purple-400 to-pink-600",
  },
];

export default async function StatePage({ params }: Props) {
  const { locale, state: stateSlug } = await params;
  setRequestLocale(locale);

  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const totalPop = state.cities.reduce((s, c) => s + c.population, 0);

  return (
    <div className="relative overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-gold-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-slate-400 hover:text-gold-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/standorte" className="text-slate-400 hover:text-gold-400 transition-colors">
              Standorte
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-gold-400">{state.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-gold-400/30 backdrop-blur-sm px-4 py-2 mb-6">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span className="text-sm font-medium text-gold-300">
                  {state.cities.length > 0
                    ? `${state.cities.length} Städte verfügbar`
                    : "Stadtstaatservice"}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Autoankauf{" "}
                <span className="text-gold-gradient">{state.name}</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Wir kaufen Ihr Auto in{" "}
                <strong className="text-white">{state.name}</strong> zu fairen
                Marktpreisen. Schnell, unkompliziert und mit sofortiger
                Auszahlung — überall in{" "}
                {state.cities.length > 0 ? "allen Städten des Bundeslandes" : "ganz {state.name}"}.
              </p>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-4">
                {state.cities.length > 0 && (
                  <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                    <MapPin className="h-4 w-4 text-gold-400" />
                    <span className="text-sm text-white font-medium">
                      {state.cities.length} Städte
                    </span>
                  </div>
                )}
                {totalPop > 0 && (
                  <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                    <Users className="h-4 w-4 text-gold-400" />
                    <span className="text-sm text-white font-medium">
                      {formatNumber(totalPop)}+ Einwohner
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-gold-400" />
                  <span className="text-sm text-white font-medium">24h Angebot</span>
                </div>
              </div>
            </div>

            {/* Hero CTA Card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-gold rounded-3xl blur-2xl opacity-10" />
                <div className="relative bg-white/8 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-gold-400 fill-gold-400" />
                    <span className="text-gold-300 font-semibold text-sm">Premium Service</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Kostenloses Angebot
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Für Ihr Auto in {state.name} — unverbindlich & schnell
                  </p>
                  <Link
                    href="#lead-form-section"
                    id={`state-hero-cta-${state.slug}`}
                    className="group flex items-center justify-center gap-2 w-full bg-gradient-gold text-navy-900 font-bold px-6 py-4 rounded-2xl transition-all hover:shadow-gold-lg btn-cta-glow"
                  >
                    Jetzt Angebot anfordern
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    {[
                      { val: "24h", label: "Angebot" },
                      { val: "100%", label: "Kostenlos" },
                      { val: "Sofort", label: "Zahlung" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white/8 rounded-xl p-3">
                        <div className="text-lg font-bold text-gold-400">{s.val}</div>
                        <div className="text-xs text-slate-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-gold-200 p-4 transition-all duration-300 hover:shadow-md"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-navy-900 text-sm">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <section id="lead-form-section" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ── LEFT COL: Content ── */}
            <div className="lg:col-span-2 space-y-12">

              {/* Cities Grid */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-2">
                  Autoankauf in Städten von {state.name}
                </h2>
                <p className="text-slate-500 mb-6">
                  Wählen Sie Ihre Stadt für spezifische lokale Informationen.
                </p>

                {state.cities.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {state.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/standorte/${state.slug}/${city.slug}`}
                        className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-gold-200 hover:shadow-gold transition-all duration-300 card-gradient-border"
                      >
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-50 to-amber-50 border border-gold-100 flex items-center justify-center group-hover:border-gold-200 transition-colors">
                            <MapPin className="h-4 w-4 text-gold-500 pin-bounce" />
                          </div>
                          <div>
                            <div className="font-semibold text-navy-900 group-hover:text-gold-700 transition-colors text-sm">
                              Autoankauf {city.name}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <Users className="h-3 w-3" />
                              {formatNumber(city.population)} Einwohner
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all relative z-10 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-navy-50 to-slate-50 border border-navy-100 rounded-2xl p-6 text-slate-600">
                    Als Stadtstaat bieten wir unseren Service im gesamten Gebiet
                    von <strong>{state.name}</strong> an. Nutzen Sie das Formular, um ein
                    kostenloses Angebot zu erhalten.
                  </div>
                )}
              </div>

              {/* Benefits Block */}
              <div className="bg-gradient-to-br from-navy-50 to-slate-50 rounded-3xl border border-navy-100 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                    <Shield className="h-5 w-5 text-navy-900" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">
                    Ihre Vorteile beim Autoankauf in {state.name}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Kostenlose Fahrzeugbewertung vor Ort",
                    "Faire Preise basierend auf aktuellem Marktwert",
                    "Sofortige Barzahlung oder Überweisung",
                    "Kostenlose Abholung Ihres Fahrzeugs",
                    "Alle Marken und Modelle",
                    "Auch Fahrzeuge mit Mängeln oder Unfallschäden",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Steps */}
              <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-3xl border border-gold-200 p-6 lg:p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  So funktioniert der Autoankauf in {state.name}
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      step: "01",
                      title: "Anfrage stellen",
                      desc: `Füllen Sie unser kurzes Formular mit den wichtigsten Daten Ihres Fahrzeugs aus. Dauert nur 2 Minuten.`,
                    },
                    {
                      step: "02",
                      title: "Angebot erhalten",
                      desc: `Innerhalb von 24 Stunden erhalten Sie ein unverbindliches Angebot von uns — direkt und ohne Umwege.`,
                    },
                    {
                      step: "03",
                      title: "Fahrzeug übergeben & Geld erhalten",
                      desc: `Bei Einigung kommen wir zu Ihnen nach ${state.name}, prüfen das Fahrzeug und zahlen sofort aus.`,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center font-bold text-navy-900 flex-shrink-0 shadow-gold text-sm group-hover:scale-105 transition-transform">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-bold text-navy-900 mb-1">{item.title}</div>
                        <div className="text-sm text-slate-600 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Prose */}
              <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-headings:font-bold prose-p:text-slate-600 prose-strong:text-navy-800 prose-li:text-slate-600">
                <h2>Warum Autoankauf in {state.name}?</h2>
                <p>
                  Sie möchten Ihr Auto in {state.name} verkaufen? Wir bieten Ihnen einen schnellen,
                  fairen und unkomplizierten Service. Egal ob Ihr Fahrzeug noch gut in Schuss ist
                  oder schon einige Gebrauchsspuren hat — wir machen Ihnen ein faires Angebot.
                </p>

                <h3>Welche Fahrzeuge kaufen wir in {state.name}?</h3>
                <ul>
                  <li>Deutsche Premiummarken (BMW, Mercedes-Benz, Audi, Porsche)</li>
                  <li>Volkswagen, Opel, Ford und andere Volumenmarken</li>
                  <li>Importfahrzeuge (Toyota, Honda, Hyundai, Kia u.v.m.)</li>
                  <li>Nutzfahrzeuge, Transporter und Kombis</li>
                  <li>Fahrzeuge mit hoher Laufleistung oder Mängeln</li>
                  <li>Unfallfahrzeuge und nicht fahrtüchtige Autos</li>
                </ul>

                <h3>Sofort-Auszahlung in {state.name}</h3>
                <p>
                  Nach der Fahrzeugübergabe erhalten Sie Ihren Kaufbetrag sofort — entweder bar
                  oder per sofortiger Banküberweisung. Keine Wartezeiten, keine Schecks, keine
                  Ausreden. Das ist unser Versprechen an alle Kunden in {state.name}.
                </p>
              </div>
            </div>

            {/* ── SIDEBAR: Sticky Form ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Glow */}
                <div className="absolute -inset-2 bg-gradient-gold rounded-3xl blur-2xl opacity-15 pointer-events-none" />

                <div className="relative bg-white border border-slate-200/60 rounded-3xl p-7 shadow-premium overflow-hidden">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-gold-50 to-transparent rounded-bl-3xl opacity-70" />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-4 w-4 text-gold-500 fill-gold-500" />
                      <span className="text-xs font-semibold text-gold-600 uppercase tracking-wide">
                        Premium Service
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-1">
                      Kostenloses Angebot
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      Für Ihr Auto in {state.name} — unverbindlich & schnell
                    </p>

                    <LeadForm />

                    {/* Trust signals below form */}
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <div className="space-y-2.5">
                        {[
                          "Keine Provision, kein Risiko",
                          "Abholung in ganz {state.name}",
                          "Sofortige Auszahlung garantiert",
                        ].map((t, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span className="text-xs text-slate-600">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER STATES ── */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-navy-900">Weitere Bundesländer</h3>
            <Link
              href="/standorte"
              className="text-sm text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-1"
            >
              Alle Standorte
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {germanStates
              .filter((s) => s.slug !== state.slug)
              .slice(0, 10)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/standorte/${s.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 text-sm font-medium text-slate-700 rounded-xl transition-all"
                >
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {s.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
