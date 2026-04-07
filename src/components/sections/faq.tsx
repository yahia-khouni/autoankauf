import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Phone } from "lucide-react";

export function FAQSection() {
  const t = useTranslations("faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative Background - Hidden on Mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-72 h-72 bg-navy-900/5 rounded-full blur-3xl" />
      
      <div className="container max-w-4xl relative px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-navy-50 border border-navy-100 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-navy-600" />
            <span className="text-xs sm:text-sm font-medium text-navy-700">Häufige Fragen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 text-navy-900">{t("title")}</h2>
          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            Alles, was Sie über unseren Autoankauf-Service wissen müssen
          </p>
        </div>

        {/* FAQ Accordion - Mobile Optimized */}
        <div className="bg-slate-50/50 rounded-2xl sm:rounded-3xl border border-slate-100 p-3 sm:p-6 lg:p-8">
          <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 px-4 sm:px-6 shadow-sm data-[state=open]:shadow-lg data-[state=open]:border-gold-200 transition-all duration-300"
              >
                <AccordionTrigger className="text-left py-4 sm:py-6 hover:no-underline group">
                  <span className="font-semibold text-sm sm:text-base text-navy-900 group-hover:text-gold-600 transition-colors pr-3 sm:pr-4">
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4 sm:pb-6 leading-relaxed text-sm sm:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Contact CTA - Mobile Optimized */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">Haben Sie weitere Fragen?</p>
          <a 
            href="tel:+4930123456789" 
            className="inline-flex items-center gap-2 sm:gap-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-all active:scale-[0.98] shadow-lg"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>030 123 456 789</span>
          </a>
        </div>
      </div>
    </section>
  );
}
