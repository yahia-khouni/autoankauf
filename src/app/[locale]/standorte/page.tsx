import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { germanStates } from "@/data/locations";
import { MapPin, ChevronRight, Users } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Autoankauf Standorte in Deutschland | Alle Bundeslander & Stadte",
  description:
    "Autoankauf in ganz Deutschland. Finden Sie unseren Service in Ihrem Bundesland oder Ihrer Stadt. Bayern, NRW, Berlin, Hamburg und mehr.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function StandortePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("locations");

  const totalCities = germanStates.reduce((sum, state) => sum + state.cities.length, 0);

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Autoankauf Standorte in Deutschland</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir kaufen Ihr Auto in allen 16 Bundeslandern und uber {totalCities} Stadten. 
            Wahlen Sie Ihre Region fur lokale Informationen.
          </p>
        </div>

        <div className="grid gap-8">
          {germanStates.map((state) => (
            <div key={state.slug} className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <Link href={`/standorte/${state.slug}`} className="flex items-start justify-between mb-4 group">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      Autoankauf {state.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {state.cities.length > 0 ? `${state.cities.length} Stadte` : "Stadtland"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </Link>

              {state.cities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {state.cities.slice(0, 8).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/standorte/${state.slug}/${city.slug}`}
                      className="text-sm px-3 py-1.5 bg-slate-100 hover:bg-primary hover:text-white rounded-full transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                  {state.cities.length > 8 && (
                    <Link
                      href={`/standorte/${state.slug}`}
                      className="text-sm px-3 py-1.5 text-primary hover:underline"
                    >
                      +{state.cities.length - 8} mehr
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ihre Stadt nicht gefunden?</h2>
          <p className="text-muted-foreground mb-6">
            Kein Problem! Wir kaufen Autos in ganz Deutschland an. Kontaktieren Sie uns einfach.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>
      </div>
    </div>
  );
}
