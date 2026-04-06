import Link from "next/link";
import { useTranslations } from "next-intl";
import { germanStates } from "@/data/locations";
import { MapPin, ChevronRight } from "lucide-react";

export function LocationsMapSection() {
  const t = useTranslations("locations");

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {germanStates.map((state) => (
            <Link
              key={state.slug}
              href={`/standorte/${state.slug}`}
              className="group flex items-center gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
            >
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate group-hover:text-primary">{state.name}</p>
                <p className="text-xs text-muted-foreground">
                  {state.cities.length > 0 ? `${state.cities.length} Stadte` : "Stadtland"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/standorte" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            {t("viewAll")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
