import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { germanStates, getStateBySlug, getCityBySlug } from "@/data/locations";
import {
  MapPin,
  ArrowRight,
  Phone,
  Clock,
  Euro,
  Car,
  Star,
  Shield,
  CheckCircle,
  Users,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { LeadForm } from "@/components/forms/lead-form";
import { locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: Locale; state: string; city: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; state: string; city: string }[] = [];
  locales.forEach((locale) => {
    germanStates.forEach((state) => {
      state.cities.forEach((city) => {
        params.push({ locale, state: state.slug, city: city.slug });
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getStateBySlug(stateSlug);
  const city = state ? getCityBySlug(stateSlug, citySlug) : null;

  if (!state || !city) return { title: "Nicht gefunden" };

  return {
    title: `Autoankauf ${city.name} | Auto verkaufen in ${city.name} (${state.name})`,
    description: `Autoankauf in ${city.name}: Verkaufen Sie Ihr Auto schnell und fair. Kostenlose Bewertung, sofortige Auszahlung, Abholung vor Ort in ${city.name}. Jetzt Angebot erhalten!`,
    keywords: [
      `Autoankauf ${city.name}`,
      `Auto verkaufen ${city.name}`,
      `PKW Ankauf ${city.name}`,
      `Gebrauchtwagen Ankauf ${city.name}`,
      `Auto Ankauf ${state.name}`,
    ],
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
    desc: "Marktgerecht",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    icon: Car,
    title: "Alle Marken",
    desc: "Jedes Modell",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    icon: Phone,
    title: "Persönlich",
    desc: "Kein Callcenter",
    gradient: "from-purple-400 to-pink-600",
  },
];

const testimonials = [
  {
    name: "Thomas K.",
    rating: 5,
    text: "Unkomplizierter Ablauf, faires Angebot. Auto abgeholt und sofort bezahlt. Sehr empfehlenswert!",
    car: "BMW 3er",
  },
  {
    name: "Sandra M.",
    rating: 5,
    text: "Innerhalb von 24h ein super Angebot erhalten. Die Abwicklung war blitzschnell und transparent.",
    car: "VW Golf",
  },
  {
    name: "Markus L.",
    rating: 5,
    text: "Hatte ein Unfallfahrzeug — trotzdem ein faires Angebot. Sofort bar bezahlt. Top Service!",
    car: "Mercedes C-Klasse",
  },
];

export default async function CityPage({ params }: Props) {
  const { locale, state: stateSlug, city: citySlug } = await params;
  setRequestLocale(locale);

  const state = getStateBySlug(stateSlug);
  const city = state ? getCityBySlug(stateSlug, citySlug) : null;

  if (!state || !city) notFound();

  const otherCities = state.cities.filter((c) => c.slug !== city.slug).slice(0, 6);

  return (
    <div className="relative overflow-hidden">
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-gold-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-navy-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gold-300/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
            <Link href="/" className="text-slate-400 hover:text-gold-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/standorte" className="text-slate-400 hover:text-gold-400 transition-colors">
              Standorte
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href={`/standorte/${state.slug}`}
              className="text-slate-400 hover:text-gold-400 transition-colors"
            >
              {state.name}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-gold-400">{city.name}</span>
          </nav>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: Headline */}
            <div className="lg:col-span-3">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-gold-400/30 backdrop-blur-sm px-4 py-2 mb-6">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span className="text-sm font-medium text-gold-300">
                  {city.name}, {state.name}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Autoankauf{" "}
                <span className="text-gold-gradient">{city.name}</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Verkaufen Sie Ihr Auto in <strong className="text-white">{city.name}</strong> schnell,
                fair und unkompliziert. Mit über{" "}
                <strong className="text-white">{formatNumber(city.population)}</strong> Einwohnern ist{" "}
                {city.name} eine der wichtigsten Städte in {state.name} — und wir sind direkt für Sie da.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Zap, label: "24h Angebot" },
                  { icon: Shield, label: "100% Kostenlos" },
                  { icon: TrendingUp, label: "Sofortzahlung" },
                ].map((pill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 backdrop-blur-sm"
                  >
                    <pill.icon className="h-4 w-4 text-gold-400" />
                    <span className="text-sm text-white font-medium">{pill.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero mini-card */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-gold rounded-3xl blur-2xl opacity-10" />
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-gold-400 fill-gold-400" />
                    <span className="text-gold-300 font-semibold text-sm">5.0 Sterne Bewertung</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    "Schnell, fair und professionell. Bestes Autoankauf-Erlebnis in {city.name}!"
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {[
                      { val: "24h", label: "Angebot" },
                      { val: "0€", label: "Provision" },
                      { val: "Bar", label: "Zahlung" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                        <div className="text-base font-bold text-gold-400">{s.val}</div>
                        <div className="text-[10px] text-slate-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="#city-lead-form"
                    id={`city-hero-cta-${city.slug}`}
                    className="group flex items-center justify-center gap-2 w-full bg-gradient-gold text-navy-900 font-bold px-6 py-3.5 rounded-2xl transition-all hover:shadow-gold-lg btn-cta-glow text-sm"
                  >
                    Jetzt Angebot erhalten
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE STRIP
      ══════════════════════════════════════════ */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-gold-200 p-4 transition-all duration-300 hover:shadow-md"
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

      {/* ══════════════════════════════════════════
          MAIN CONTENT + STICKY SIDEBAR
      ══════════════════════════════════════════ */}
      <section id="city-lead-form" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ── CONTENT ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Intro */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-4">
                  Auto verkaufen in {city.name} — So einfach geht&apos;s
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Sie möchten Ihr Auto in {city.name} verkaufen? Wir machen es Ihnen so einfach wie
                  möglich. Füllen Sie einfach unser kurzes Formular aus und erhalten Sie innerhalb
                  von 24 Stunden ein faires, unverbindliches Angebot für Ihr Fahrzeug.
                </p>
              </div>

              {/* Benefits Block */}
              <div className="bg-gradient-to-br from-navy-50 to-slate-50 rounded-3xl border border-navy-100 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                    <Shield className="h-5 w-5 text-navy-900" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">
                    Ihre Vorteile beim Autoankauf in {city.name}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Lokaler Service direkt zu Ihnen",
                    "Kostenlose professionelle Bewertung",
                    "Sofortige Zahlung bar oder per Überweisung",
                    "Kostenlose Abholung vor Ort",
                    "Alle Marken: BMW, Mercedes, VW, Audi",
                    "Auch Fahrzeuge mit Schäden",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-3xl border border-gold-200 p-6 lg:p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Der Ablauf – In 3 Schritten zum Verkauf
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      step: "01",
                      title: "Anfrage stellen",
                      desc: `Füllen Sie unser Formular mit den wichtigsten Daten Ihres Fahrzeugs aus. Dauert nur 2 Minuten.`,
                    },
                    {
                      step: "02",
                      title: "Angebot erhalten",
                      desc: `Innerhalb von 24 Stunden erhalten Sie ein unverbindliches Angebot von uns — direkt und ohne Umwege.`,
                    },
                    {
                      step: "03",
                      title: "Fahrzeug übergeben & kassieren",
                      desc: `Bei Einigung kommen wir zu Ihnen in ${city.name}, prüfen das Fahrzeug und bezahlen sofort aus.`,
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

              {/* Car types */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  Welche Autos kaufen wir in {city.name}?
                </h3>
                <p className="text-slate-600 mb-4">
                  Wir kaufen Fahrzeuge aller Art — vom gepflegten Gebrauchtwagen bis zum
                  Unfallfahrzeug. Besonders interessiert sind wir an:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Deutsche Premiummarken (Audi, BMW, Mercedes, Porsche)",
                    "Volkswagen, Opel, Ford & andere Volumenmarken",
                    "Importfahrzeuge (Toyota, Honda, Hyundai, etc.)",
                    "Nutzfahrzeuge und Transporter",
                    "Fahrzeuge mit hoher Laufleistung",
                    "Unfallfahrzeuge & Fahrzeuge mit Mängeln",
                  ].map((car, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-slate-100 last:border-0">
                      <Car className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{car}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Das sagen unsere Kunden
                </h3>
                <div className="grid sm:grid-cols-1 gap-4">
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="testimonial-card bg-white border border-slate-100 hover:border-gold-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-bold text-navy-900 text-sm">{t.name}</div>
                          <div className="text-xs text-slate-400">{t.car}</div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star
                              key={j}
                              className="h-4 w-4 text-gold-400 fill-gold-400 animate-star-pop"
                              style={{ animationDelay: `${j * 60}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Häufig gestellte Fragen zum Autoankauf in {city.name}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      q: "Wie lange dauert der gesamte Prozess?",
                      a: `In der Regel können wir den gesamten Ankauf in ${city.name} innerhalb von 2–3 Tagen abschließen. Bei dringenden Fällen geht es oft noch schneller.`,
                    },
                    {
                      q: `Muss ich mein Auto nach ${city.name} bringen?`,
                      a: `Nein! Wir bieten einen kostenlosen Abholservice in ${city.name} und der gesamten Umgebung. Sie müssen sich um nichts kümmern.`,
                    },
                    {
                      q: "Welche Unterlagen benötige ich?",
                      a: "Für den Verkauf benötigen Sie: Fahrzeugbrief (Teil II), Fahrzeugschein (Teil I), HU-Bescheinigung (falls vorhanden), Serviceheft und alle Fahrzeugschlüssel.",
                    },
                    {
                      q: "Kaufen Sie auch Autos mit Mängeln?",
                      a: `Ja, wir kaufen Fahrzeuge in jedem Zustand — auch Unfallfahrzeuge, solche mit Motorschäden oder hohem Kilometerstand. Rufen Sie uns einfach an!`,
                    },
                  ].map((faq, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-100 hover:border-gold-100 rounded-2xl p-5 transition-colors"
                    >
                      <h4 className="font-bold text-navy-900 mb-2 text-sm">{faq.q}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Cities */}
              {otherCities.length > 0 && (
                <div className="bg-slate-50 rounded-3xl p-6 lg:p-8">
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    Autoankauf in weiteren Städten in {state.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-5">
                    Wir sind auch in diesen Städten für Sie da:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {otherCities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/standorte/${state.slug}/${c.slug}`}
                        className="group inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:border-gold-300 hover:bg-gold-50 rounded-xl text-sm font-medium text-navy-700 hover:text-gold-700 transition-all shadow-sm hover:shadow-md"
                      >
                        <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-gold-500 transition-colors" />
                        {c.name}
                        <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                    {state.cities.length > 7 && (
                      <Link
                        href={`/standorte/${state.slug}`}
                        className="inline-flex items-center gap-1 px-4 py-2.5 text-gold-600 hover:text-gold-700 text-sm font-bold transition-colors"
                      >
                        Alle Städte in {state.name}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── STICKY SIDEBAR FORM ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Glow halo */}
                <div className="absolute -inset-3 bg-gradient-gold rounded-3xl blur-2xl opacity-15 pointer-events-none" />

                <div className="relative bg-white border border-slate-200/60 rounded-3xl p-7 shadow-premium overflow-hidden">
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-gold-50 to-transparent rounded-bl-3xl opacity-80 pointer-events-none" />

                  <div className="relative">
                    {/* Premium badge */}
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
                      Für Ihr Auto in {city.name} — unverbindlich &amp; schnell
                    </p>

                    <LeadForm />

                    {/* Trust micro-copy */}
                    <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                      {[
                        "Keine Kosten, kein Risiko",
                        `Abholung direkt in ${city.name}`,
                        "Sofortige Auszahlung garantiert",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-xs text-slate-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Population fact card */}
                <div className="mt-4 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-5 text-white border border-navy-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-gold-400" />
                    <span className="text-xs font-semibold text-gold-400 uppercase tracking-wide">
                      Lokaler Markt
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatNumber(city.population)}+
                  </div>
                  <div className="text-xs text-slate-400">
                    Einwohner in {city.name} — ein großer lokaler Automarkt mit echtem Bedarf.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container">
          <div className="relative bg-gradient-hero rounded-3xl p-8 lg:p-12 text-center overflow-hidden border border-navy-700/30">
            <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-28 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-1.5 bg-gold-400/20 border border-gold-400/30 text-gold-300 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Zap className="h-3.5 w-3.5" />
                Jetzt starten
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Bereit Ihr Auto in {city.name} zu verkaufen?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                Starten Sie jetzt — kostenlos, unverbindlich und in unter 2 Minuten.
                Unser Team in {state.name} ist für Sie da.
              </p>
              <Link
                href="#city-lead-form"
                id={`city-bottom-cta-${city.slug}`}
                className="group inline-flex items-center gap-2 bg-gradient-gold text-navy-900 font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-gold-lg hover:-translate-y-0.5 btn-cta-glow"
              >
                Jetzt kostenloses Angebot
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
