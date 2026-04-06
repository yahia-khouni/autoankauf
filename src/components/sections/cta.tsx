import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles, Phone } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-premium" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-5 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-gold-400" />
            <span className="text-sm font-medium text-gold-300">Kostenlos & Unverbindlich</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {t("title")}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("description")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#lead-form"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              {/* Button Background */}
              <div className="absolute inset-0 bg-gradient-gold" />
              <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-50" />
              
              {/* Button Content */}
              <span className="relative text-navy-900">{t("button")}</span>
              <ArrowRight className="relative h-5 w-5 text-navy-900 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-3 text-white/80">
              <span className="text-sm">oder rufen Sie uns an:</span>
              <a 
                href="tel:+4930123456789" 
                className="inline-flex items-center gap-2 font-semibold text-white hover:text-gold-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                030 123 456 789
              </a>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Keine versteckten Kosten
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Faire Bewertung
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sofortige Zahlung
            </span>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
    </section>
  );
}
