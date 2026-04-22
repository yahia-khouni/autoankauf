"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { HelpCircle, ChevronDown } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { FaqContactCard } from "@/components/sections/faq-contact-card";

export function FAQSection({
  title,
  subtitle,
  faqs: propFaqs,
}: {
  title?: string;
  subtitle?: string;
  faqs?: { q: string; a: string; }[];
} = {}) {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultFaqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  const faqs = propFaqs || defaultFaqs;
  const displayTitle = title || t("title");
  const displaySubtitle = subtitle || t("subtitle");

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const phoneDisplay = t("contactPhone");
  const phoneHref = `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`;

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 relative">
      {/* ── Decorative blobs in their OWN overflow-hidden wrapper          */}
      {/* ── NEVER put overflow-hidden on the section — it breaks sticky    */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-navy-900/5 rounded-full blur-[80px]" />
      </div>

      <div className="container relative px-4 sm:px-6 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── LEFT COLUMN — sticky: stays fixed while right accordion grows ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <AnimateOnScroll delay={0}>

              {/* Heading */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-navy-100 px-4 py-2 mb-6">
                  <HelpCircle className="h-4 w-4 text-gold-500" />
                  <span className="text-sm font-bold text-navy-800 tracking-wide uppercase">
                    {t("badge")}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 text-navy-900 leading-tight">
                  {displayTitle}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {displaySubtitle}
                </p>
              </div>

              {/* Contact Card */}
              <FaqContactCard
                title={t("contactTitle")}
                description={t("contactDesc")}
                ctaLabel={t("contactCall")}
                phoneDisplay={phoneDisplay}
                phoneHref={phoneHref}
              />

            </AnimateOnScroll>
          </div>

          {/* ── RIGHT COLUMN — FAQ accordion ── */}
          <div className="lg:col-span-8">
            <AnimateOnScroll delay={100}>

              <div className="rounded-3xl shadow-lg border border-slate-100 overflow-hidden bg-white">

                {/* Gold top bar + card header */}
                <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500" />
                <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 bg-slate-50/60">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
                    {faqs.length} Fragen &amp; Antworten
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {openIndex !== null ? `${openIndex + 1} / ${faqs.length}` : "Klicken zum öffnen"}
                  </span>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100">
                  {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div
                        key={i}
                        className={`transition-colors duration-300 ${isOpen ? "bg-gold-50/30" : "bg-white hover:bg-slate-50/50"}`}
                      >
                        <button
                          onClick={() => toggle(i)}
                          className="w-full flex items-center gap-4 px-5 sm:px-7 py-5 text-left group focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          {/* Number badge */}
                          <span
                            className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
                              isOpen
                                ? "bg-gold-400 text-navy-900 shadow-[0_2px_8px_rgba(251,191,36,0.4)]"
                                : "bg-slate-100 text-slate-400 group-hover:bg-gold-100 group-hover:text-gold-700"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {/* Question */}
                          <span
                            className={`flex-1 font-semibold text-base sm:text-[17px] leading-snug transition-colors duration-200 ${
                              isOpen ? "text-navy-900" : "text-navy-800 group-hover:text-navy-900"
                            }`}
                          >
                            {faq.q}
                          </span>

                          {/* Chevron pill */}
                          <span
                            className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                              isOpen
                                ? "bg-gold-400 border-gold-400 rotate-180 shadow-[0_2px_8px_rgba(251,191,36,0.35)]"
                                : "border-slate-200 bg-white group-hover:border-gold-300 group-hover:bg-gold-50"
                            }`}
                          >
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-colors ${isOpen ? "text-navy-900" : "text-slate-400 group-hover:text-gold-600"}`}
                            />
                          </span>
                        </button>

                        {/* Answer — CSS grid expand trick */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                            transition: "grid-template-rows 0.38s cubic-bezier(0.16,1,0.3,1)",
                          }}
                        >
                          <div className="overflow-hidden">
                            <div className="pl-16 pr-5 sm:pr-7 pb-6 pt-1">
                              <div className="flex gap-3">
                                <div className="flex-shrink-0 w-0.5 rounded-full bg-gradient-to-b from-gold-400 to-gold-200 self-stretch" />
                                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
