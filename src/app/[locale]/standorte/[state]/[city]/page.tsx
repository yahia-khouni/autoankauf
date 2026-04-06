import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { germanStates, getStateBySlug, getCityBySlug } from "@/data/locations";
import { MapPin, ArrowLeft, Phone, Clock, Euro, Car, Star, Shield, CheckCircle } from "lucide-react";
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
  
  if (!state || !city) {
    return { title: "Nicht gefunden" };
  }

  return {
    title: `Autoankauf ${city.name} | Auto verkaufen in ${city.name} (${state.name})`,
    description: `Autoankauf in ${city.name}: Verkaufen Sie Ihr Auto schnell und fair. Kostenlose Bewertung, sofortige Auszahlung, Abholung vor Ort in ${city.name}. Jetzt Angebot erhalten!`,
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, state: stateSlug, city: citySlug } = await params;
  setRequestLocale(locale);
  
  const state = getStateBySlug(stateSlug);
  const city = state ? getCityBySlug(stateSlug, citySlug) : null;

  if (!state || !city) {
    notFound();
  }

  const otherCities = state.cities.filter((c) => c.slug !== city.slug).slice(0, 6);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/standorte" className="text-slate-400 hover:text-gold-400 transition-colors">
              Standorte
            </Link>
            <span className="text-slate-600">/</span>
            <Link href={`/standorte/${state.slug}`} className="text-slate-400 hover:text-gold-400 transition-colors">
              {state.name}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-gold-400">{city.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 mb-6">
              <MapPin className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-300">{city.name}, {state.name}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
              Autoankauf <span className="text-gold-gradient">{city.name}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Verkaufen Sie Ihr Auto in {city.name} schnell, fair und unkompliziert. 
              Mit über {formatNumber(city.population)} Einwohnern ist {city.name} eine wichtige 
              Stadt in {state.name} – und wir sind für Sie da!
            </p>
          </div>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Features Grid */}
            <div className="grid sm:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Clock, title: "24h Angebot", desc: "Schnelle Reaktion", gradient: "from-amber-400 to-orange-500" },
                { icon: Euro, title: "Faire Preise", desc: "Marktgerecht", gradient: "from-green-400 to-emerald-600" },
                { icon: Car, title: "Alle Marken", desc: "Jedes Modell", gradient: "from-blue-400 to-indigo-600" },
                { icon: Phone, title: "Persönlich", desc: "Kein Callcenter", gradient: "from-purple-400 to-pink-600" },
              ].map((item, i) => (
                <div key={i} className="group relative bg-white rounded-2xl border border-slate-100 p-5 hover:border-gold-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-semibold text-navy-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-p:text-slate-600 prose-strong:text-navy-800 prose-li:text-slate-600">
              <h2>Auto verkaufen in {city.name} – So einfach geht&apos;s</h2>
              <p>
                Sie möchten Ihr Auto in {city.name} verkaufen? Wir machen es Ihnen so einfach 
                wie möglich. Füllen Sie einfach unser kurzes Formular aus und erhalten Sie 
                innerhalb von 24 Stunden ein faires Angebot für Ihr Fahrzeug.
              </p>

              <div className="not-prose my-8 p-6 bg-gradient-to-br from-navy-50 to-slate-50 rounded-2xl border border-navy-100">
                <h3 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gold-500" />
                  Ihre Vorteile beim Autoankauf in {city.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Lokaler Service direkt zu Ihnen",
                    "Kostenlose professionelle Bewertung",
                    "Sofortige Zahlung bar oder per Überweisung",
                    "Kostenlose Abholung vor Ort",
                    "Alle Marken: BMW, Mercedes, VW, Audi",
                    "Auch Fahrzeuge mit Schaden",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3>Welche Autos kaufen wir in {city.name}?</h3>
              <p>
                Wir kaufen Fahrzeuge aller Art – vom gepflegten Gebrauchtwagen bis zum 
                Unfallfahrzeug. Besonders interessiert sind wir an:
              </p>
              <ul>
                <li>Deutsche Premiummarken (Audi, BMW, Mercedes, Porsche)</li>
                <li>Volkswagen, Opel, Ford und andere Volumenmarken</li>
                <li>Importfahrzeuge (Toyota, Honda, Hyundai, etc.)</li>
                <li>Nutzfahrzeuge und Transporter</li>
                <li>Fahrzeuge mit hoher Laufleistung</li>
                <li>Unfallfahrzeuge und Fahrzeuge mit Mängeln</li>
              </ul>

              <div className="not-prose my-8 p-6 bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl border border-gold-200">
                <h3 className="text-xl font-bold text-navy-900 mb-4">Der Ablauf – In 3 Schritten zum Verkauf</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Anfrage stellen", desc: "Füllen Sie unser Formular mit den wichtigsten Daten Ihres Fahrzeugs aus." },
                    { step: "2", title: "Angebot erhalten", desc: "Innerhalb von 24 Stunden erhalten Sie ein unverbindliches Angebot von uns." },
                    { step: "3", title: "Fahrzeug übergeben", desc: "Bei Einigung kommen wir zu Ihnen, prüfen das Fahrzeug und bezahlen sofort." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center font-bold text-navy-900 flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900">{item.title}</div>
                        <div className="text-sm text-slate-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3>Häufig gestellte Fragen zum Autoankauf in {city.name}</h3>
              
              <h4>Wie lange dauert der gesamte Prozess?</h4>
              <p>
                In der Regel können wir den gesamten Ankauf innerhalb von 2-3 Tagen 
                abschließen. Bei dringenden Fällen geht es oft noch schneller.
              </p>

              <h4>Muss ich mein Auto zu Ihnen bringen?</h4>
              <p>
                Nein! Wir bieten einen kostenlosen Abholservice in {city.name} und Umgebung. 
                Sie müssen sich um nichts kümmern.
              </p>

              <h4>Welche Unterlagen benötige ich?</h4>
              <p>
                Für den Verkauf benötigen Sie: Fahrzeugbrief (Zulassungsbescheinigung Teil II), 
                Fahrzeugschein (Teil I), gültige HU-Bescheinigung (falls vorhanden), 
                Serviceheft und alle Fahrzeugschlüssel.
              </p>
            </div>

            {/* Other Cities */}
            {otherCities.length > 0 && (
              <div className="mt-12 p-8 bg-slate-50 rounded-3xl">
                <h3 className="text-xl font-bold text-navy-900 mb-6">
                  Autoankauf in weiteren Städten in {state.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/standorte/${state.slug}/${c.slug}`}
                      className="px-5 py-2.5 bg-white border border-slate-200 hover:border-gold-400 hover:shadow-md rounded-xl text-sm font-medium text-navy-700 transition-all"
                    >
                      {c.name}
                    </Link>
                  ))}
                  {state.cities.length > 7 && (
                    <Link
                      href={`/standorte/${state.slug}`}
                      className="px-5 py-2.5 text-gold-600 hover:text-gold-700 text-sm font-semibold"
                    >
                      Alle Städte →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-gold rounded-3xl blur-xl opacity-20" />
              
              <div className="relative bg-white border border-slate-200/50 rounded-3xl p-8 shadow-premium">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-100 to-transparent rounded-bl-full opacity-50" />
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-gold-500 fill-gold-500" />
                    <span className="text-sm font-semibold text-gold-600">Premium Service</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">Kostenloses Angebot</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Für Ihr Auto in {city.name}
                  </p>
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
