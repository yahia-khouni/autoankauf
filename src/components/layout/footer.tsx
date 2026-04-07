import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MessageCircle, Star, Shield, Award, ArrowRight } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold" />
      
      <div className="container relative py-10 sm:py-16 px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Brand Column - Full Width on Mobile */}
          <div className="col-span-2 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-lg sm:text-xl font-bold text-navy-900">A</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-white">Autoankauf</span>
                <span className="block text-gold-400 text-xs sm:text-sm font-medium">Deutschland</span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              Wir kaufen Ihr Auto schnell, fair und unkompliziert. 
              Deutschlandweiter Premium-Service mit sofortiger Abwicklung.
            </p>
            
            {/* Trust Badges - Compact on Mobile */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400 fill-gold-400" />
                <span className="text-[10px] sm:text-xs text-white">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                <span className="text-[10px] sm:text-xs text-white">TÜV</span>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-400" />
              {t("contact")}
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li>
                <a href="tel:+4912345678900" className="group flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-white transition-colors active:scale-[0.98]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-slate-500">Telefon</span>
                    <span className="font-medium text-xs sm:text-sm">+49 123 456 789</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://wa.me/4912345678900" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-white transition-colors active:scale-[0.98]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-400/20 transition-colors">
                    <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-slate-500">WhatsApp</span>
                    <span className="font-medium text-xs sm:text-sm">Jetzt chatten</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@autoankauf.de" className="group flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-white transition-colors active:scale-[0.98]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-slate-500">E-Mail</span>
                    <span className="font-medium text-xs sm:text-sm">info@autoankauf.de</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-400" />
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {[
                { href: "/standorte", label: tNav("locations") },
                { href: "/so-funktionierts", label: tNav("howItWorks") },
                { href: "/ueber-uns", label: tNav("about") },
                { href: "/kontakt", label: tNav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-400" />
              {t("legal")}
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/impressum" className="group flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-400" />
                  <span>{t("imprint")}</span>
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="group flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-400" />
                  <span>{t("privacy")}</span>
                </Link>
              </li>
              <li>
                <Link href="/agb" className="group flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-400" />
                  <span>{t("terms")}</span>
                </Link>
              </li>
            </ul>
            
            {/* CTA - Mobile Optimized */}
            <div className="mt-6 sm:mt-8">
              <Link
                href="/#lead-form"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm bg-gradient-gold text-navy-900 hover:shadow-gold-lg transition-all active:scale-[0.98]"
              >
                Jetzt Angebot erhalten
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
              {t("copyright", { year: currentYear })}
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-slate-600" />
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
