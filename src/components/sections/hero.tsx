import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/forms/lead-form";
import { Star, Shield, Banknote, ArrowDown } from "lucide-react";
import Link from "next/link";
import { AnimatedWord } from "@/components/ui/animated-word";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-36 lg:min-h-[90vh]">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />

      {/* Decorative Elements - Hidden on small mobile for performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />

      <div className="container relative z-10 pb-12 sm:pb-10 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-white text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-4 sm:px-5 py-2 backdrop-blur-sm animate-fade-in-up">
              <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
              <span className="text-xs sm:text-sm font-medium text-gold-300">
                Premium Autoankauf Service
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-3 animate-fade-in-up animation-delay-100">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-shadow-lg leading-tight">
                <span className="block text-white">{t("titleLine1")}</span>
                <span className="block mt-1 sm:mt-2">
                  <AnimatedWord
                    words={[
                      t("cyclingWord1"),
                      t("cyclingWord2"),
                      t("cyclingWord3"),
                    ]}
                  />
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-200">
              {t("description")}
            </p>

            {/* Trust Stats — bold 3-column bar */}
            <div className="grid grid-cols-3 gap-0 py-5 sm:py-6 border-y border-white/15 animate-fade-in-up animation-delay-300">
              <div className="flex flex-col items-center lg:items-start gap-0.5 sm:gap-1 px-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold-gradient leading-none">
                  5.000+
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-medium">
                  {t("statsVehicles")}
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-0.5 sm:gap-1 px-2 border-x border-white/15">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold-gradient leading-none">
                    4.9
                  </span>
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400 fill-gold-400 mb-0.5" />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-medium">
                  {t("statsRating")}
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-0.5 sm:gap-1 px-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold-gradient leading-none">
                  24h
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-medium">
                  {t("statsOffer")}
                </div>
              </div>
            </div>

            {/* Mobile CTA - Only visible on mobile, scroll to form */}
            <div className="lg:hidden pt-4 animate-fade-in-up animation-delay-500">
              <Link
                href="#lead-form"
                className="group flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-gold text-navy-900 font-bold text-base shadow-gold-lg active:scale-[0.98] transition-transform hover:shadow-[0_6px_24px_rgba(212,175,55,0.45)]"
              >
                <span>{t("cta")}</span>
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </Link>
            </div>
          </div>

          {/* Form Card */}
          <div
            id="lead-form"
            className="relative lg:pl-6 lg:max-w-[480px] lg:justify-self-end w-full animate-fade-in-up animation-delay-200 scroll-mt-20 mt-4 sm:mt-6 lg:mt-0"
          >
            {/* Ambient spotlight */}
            <div className="absolute -inset-8 sm:-inset-10 bg-gold-400/20 blur-3xl rounded-full pointer-events-none -z-10" />

            <div className="relative">
              {/* Glow Effect - Reduced on mobile */}
              <div className="absolute -inset-1 bg-gradient-gold rounded-2xl sm:rounded-3xl blur-2xl opacity-40 animate-pulse-glow" />

              {/* Form Container */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-premium-lg border border-slate-200/60 p-3 sm:p-4 lg:p-6 overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-gold-300/50 via-gold-200/20 to-transparent rounded-bl-full opacity-100 pointer-events-none" />

                <div className="relative">
                  <div className="mb-2">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900">
                      {t("formTitle")}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-slate-500 mb-3 sm:mb-4">
                    {t("formSubtitle")}
                  </p>
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
