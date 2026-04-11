import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Phone } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function FAQSection() {
  const t = useTranslations("faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-navy-900/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative px-4 sm:px-6 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <AnimateOnScroll delay={0} className="flex flex-col h-full justify-between">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-navy-100 px-4 py-2 mb-6">
                  <HelpCircle className="h-4 w-4 text-gold-500" />
                  <span className="text-sm font-bold text-navy-800 tracking-wide uppercase">
                    {t("badge")}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-navy-900 leading-tight">
                  {t("title")}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {t("subtitle")}
                </p>
              </div>
              
              {/* Contact Card pushed to bottom */}
              <div className="bg-white rounded-2xl p-6 shadow-premium border border-slate-100 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-gold-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Noch Fragen offen?</h3>
                <p className="text-slate-600 text-sm mb-6">Rufen Sie uns an oder schreiben Sie uns. Wir sind an 7 Tagen die Woche für Sie da.</p>
                <a
                  href="tel:+4930123456789"
                  className="group flex items-center justify-between bg-navy-900 hover:bg-navy-800 text-white rounded-xl px-5 py-4 font-semibold text-base transition-all active:scale-[0.98] shadow-lg hover:shadow-navy-900/30"
                >
                  <span className="group-hover:translate-x-1 transition-transform">030 123 456 789</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                </a>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-8 h-full">
            <AnimateOnScroll delay={100} className="h-full">
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden p-2 sm:p-4 h-full flex flex-col">
                <Accordion type="single" collapsible className="w-full h-full flex-1">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b border-slate-100 last:border-0 data-[state=open]:bg-slate-50/50 rounded-xl transition-all duration-300 px-4 sm:px-6"
                    >
                      <AccordionTrigger className="text-left py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180 group">
                        <span className="font-bold text-base sm:text-lg text-navy-900 group-hover:text-gold-600 transition-colors pr-4 leading-snug">
                          {faq.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 pb-8 px-0 leading-relaxed text-sm sm:text-base">
                        <div className="pt-2">
                          {faq.a}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimateOnScroll>
          </div>
          
        </div>
      </div>
    </section>
  );
}
