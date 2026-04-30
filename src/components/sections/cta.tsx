"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { COMPANY } from "@/lib/company";

export function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const leadFormHref = locale === "de" ? "/#lead-form" : `/${locale}/#lead-form`;

  return (
    <section className="py-8 sm:py-12 lg:py-24 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-premium" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      {/* Decorative Elements - Hidden on Mobile */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="hidden sm:block absolute top-10 right-10 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="hidden sm:block absolute bottom-10 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />

      <div className="container relative px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-3 sm:px-5 py-1.5 sm:py-2 mb-6 sm:mb-8">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
            <span className="text-xs sm:text-sm font-medium text-gold-300">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight px-2">
            {t("title")}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4">
            {t("description")}
          </p>

          {/* CTA Buttons - Stack on Mobile */}
          <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="w-80 h-24 bg-gold-400/20 blur-3xl rounded-full" />
            </div>

            {/* Primary CTA */}
            <MagneticButton>
              <Link
                href={leadFormHref}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl overflow-hidden transition-all duration-300 btn-cta-glow"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-gold" />
                <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-50" />

                {/* Button Content */}
                <span className="relative text-navy-900">{t("button")}</span>
                <ArrowRight className="relative h-4 w-4 sm:h-5 sm:w-5 text-navy-900 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>

            {/* Phone CTA - Prominent on Mobile */}
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white hover:text-navy-900 hover:border-white backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
              <span>{COMPANY.phoneDisplayIntl}</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("feature1")}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("feature2")}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("feature3")}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
    </section>
  );
}
