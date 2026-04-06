import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CheckCircle, Users, Award, Clock, Car, Euro, Shield, Heart } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Uber uns | Autoankauf Deutschland",
  description: "Erfahren Sie mehr uber Autoankauf Deutschland. Ihre vertrauenswurdige Adresse fur den fairen und schnellen Autoverkauf in ganz Deutschland.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function UeberUnsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = [
    { icon: Car, value: "5.000+", label: "Autos angekauft" },
    { icon: Users, value: "4.9/5", label: "Kundenbewertung" },
    { icon: Clock, value: "24h", label: "Angebot-Garantie" },
    { icon: Award, value: "10+", label: "Jahre Erfahrung" },
  ];

  const values = [
    {
      icon: Euro,
      title: "Faire Preise",
      description: "Wir bieten marktgerechte Preise basierend auf einer transparenten Bewertung.",
    },
    {
      icon: Clock,
      title: "Schneller Service",
      description: "Von der Anfrage bis zur Auszahlung - bei uns geht alles schnell und unkompliziert.",
    },
    {
      icon: Shield,
      title: "Vertrauen & Sicherheit",
      description: "Rechtssichere Abwicklung und transparente Prozesse fur Ihre Sicherheit.",
    },
    {
      icon: Heart,
      title: "Kundenzufriedenheit",
      description: "Ihr Vertrauen ist uns wichtig - deshalb geben wir bei jedem Kauf unser Bestes.",
    },
  ];

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Uber Autoankauf Deutschland</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seit uber einem Jahrzehnt sind wir Ihr verlasslicher Partner fur den Autoverkauf 
            in ganz Deutschland. Schnell, fair und unkompliziert.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-primary/5 rounded-xl">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Unsere Geschichte</h2>
            <div className="prose text-muted-foreground">
              <p>
                Autoankauf Deutschland wurde mit einer einfachen Mission gegrundet: 
                Den Autoverkauf so einfach und fair wie moglich zu gestalten. 
              </p>
              <p>
                Was als kleines Unternehmen begann, ist heute zu einem deutschlandweiten 
                Service gewachsen, dem tausende Kunden vertrauen. Unser Erfolgsrezept? 
                Wir behandeln jedes Auto und jeden Kunden so, wie wir selbst behandelt 
                werden mochten.
              </p>
              <p>
                Im Gegensatz zu grosen anonymen Plattformen setzen wir auf personlichen 
                Kontakt und individuelle Beratung. Bei uns sind Sie keine Nummer - 
                Sie sind unser geschatzter Kunde.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Warum uns wahlen?</h2>
            <ul className="space-y-4">
              {[
                "Faire und transparente Preisgestaltung",
                "Schnelle Abwicklung - oft innerhalb von 48 Stunden",
                "Kostenlose Fahrzeugbewertung und Abholung",
                "Sofortige Auszahlung bei Fahrzeugubergabe",
                "Keine versteckten Gebuhren oder Abzuge",
                "Personlicher Ansprechpartner fur Sie",
                "Deutschlandweiter Service",
                "Alle Marken und Modelle - auch mit Mangeln",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Unsere Werte</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                <value.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit, Ihr Auto zu verkaufen?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Uberzeugen Sie sich selbst von unserem Service. Erhalten Sie jetzt ein 
            kostenloses und unverbindliches Angebot fur Ihr Fahrzeug.
          </p>
          <a
            href="/#lead-form"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Jetzt Angebot erhalten
          </a>
        </div>
      </div>
    </div>
  );
}
