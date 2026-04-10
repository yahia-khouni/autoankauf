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
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative Background - Hidden on Mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-72 h-72 bg-navy-900/5 rounded-full blur-3xl" />

      <div className="container max-w-4xl relative px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <AnimateOnScroll delay={0}>
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-navy-50 border border-navy-100 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-navy-600" />
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

        {/* FAQ Accordion + Contact CTA */}
        <AnimateOnScroll delay={100}>
          {/* Accordion - No wrapper box, sits directly in container */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item border-0 data-[state=open]:bg-gold-50/40 transition-all duration-300 px-2 sm:px-4"
              >
                <AccordionTrigger className="text-left py-5 sm:py-7 hover:no-underline [&[data-state=open]>span]:text-gold-600 [&>span]:transition-colors">
                  <span className="font-semibold text-sm sm:text-base text-navy-900 hover:text-gold-600 transition-colors pr-3 sm:pr-4">
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5 sm:pb-7 px-0 leading-relaxed text-sm sm:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA - Mobile Optimized */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
              {t("moreQuestions")}
            </p>
            <a
              href="tel:+4930123456789"
              className="inline-flex items-center gap-2 sm:gap-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-all active:scale-[0.98] shadow-lg hover:shadow-[0_4px_20px_rgba(16,42,67,0.3)]"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>030 123 456 789</span>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
