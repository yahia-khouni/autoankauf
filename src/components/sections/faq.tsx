import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

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
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-900/5 rounded-full blur-3xl" />
      
      <div className="container max-w-4xl relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 border border-navy-100 px-4 py-2 mb-6">
            <HelpCircle className="h-4 w-4 text-navy-600" />
            <span className="text-sm font-medium text-navy-700">Häufige Fragen</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-navy-900">{t("title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Alles, was Sie über unseren Autoankauf-Service wissen müssen
          </p>
        </div>

        <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-6 lg:p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-slate-100 px-6 shadow-sm data-[state=open]:shadow-lg data-[state=open]:border-gold-200 transition-all duration-300"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline group">
                  <span className="font-semibold text-navy-900 group-hover:text-gold-600 transition-colors pr-4">
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">Haben Sie weitere Fragen?</p>
          <a 
            href="tel:+4930123456789" 
            className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors"
          >
            Rufen Sie uns an: 030 123 456 789
          </a>
        </div>
      </div>
    </section>
  );
}
