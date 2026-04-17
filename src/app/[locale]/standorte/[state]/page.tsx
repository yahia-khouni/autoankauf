import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { germanStates, getStateBySlug } from "@/data/locations";
import { MapPin, ChevronRight, Users, ArrowLeft } from "lucide-react";
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
  
  if (!state) {
    return { title: "Nicht gefunden" };
  }

  return {
    title: `Autoankauf ${state.name} | Auto verkaufen in ${state.name}`,
    description: `Verkaufen Sie Ihr Auto in ${state.name}. Schnell, fair und unkompliziert. Kostenlose Bewertung und sofortige Auszahlung. Jetzt Angebot erhalten!`,
  };
}

export default async function StatePage({ params }: Props) {
  const { locale, state: stateSlug } = await params;
  setRequestLocale(locale);
  
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const getLocalizedHref = (path: string) => {
    if (locale === "de") return path;
    if (path === "/") return `/${locale}`;
    return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
  };

  return (
    <div className="py-12">
      <div className="container">
        <Link
          href={getLocalizedHref("/standorte")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Alle Standorte
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">Autoankauf {state.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Wir kaufen Ihr Auto in {state.name} zu fairen Preisen. Ob in der Hauptstadt oder in 
              kleineren Stadten - unser Service ist uberall fur Sie da. Schnell, unkompliziert 
              und mit sofortiger Auszahlung.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Angebot</div>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">Kostenlos</div>
                <div className="text-sm text-muted-foreground">Abholung</div>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">Sofort</div>
                <div className="text-sm text-muted-foreground">Auszahlung</div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              Autoankauf in Stadten von {state.name}
            </h2>

            {state.cities.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {state.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={getLocalizedHref(`/standorte/${state.slug}/${city.slug}`)}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium group-hover:text-primary">
                          Autoankauf {city.name}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          <Users className="h-3 w-3 inline mr-1" />
                          {formatNumber(city.population)} Einwohner
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Als Stadtstaat bieten wir unseren Service im gesamten Gebiet von {state.name} an.
              </p>
            )}

            <div className="mt-12 prose max-w-none">
              <h2>Warum Autoankauf in {state.name}?</h2>
              <p>
                Sie mochten Ihr Auto in {state.name} verkaufen? Wir bieten Ihnen einen schnellen, 
                fairen und unkomplizierten Service. Egal ob Ihr Fahrzeug noch gut in Schuss ist 
                oder schon einige Gebrauchsspuren hat - wir machen Ihnen ein faires Angebot.
              </p>
              
              <h3>Unser Service in {state.name}</h3>
              <ul>
                <li>Kostenlose Fahrzeugbewertung vor Ort</li>
                <li>Faire Preise basierend auf aktuellem Marktwert</li>
                <li>Sofortige Barzahlung oder Uberweisung</li>
                <li>Kostenlose Abholung Ihres Fahrzeugs</li>
                <li>Alle Marken und Modelle</li>
                <li>Auch Fahrzeuge mit Mangeln oder Unfallschaden</li>
              </ul>

              <h3>So funktioniert der Autoankauf in {state.name}</h3>
              <ol>
                <li>Fullen Sie unser Online-Formular mit den Fahrzeugdaten aus</li>
                <li>Erhalten Sie innerhalb von 24 Stunden ein unverbindliches Angebot</li>
                <li>Bei Einigung holen wir Ihr Auto ab und bezahlen sofort</li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Kostenloses Angebot erhalten</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fur Ihr Auto in {state.name}
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
