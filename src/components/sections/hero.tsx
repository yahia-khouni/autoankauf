import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckCircle, Star, Shield, Clock, Banknote, ArrowDown } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section className="relative min-h-[100svh] lg:min-h-[90vh] overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      
      {/* Decorative Elements - Hidden on small mobile for performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute top-1/2 left-1/4 w-2 h-2 bg-gold-400 rounded-full animate-float" />
      <div className="hidden md:block absolute top-1/3 right-1/3 w-3 h-3 bg-gold-300 rounded-full animate-float animation-delay-200" />
      
      <div className="container relative z-10 py-8 sm:py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-white text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-4 sm:px-5 py-2 backdrop-blur-sm animate-fade-in-up">
              <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
              <span className="text-xs sm:text-sm font-medium text-gold-300">Premium Autoankauf Service</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-up animation-delay-100">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-shadow-lg">
                {t("title")}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-gold-gradient">
                {t("subtitle")}
              </p>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-200">
              {t("description")}
            </p>
            
            {/* Benefits Grid - Optimized for Mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all active:scale-[0.98]">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-gold flex-shrink-0">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-navy-900" />
                </div>
                <span className="text-xs sm:text-sm font-medium leading-tight">{tCommon("freeValuation")}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all active:scale-[0.98]">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-gold flex-shrink-0">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-navy-900" />
                </div>
                <span className="text-xs sm:text-sm font-medium leading-tight">24h Angebot</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all active:scale-[0.98]">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-gold flex-shrink-0">
                  <Banknote className="h-4 w-4 sm:h-5 sm:w-5 text-navy-900" />
                </div>
                <span className="text-xs sm:text-sm font-medium leading-tight">{tCommon("instantPayment")}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all active:scale-[0.98]">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-gold flex-shrink-0">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-navy-900" />
                </div>
                <span className="text-xs sm:text-sm font-medium leading-tight">{tCommon("freePickup")}</span>
              </div>
            </div>
            
            {/* Trust Stats - Compact on Mobile */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4 sm:pt-6 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gold-gradient">5.000+</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Fahrzeuge</div>
              </div>
              <div className="h-10 sm:h-12 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-gold-gradient">4.9</span>
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400 fill-gold-400" />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Bewertung</div>
              </div>
              <div className="h-10 sm:h-12 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gold-gradient">24h</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Angebot</div>
              </div>
            </div>
            
            {/* Mobile CTA - Only visible on mobile, scroll to form */}
            <div className="lg:hidden pt-4 animate-fade-in-up animation-delay-500">
              <Link
                href="#lead-form"
                className="group flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-gold text-navy-900 font-bold text-base shadow-gold-lg active:scale-[0.98] transition-transform"
              >
                <span>{t("cta")}</span>
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </Link>
            </div>
          </div>
          
          {/* Form Card */}
          <div id="lead-form" className="lg:pl-8 animate-fade-in-up animation-delay-200 scroll-mt-20">
            <div className="relative">
              {/* Glow Effect - Reduced on mobile */}
              <div className="absolute -inset-1 bg-gradient-gold rounded-2xl sm:rounded-3xl blur-xl opacity-20 animate-pulse-glow" />
              
              {/* Form Container */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-premium-lg border border-slate-200/50 p-5 sm:p-8 lg:p-10 overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-gold-100 to-transparent rounded-bl-full opacity-50" />
                
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-gold shadow-gold">
                      <Banknote className="h-4 w-4 sm:h-5 sm:w-5 text-navy-900" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-navy-900">
                      Kostenloses Angebot
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 pl-9 sm:pl-12">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
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
