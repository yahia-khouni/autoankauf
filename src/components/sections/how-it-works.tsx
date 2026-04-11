"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ClipboardList, MessageSquare, CreditCard, ChevronDown, Banknote, ShieldCheck } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { cn } from "@/lib/utils";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const [openStep, setOpenStep] = useState<number | null>(null);

  const steps = [
    {
      icon: ClipboardList,
      title: t("step1Title"),
      description: t("step1Description"),
      details: "Füllen Sie unser einfaches Online-Formular mit den wichtigsten Fahrzeugdaten aus. Das dauert nur 2 Minuten und ist absolut kostenlos.",
    },
    {
      icon: MessageSquare,
      title: t("step2Title"),
      description: t("step2Description"),
      details: "Nach Prüfung Ihrer Angaben erhalten Sie von uns umgehend ein faires und unverbindliches Angebot für Ihr Fahrzeug.",
    },
    {
      icon: CreditCard,
      title: t("step3Title"),
      description: t("step3Description"),
      details: "Wir bieten flexible Zahlungsmöglichkeiten: Barzahlung bei Abholung oder eine schnelle und sichere Sofortüberweisung direkt auf Ihr Konto.",
      isPayment: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/80 to-slate-100 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      
      {/* Ambient Golden Lights */}
      <div className="absolute top-1/4 -right-20 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-gold-400/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[25rem] sm:w-[35rem] h-[25rem] sm:h-[35rem] bg-gold-400/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative px-4 sm:px-6 z-10">
        {/* Header */}
        <AnimateOnScroll delay={0}>
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white shadow-sm border border-navy-900/10 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-navy-700 tracking-wide uppercase">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-navy-900 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Steps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const isOpen = openStep === index;
            return (
              <AnimateOnScroll
                key={index}
                delay={index * 120}
                className="relative flex flex-col h-full"
              >
                {/* Connector */}
                {index < steps.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute top-24 -right-5 z-0 w-10 border-t-2 border-dashed border-gold-400/30" />
                  </>
                )}

                {/* Card */}
                <div 
                  onClick={() => setOpenStep(isOpen ? null : index)}
                  className={cn(
                    "relative flex-1 rounded-2xl p-6 sm:p-8 shadow-md border hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden group",
                    isOpen 
                      ? "bg-navy-900 border-navy-800 shadow-gold-lg/10 ring-1 ring-gold-400/20 scale-[1.02]" 
                      : "bg-white border-slate-200/60"
                  )}
                >
                  <div className="flex flex-col h-full z-10 relative">
                    {/* Top part */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn(
                        "w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-2xl flex items-center justify-center transition-colors duration-500",
                        isOpen ? "bg-navy-800 text-gold-400" : "bg-gradient-to-br from-gold-50/50 to-gold-100 text-gold-600 group-hover:bg-gold-50"
                      )}>
                        <step.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                      </div>
                      
                      <div className={cn(
                        "p-2 rounded-full transition-transform duration-500",
                        isOpen ? "rotate-180 bg-white/10 text-gold-400" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600"
                      )}>
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className={cn(
                      "font-bold text-xl sm:text-2xl mb-3 transition-colors duration-300",
                      isOpen ? "text-white" : "text-navy-900"
                    )}>
                      {step.title}
                    </h3>
                    <p className={cn(
                      "text-base leading-relaxed mb-4 transition-colors duration-300",
                      isOpen ? "text-slate-300" : "text-slate-600"
                    )}>
                      {step.description}
                    </p>

                    {/* Expandable Content */}
                    <div 
                      className={cn(
                        "grid transition-all duration-500 ease-in-out mt-auto",
                        isOpen ? "grid-rows-[1fr] opacity-100 pt-4 border-t border-white/10" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className={cn(
                          "text-sm leading-relaxed transition-colors duration-300",
                          isOpen ? "text-slate-400" : "text-slate-500"
                        )}>
                          {step.details}
                        </p>
                        {step.isPayment && (
                          <div className={cn(
                            "mt-4 flex flex-wrap items-center gap-3 sm:gap-4 p-3 rounded-lg border transition-colors duration-300",
                            isOpen ? "bg-navy-800/50 border-white/5" : "bg-slate-50 border-slate-100"
                          )}>
                            <div className={cn("flex items-center gap-2 font-medium text-sm", isOpen ? "text-slate-200" : "text-slate-700")}>
                              <Banknote className="h-4 w-4 text-emerald-400" /> Bargeld
                            </div>
                            <div className={cn("hidden sm:block w-px h-4", isOpen ? "bg-white/10" : "bg-slate-200")} />
                            <div className={cn("flex items-center gap-2 font-medium text-sm", isOpen ? "text-slate-200" : "text-slate-700")}>
                              <ShieldCheck className="h-4 w-4 text-blue-400" /> Banküberweisung
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Watermark step number - Moved to bottom right */}
                  <div className={cn(
                    "absolute bottom-0 right-2 text-8xl sm:text-9xl font-black leading-none select-none pointer-events-none transition-all duration-500",
                    isOpen ? "text-white/[0.03]" : "text-navy-900/[0.06] group-hover:text-navy-900/[0.08]"
                  )}>
                    {index + 1}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
