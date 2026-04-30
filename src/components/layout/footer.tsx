"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Phone,
  Mail,
  MessageCircle,
  Star,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";
import { COMPANY } from "@/lib/company";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const getLocalizedHref = (path: string) => {
    if (locale === "de") return path;
    if (path === "/") return `/${locale}`;
    return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-[#050d18]" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

      <div className="container relative py-10 sm:py-16 px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Brand Column - Full Width on Mobile */}
          <div className="col-span-2 lg:col-span-1 mb-4 lg:mb-0">
            <Link
              href={getLocalizedHref("/")}
              className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6"
            >
              <div className="relative h-[54px] sm:h-16 w-[124px] sm:w-[138px] overflow-hidden rounded-none bg-white/95 border border-white/20 shadow-[0_6px_18px_rgba(2,6,23,0.3)]">
                <Image
                  src="/images/logo.png"
                  alt={COMPANY.legalName}
                  fill
                  sizes="(max-width: 640px) 124px, 138px"
                  className="object-cover object-center scale-[1.26]"
                />
              </div>
              <div className="leading-none">
                <span className="text-[18px] sm:text-[20px] font-black tracking-tight text-white">
                  Auto<span className="text-gold-400">ankauf</span>
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              {t("brandDescription")}
            </p>

            {/* Trust Badges - Compact on Mobile */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400 fill-gold-400" />
                <span className="text-[10px] sm:text-xs text-white">
                  4.9 Rating
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                <span className="text-[10px] sm:text-xs text-white">TÜV</span>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="footer-heading">{t("contact")}</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="group flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-white transition-colors active:scale-[0.98]"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-slate-500">
                      {t("phone")}
                    </span>
                    <span className="font-medium text-xs sm:text-sm">
                      {COMPANY.phoneDisplayIntl}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-white transition-colors active:scale-[0.98]"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                    <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-slate-500">
                      WhatsApp
                    </span>
                    <span className="font-medium text-xs sm:text-sm">
                      {t("chat")}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="group flex items-center gap-2 sm:gap-3 text-slate-400 hover:text-white transition-colors active:scale-[0.98]"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-xs text-slate-500">
                      E-Mail
                    </span>
                    <span className="font-medium text-xs sm:text-sm">
                      {COMPANY.email}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-heading">{t("quickLinks")}</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {[
                { href: getLocalizedHref("/standorte"), label: tNav("locations") },
                { href: getLocalizedHref("/so-funktionierts"), label: tNav("howItWorks") },
                { href: getLocalizedHref("/ueber-uns"), label: tNav("about") },
                { href: getLocalizedHref("/blog"), label: tNav("blog") },
                { href: getLocalizedHref("/kontakt"), label: tNav("contact") },
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
            <h4 className="footer-heading">{t("legal")}</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <Link
                  href={getLocalizedHref("/impressum")}
                  className="group flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-400" />
                  <span>{t("imprint")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/datenschutz")}
                  className="group flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-400" />
                  <span>{t("privacy")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/agb")}
                  className="group flex items-center gap-1.5 sm:gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gold-400" />
                  <span>{t("terms")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
              {t("copyright", { year: currentYear })}
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 hover:text-gold-400 transition-colors cursor-default" />
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 hover:text-gold-400 transition-colors cursor-default" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
