import { useTranslations } from "next-intl";
import { Euro, Zap, MapPin, Car, Shield, Award } from "lucide-react";

export function WhyUsSection() {
  const t = useTranslations("whyUs");

  const reasons = [
    { icon: Euro, title: t("reason1Title"), description: t("reason1Description"), gradient: "from-green-400 to-emerald-600" },
    { icon: Zap, title: t("reason2Title"), description: t("reason2Description"), gradient: "from-amber-400 to-orange-500" },
    { icon: MapPin, title: t("reason3Title"), description: t("reason3Description"), gradient: "from-blue-400 to-indigo-600" },
    { icon: Car, title: t("reason4Title"), description: t("reason4Description"), gradient: "from-purple-400 to-pink-600" },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-premium" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Decorative Elements - Hidden on Mobile */}
      <div className="hidden sm:block absolute top-10 left-10 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-10 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      
      <div className="container relative px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
            <span className="text-xs sm:text-sm font-medium text-gold-300">Premium Service</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">{t("title")}</h2>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto px-2">
            Im Gegensatz zu großen Plattformen bieten wir persönlichen Service und faire Preise
          </p>
        </div>

        {/* Cards Grid - 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card Glow Effect - Desktop Only */}
              <div className="hidden sm:block absolute -inset-0.5 bg-gradient-to-r from-gold-400/0 via-gold-400/0 to-gold-400/0 rounded-2xl blur group-hover:from-gold-400/20 group-hover:via-gold-400/30 group-hover:to-gold-400/20 transition-all duration-500" />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 h-full hover:bg-white/10 hover:border-gold-400/30 transition-all duration-500 active:scale-[0.98] sm:active:scale-100">
                {/* Icon with Gradient Background */}
                <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                
                <h3 className="font-bold text-sm sm:text-xl mb-1.5 sm:mb-3 text-white text-center line-clamp-2">{reason.title}</h3>
                <p className="text-[10px] sm:text-sm text-slate-300 text-center leading-relaxed line-clamp-3 sm:line-clamp-none">{reason.description}</p>
                
                {/* Bottom Accent Line - Desktop Only */}
                <div className="hidden sm:block absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-gold rounded-full group-hover:w-1/2 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Badges - Horizontal Scroll on Mobile */}
        <div className="mt-8 sm:mt-16 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="flex sm:flex-wrap sm:justify-center items-center gap-3 sm:gap-8 min-w-max sm:min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
              <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">TÜV Zertifiziert</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
              <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">10+ Jahre Erfahrung</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3">
              <Car className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
              <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">5.000+ Kunden</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
