import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ClipboardList, MessageSquare, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "So funktionierts | Autoankauf Deutschland",
  description: "Erfahren Sie, wie einfach der Autoverkauf bei uns funktioniert. In nur 3 Schritten zum Verkauf - schnell, fair und unkompliziert.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function SoFunktioniertsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const steps = [
    {
      icon: ClipboardList,
      number: "01",
      title: "Fahrzeugdaten eingeben",
      description: "Fullen Sie unser kurzes Online-Formular aus. Geben Sie die wichtigsten Daten zu Ihrem Fahrzeug ein - Marke, Modell, Baujahr und Kilometerstand. Das dauert nur 2 Minuten.",
      details: [
        "Schnelles Online-Formular",
        "Keine Registrierung erforderlich",
        "SSL-verschlusselt und sicher",
      ],
    },
    {
      icon: MessageSquare,
      number: "02",
      title: "Angebot erhalten",
      description: "Innerhalb von 24 Stunden erhalten Sie ein unverbindliches Angebot von uns. Wir bewerten Ihr Fahrzeug fair basierend auf dem aktuellen Marktwert.",
      details: [
        "Angebot innerhalb von 24 Stunden",
        "Faire Marktpreis-Bewertung",
        "Komplett unverbindlich",
      ],
    },
    {
      icon: CreditCard,
      number: "03",
      title: "Auto verkaufen & Geld erhalten",
      description: "Wenn Sie unser Angebot akzeptieren, vereinbaren wir einen Termin. Wir holen Ihr Auto ab und Sie erhalten sofort Ihr Geld - bar oder per Uberweisung.",
      details: [
        "Kostenlose Abholung vor Ort",
        "Sofortige Auszahlung",
        "Rechtssichere Abwicklung",
      ],
    },
  ];

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">So einfach funktioniert der Autoverkauf</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In nur 3 einfachen Schritten verkaufen Sie Ihr Auto - ohne Stress, ohne versteckte Gebuhren, 
            ohne lange Wartezeiten.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-slate-200" />
              )}
              
              <div className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold">{step.title}</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Haufige Fragen</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Welche Unterlagen benotige ich?</h3>
                  <p className="text-sm text-muted-foreground">
                    Fahrzeugbrief (Zulassungsbescheinigung Teil II), Fahrzeugschein (Teil I), 
                    alle Schlussel und ggf. das Serviceheft.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Wie schnell geht der Verkauf?</h3>
                  <p className="text-sm text-muted-foreground">
                    Vom ersten Kontakt bis zur Auszahlung vergehen in der Regel nur 2-3 Tage. 
                    Bei dringenden Fallen geht es oft noch schneller.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Kaufen Sie auch Fahrzeuge mit Mangeln?</h3>
                  <p className="text-sm text-muted-foreground">
                    Ja! Wir kaufen Fahrzeuge in jedem Zustand - auch mit hoher Laufleistung, 
                    Unfallschaden oder technischen Problemen.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-4">Bereit loszulegen?</h3>
              <p className="text-muted-foreground mb-6">
                Starten Sie jetzt und erhalten Sie innerhalb von 24 Stunden ein Angebot fur Ihr Fahrzeug.
              </p>
              <Link
                href="/#lead-form"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Jetzt Angebot erhalten
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
