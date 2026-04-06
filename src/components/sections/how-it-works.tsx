import { useTranslations } from "next-intl";
import { ClipboardList, MessageSquare, CreditCard, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  const steps = [
    { icon: ClipboardList, title: t("step1Title"), description: t("step1Description") },
    { icon: MessageSquare, title: t("step2Title"), description: t("step2Description") },
    { icon: CreditCard, title: t("step3Title"), description: t("step3Description") },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-navy-900/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-900/5 border border-navy-900/10 px-4 py-2 mb-6">
            <span className="text-sm font-medium text-navy-700">Einfacher Prozess</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-navy-900">{t("title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            In nur 3 einfachen Schritten verkaufen Sie Ihr Auto schnell und unkompliziert
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line (between cards) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-4 z-10">
                  <ArrowRight className="h-8 w-8 text-gold-400" />
                </div>
              )}
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-premium hover:border-gold-200 transition-all duration-500 card-hover h-full">
                {/* Step Number Badge */}
                <div className="absolute -top-5 left-8">
                  <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center font-bold text-navy-900 shadow-gold text-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-navy-100 rounded-2xl flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-navy-700" />
                </div>
                
                <h3 className="font-bold text-xl mb-3 text-navy-900">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
                
                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gold-100/50 to-transparent rounded-tl-3xl rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
