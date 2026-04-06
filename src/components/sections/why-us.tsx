import { useTranslations } from "next-intl";
import { Euro, Zap, MapPin, Car } from "lucide-react";

export function WhyUsSection() {
  const t = useTranslations("whyUs");

  const reasons = [
    { icon: Euro, title: t("reason1Title"), description: t("reason1Description") },
    { icon: Zap, title: t("reason2Title"), description: t("reason2Description") },
    { icon: MapPin, title: t("reason3Title"), description: t("reason3Description") },
    { icon: Car, title: t("reason4Title"), description: t("reason4Description") },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Im Gegensatz zu grossen Plattformen bieten wir personlichen Service und faire Preise
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <reason.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
