import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckCircle, Star, Shield, Clock, Banknote } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-gold-400 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gold-300 rounded-full animate-float animation-delay-200" />
      
      <div className="container relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-5 py-2 backdrop-blur-sm animate-fade-in-up">
              <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
              <span className="text-sm font-medium text-gold-300">Premium Autoankauf Service</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4 animate-fade-in-up animation-delay-100">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-shadow-lg">
                {t("title")}
              </h1>
              <p className="text-2xl sm:text-3xl font-light text-gold-gradient">
                {t("subtitle")}
              </p>
            </div>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-lg leading-relaxed animate-fade-in-up animation-delay-200">
              {t("description")}
            </p>
            
            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10 hover:border-gold-400/30">
                <div className="p-2 rounded-lg bg-gradient-gold">
                  <Shield className="h-5 w-5 text-navy-900" />
                </div>
                <span className="text-sm font-medium">{tCommon("freeValuation")}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10 hover:border-gold-400/30">
                <div className="p-2 rounded-lg bg-gradient-gold">
                  <Clock className="h-5 w-5 text-navy-900" />
                </div>
                <span className="text-sm font-medium">24h Angebot</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10 hover:border-gold-400/30">
                <div className="p-2 rounded-lg bg-gradient-gold">
                  <Banknote className="h-5 w-5 text-navy-900" />
                </div>
                <span className="text-sm font-medium">{tCommon("instantPayment")}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10 hover:border-gold-400/30">
                <div className="p-2 rounded-lg bg-gradient-gold">
                  <CheckCircle className="h-5 w-5 text-navy-900" />
                </div>
                <span className="text-sm font-medium">{tCommon("freePickup")}</span>
              </div>
            </div>
            
            {/* Trust Stats */}
            <div className="flex items-center gap-8 pt-6 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-gradient">5.000+</div>
                <div className="text-xs text-slate-400 mt-1">Fahrzeuge gekauft</div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold text-gold-gradient">4.9</span>
                  <Star className="h-5 w-5 text-gold-400 fill-gold-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Kundenbewertung</div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-gradient">24h</div>
                <div className="text-xs text-slate-400 mt-1">Schnelles Angebot</div>
              </div>
            </div>
          </div>
          
          {/* Form Card */}
          <div id="lead-form" className="lg:pl-8 animate-fade-in-up animation-delay-200">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-gold rounded-3xl blur-xl opacity-20 animate-pulse-glow" />
              
              {/* Form Container */}
              <div className="relative bg-white rounded-3xl shadow-premium-lg border border-slate-200/50 p-8 lg:p-10 overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-100 to-transparent rounded-bl-full opacity-50" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-gold shadow-gold">
                      <Banknote className="h-5 w-5 text-navy-900" />
                    </div>
                    <h2 className="text-xl font-bold text-navy-900">
                      Kostenloses Angebot
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500 mb-8 pl-12">
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
