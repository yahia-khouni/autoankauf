import { useTranslations } from "next-intl";
import { ClipboardList, MessageSquare, CreditCard } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: ClipboardList,
      title: t("step1Title"),
      description: t("step1Description"),
    },
    {
      icon: MessageSquare,
      title: t("step2Title"),
      description: t("step2Description"),
    },
    {
      icon: CreditCard,
      title: t("step3Title"),
      description: t("step3Description"),
    },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Decorative Background - Hidden on Mobile */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="hidden sm:block absolute top-20 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 left-0 w-72 h-72 bg-navy-900/5 rounded-full blur-3xl" />

      <div className="container relative px-4 sm:px-6">
        {/* Header */}
        <AnimateOnScroll delay={0}>
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-navy-900/5 border border-navy-900/10 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-medium text-navy-700">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 text-navy-900">
              {t("title")}
            </h2>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
              {t("subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Steps Grid - Vertical on Mobile, Horizontal on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <AnimateOnScroll
              key={index}
              delay={index * 120}
              className="relative group"
            >
              {/* Connector — first child, matches original DOM position */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop: dashed connector */}
                  <div className="hidden md:block absolute top-16 sm:top-20 -right-4 z-10 w-8 border-t-2 border-dashed border-gold-400/40" />
                  {/* Mobile: subtle vertical connector */}
                  <div className="md:hidden flex justify-center py-1">
                    <div className="w-px h-6 bg-gradient-to-b from-gold-400/50 to-transparent" />
                  </div>
                </>
              )}

              {/* Card */}
              <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg border border-slate-100 hover:-translate-y-1.5 hover:shadow-[0px_16px_40px_rgba(0,0,0,0.08)] hover:border-gold-200 transition-all duration-500 h-full active:scale-[0.99] sm:active:scale-100 overflow-hidden">
                {/* Mobile: Horizontal Layout, Desktop: Vertical */}
                <div className="flex items-start gap-4 sm:block pt-2 sm:pt-0">
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-gradient-to-br from-gold-400/10 to-gold-500/20 group-hover:from-navy-800 group-hover:to-navy-900 rounded-xl sm:rounded-2xl flex items-center justify-center sm:mb-6 sm:mt-4 group-hover:scale-110 transition-all duration-300">
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-gold-600 group-hover:text-gold-300" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-xl mb-1 sm:mb-3 text-navy-900">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Corner - Desktop Only */}
                <div className="hidden sm:block absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gold-100/50 to-transparent rounded-tl-3xl rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Watermark step number */}
                <div className="absolute bottom-2 right-3 text-8xl sm:text-9xl font-black text-navy-900/[0.04] leading-none select-none pointer-events-none">
                  {index + 1}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
