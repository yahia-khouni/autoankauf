import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckCircle } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  const benefits = [
    "Faire Preise garantiert",
    "Angebot in 24 Stunden",
    "Kostenlose Abholung",
    "Sofortige Zahlung",
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-16 lg:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Deutschlandweit - Schnell - Fair
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("title")}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              {t("description")}
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5.000+</div>
                <div className="text-xs text-muted-foreground">Autos angekauft</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9/5</div>
                <div className="text-xs text-muted-foreground">Kundenbewertung</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div className="text-xs text-muted-foreground">Angebot</div>
              </div>
            </div>
          </div>
          
          <div id="lead-form" className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-xl border p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-2">
                Kostenloses Angebot erhalten
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fullen Sie das Formular aus - wir melden uns innerhalb von 24 Stunden.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
