import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { germanStates, getStateBySlug, getCityBySlug } from "@/data/locations";
import { MapPin, ArrowLeft, Phone, Clock, Euro, Car } from "lucide-react";
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
    <div className="py-12">
      <div className="container">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/standorte" className="hover:text-primary">
            Standorte
          </Link>
          <span>/</span>
          <Link href={`/standorte/${state.slug}`} className="hover:text-primary">
            {state.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{city.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">Autoankauf {city.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Verkaufen Sie Ihr Auto in {city.name} schnell, fair und unkompliziert. 
              Mit uber {formatNumber(city.population)} Einwohnern ist {city.name} eine wichtige 
              Stadt in {state.name} - und wir sind fur Sie da!
            </p>

            <div className="grid sm:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">24h Angebot</div>
                  <div className="text-xs text-muted-foreground">Schnelle Reaktion</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Euro className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">Faire Preise</div>
                  <div className="text-xs text-muted-foreground">Marktgerecht</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Car className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">Alle Marken</div>
                  <div className="text-xs text-muted-foreground">Jedes Modell</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Phone className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">Personlich</div>
                  <div className="text-xs text-muted-foreground">Kein Callcenter</div>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2>Auto verkaufen in {city.name} - So einfach geht&apos;s</h2>
              <p>
                Sie mochten Ihr Auto in {city.name} verkaufen? Wir machen es Ihnen so einfach 
                wie moglich. Fullen Sie einfach unser kurzes Formular aus und erhalten Sie 
                innerhalb von 24 Stunden ein faires Angebot fur Ihr Fahrzeug.
              </p>

              <h3>Ihre Vorteile beim Autoankauf in {city.name}</h3>
              <ul>
                <li><strong>Lokaler Service:</strong> Wir kommen direkt zu Ihnen nach {city.name}</li>
                <li><strong>Kostenlose Bewertung:</strong> Professionelle Einschatzung Ihres Fahrzeugs</li>
                <li><strong>Sofortige Zahlung:</strong> Bar oder per Uberweisung - Sie entscheiden</li>
                <li><strong>Kostenlose Abholung:</strong> Wir holen Ihr Auto direkt bei Ihnen ab</li>
                <li><strong>Alle Marken:</strong> BMW, Mercedes, VW, Audi und viele mehr</li>
                <li><strong>Jeder Zustand:</strong> Auch Fahrzeuge mit Schaden oder hoher Laufleistung</li>
              </ul>

              <h3>Welche Autos kaufen wir in {city.name}?</h3>
              <p>
                Wir kaufen Fahrzeuge aller Art - vom gepflegten Gebrauchtwagen bis zum 
                Unfallfahrzeug. Besonders interessiert sind wir an:
              </p>
              <ul>
                <li>Deutsche Premiummarken (Audi, BMW, Mercedes, Porsche)</li>
                <li>Volkswagen, Opel, Ford und andere Volumenmarken</li>
                <li>Importfahrzeuge (Toyota, Honda, Hyundai, etc.)</li>
                <li>Nutzfahrzeuge und Transporter</li>
                <li>Fahrzeuge mit hoher Laufleistung</li>
                <li>Unfallfahrzeuge und Fahrzeuge mit Mangeln</li>
              </ul>

              <h3>Der Ablauf - In 3 Schritten zum Verkauf</h3>
              <ol>
                <li>
                  <strong>Anfrage stellen:</strong> Fullen Sie unser Formular mit den 
                  wichtigsten Daten Ihres Fahrzeugs aus.
                </li>
                <li>
                  <strong>Angebot erhalten:</strong> Innerhalb von 24 Stunden erhalten Sie 
                  ein unverbindliches Angebot von uns.
                </li>
                <li>
                  <strong>Fahrzeug ubergeben:</strong> Bei Einigung kommen wir zu Ihnen, 
                  prufen das Fahrzeug und bezahlen sofort.
                </li>
              </ol>

              <h3>Haufig gestellte Fragen zum Autoankauf in {city.name}</h3>
              
              <h4>Wie lange dauert der gesamte Prozess?</h4>
              <p>
                In der Regel konnen wir den gesamten Ankauf innerhalb von 2-3 Tagen 
                abschliessen. Bei dringenden Fallen geht es oft noch schneller.
              </p>

              <h4>Muss ich mein Auto zu Ihnen bringen?</h4>
              <p>
                Nein! Wir bieten einen kostenlosen Abholservice in {city.name} und Umgebung. 
                Sie mussen sich um nichts kummern.
              </p>

              <h4>Welche Unterlagen benotige ich?</h4>
              <p>
                Fur den Verkauf benotigen Sie: Fahrzeugbrief (Zulassungsbescheinigung Teil II), 
                Fahrzeugschein (Teil I), gultige HU-Bescheinigung (falls vorhanden), 
                Serviceheft und alle Fahrzeugschlussel.
              </p>
            </div>

            {otherCities.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">
                  Autoankauf in weiteren Stadten in {state.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/standorte/${state.slug}/${c.slug}`}
                      className="px-4 py-2 bg-slate-100 hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                  {state.cities.length > 7 && (
                    <Link
                      href={`/standorte/${state.slug}`}
                      className="px-4 py-2 text-primary hover:underline text-sm"
                    >
                      Alle Stadte in {state.name}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Kostenloses Angebot</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fur Ihr Auto in {city.name}
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
