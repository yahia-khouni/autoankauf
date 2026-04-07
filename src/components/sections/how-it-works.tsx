import { useTranslations } from "next-intl";
import { ClipboardList, MessageSquare, CreditCard, ArrowRight, ChevronDown } from "lucide-react";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  const steps = [
    { icon: ClipboardList, title: t("step1Title"), description: t("step1Description") },
    { icon: MessageSquare, title: t("step2Title"), description: t("step2Description") },
    { icon: CreditCard, title: t("step3Title"), description: t("step3Description") },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Decorative Background - Hidden on Mobile */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="hidden sm:block absolute top-20 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 left-0 w-72 h-72 bg-navy-900/5 rounded-full blur-3xl" />
      
      <div className="container relative px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-navy-900/5 border border-navy-900/10 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium text-navy-700">Einfacher Prozess</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 text-navy-900">{t("title")}</h2>
          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            In nur 3 einfachen Schritten verkaufen Sie Ihr Auto schnell und unkompliziert
          </p>
        </div>

        {/* Steps Grid - Vertical on Mobile, Horizontal on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Arrow - Desktop: Horizontal, Mobile: Vertical */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-4 z-10">
                    <ArrowRight className="h-8 w-8 text-gold-400" />
                  </div>
                  {/* Mobile Arrow */}
                  <div className="md:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 z-10">
                    <ChevronDown className="h-5 w-5 text-gold-400" />
                  </div>
                </>
              )}
              
              {/* Card - Mobile: Horizontal Layout, Desktop: Vertical */}
              <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg border border-slate-100 hover:shadow-premium hover:border-gold-200 transition-all duration-500 h-full active:scale-[0.99] sm:active:scale-100">
                {/* Step Number Badge */}
                <div className="absolute -top-3 sm:-top-5 left-4 sm:left-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-gold rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-navy-900 shadow-gold text-sm sm:text-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Mobile: Horizontal Layout */}
                <div className="flex items-start gap-4 sm:block pt-2 sm:pt-0">
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl sm:rounded-2xl flex items-center justify-center sm:mb-6 sm:mt-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-navy-700" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-xl mb-1 sm:mb-3 text-navy-900">{step.title}</h3>
                    <p className="text-xs sm:text-base text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {/* Decorative Corner - Desktop Only */}
                <div className="hidden sm:block absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gold-100/50 to-transparent rounded-tl-3xl rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
