"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, Star, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getLocalizedHref = (path: string) => {
    if (locale === "de") {
      return path;
    }

    if (path === "/") {
      return `/${locale}`;
    }

    return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const leadFormHref = `${getLocalizedHref("/")}#lead-form`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Ensure menu is closed after navigation and when switching to desktop breakpoints.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/standorte", label: t("locations") },
    { href: "/so-funktionierts", label: t("howItWorks") },
    { href: "/ueber-uns", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/kontakt", label: t("contact") },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out",
      isScrolled
        ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50 py-1"
        : "bg-navy-950/20 backdrop-blur-sm border-b border-white/10"
    )}>
      {/* Top Bar - Desktop Only */}
      <div className={cn(
        "hidden md:block transition-all duration-500 ease-in-out overflow-hidden origin-top",
        isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
      )}>
        <div className="bg-black border-b border-white/10 text-white/90 py-1.5">
          <div className="container flex justify-between items-center text-xs font-medium tracking-wide">
            <div className="flex items-center gap-6">
              <a href="tel:+4912345678900" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone className="h-3.5 w-3.5 text-gold-400" />
                +49 123 456 789 00
              </a>
              <div className="w-px h-3 bg-white/20" />
              <a
                href="https://wa.me/4912345678900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-400 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 text-gold-400" />
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" />
                <span>Über 5.000 Autos angekauft</span>
              </div>
              <div className="w-px h-3 bg-white/20" />
              <LanguageSwitcher variant="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={cn(
        "container flex items-center justify-between transition-all duration-500 ease-in-out",
        isScrolled ? "h-[60px]" : "h-[64px] md:h-[70px]"
      )}>
        {/* ── LOGO ── */}
        <Link
          href={getLocalizedHref("/")}
          className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
          aria-label="Autoankauf Deutschland"
        >
          {/* Icon badge */}
          <div className={cn(
            "relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-105",
            isScrolled
              ? "bg-navy-900 shadow-[0_2px_10px_rgba(10,25,41,0.25)]"
              : "bg-navy-900/70 backdrop-blur-md border border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
          )}>
            {/* Car SVG icon in gold */}
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 11l2.5-5h9L19 11" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="11" width="18" height="6" rx="1.5" fill="#FBBF24" fillOpacity="0.12" stroke="#FBBF24" strokeWidth="1.5"/>
              <circle cx="7.5" cy="17.5" r="1.5" fill="#FBBF24"/>
              <circle cx="16.5" cy="17.5" r="1.5" fill="#FBBF24"/>
              <path d="M3 14h18" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.4"/>
            </svg>
            {/* Gold corner accent dot */}
            <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-gold-400" />
          </div>

          {/* Wordmark */}
          <div className="flex flex-col leading-none gap-0.5">
            <div className="flex items-baseline">
              <span className={cn(
                "text-lg sm:text-xl font-black tracking-tight transition-colors duration-300",
                isScrolled ? "text-navy-900" : "text-white"
              )}>Auto</span>
              <span className="text-lg sm:text-xl font-black tracking-tight text-gold-400">ankauf</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-[0.22em] transition-colors duration-300",
                isScrolled ? "text-slate-400" : "text-white/45"
              )}>Deutschland</span>
              <span className="inline-flex items-center rounded-sm bg-gold-400/20 border border-gold-400/30 px-1 text-[8px] font-black text-gold-400 leading-[14px] tracking-wider">DE</span>
            </div>
          </div>
        </Link>


        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={getLocalizedHref(item.href)}
              className={cn(
                "px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300",
                isScrolled
                  ? "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
                  : "text-white/90 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4">
          {isScrolled && <div className="scale-95 origin-right opacity-90 transition-opacity"><LanguageSwitcher variant="light" /></div>}
          <Link
            href={leadFormHref}
            className={cn(
              "group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-gold-lg",
              isScrolled
                ? "bg-gradient-gold text-navy-900"
                : "bg-white text-navy-900 border border-white/20 hover:bg-gradient-gold hover:border-gold-400 shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
            )}
          >
            {tHero("cta")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="xl:hidden flex items-center gap-2">
          <LanguageSwitcher variant={isScrolled ? "light" : "dark"} compact />
          <button
            className={cn(
              "relative p-2 rounded-full transition-all duration-300 active:scale-95",
              isScrolled
                ? "hover:bg-slate-100 active:bg-slate-200"
                : "bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/20"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Menu
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[600ms] ease-in-out w-[18px] h-[18px]",
                  isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100",
                  isScrolled && !isOpen ? "text-navy-900" : "text-white"
                )}
              />
              <X
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[600ms] ease-in-out w-[18px] h-[18px]",
                  isOpen ? "opacity-100 rotate-0 scale-100 text-white" : "opacity-0 -rotate-90 scale-50",
                  isScrolled && !isOpen ? "text-navy-900" : "text-white"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={cn(
        "xl:hidden fixed inset-0 z-50",
        isOpen ? "visible" : "invisible pointer-events-none"
      )}>
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity duration-500",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div className={cn(
          "absolute right-0 top-0 flex h-[100dvh] w-[82vw] max-w-[380px] flex-col overflow-hidden z-50",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.08,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Base background */}
          <div className="absolute inset-0 bg-[#0d1f31] z-[-2]" />
          <div className="absolute inset-0 bg-hero-pattern opacity-30 z-[-1]" />
          {/* Subtle gold orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/8 rounded-full blur-3xl pointer-events-none z-[-1]" />

          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 shrink-0">
            {/* Logo in mobile panel */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 11l2.5-5h9L19 11" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="11" width="18" height="6" rx="1.5" fill="#FBBF24" fillOpacity="0.12" stroke="#FBBF24" strokeWidth="1.5"/>
                  <circle cx="7.5" cy="17.5" r="1.5" fill="#FBBF24"/>
                  <circle cx="16.5" cy="17.5" r="1.5" fill="#FBBF24"/>
                  <path d="M3 14h18" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.4"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <div className="flex items-baseline">
                  <span className="text-lg font-black tracking-tight text-white">Auto</span>
                  <span className="text-lg font-black tracking-tight text-gold-400">ankauf</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Deutschland</span>
                  <span className="inline-flex items-center rounded-sm bg-gold-400/20 border border-gold-400/30 px-1 text-[8px] font-black text-gold-400 leading-[14px] tracking-wider">DE</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0">

            {/* Nav label */}
            <p className="px-6 pt-6 pb-2 text-[10px] font-black text-white/25 uppercase tracking-[0.18em]">Navigation</p>

            {/* Nav links */}
            <nav className="px-3 space-y-0.5">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  className="group flex items-center justify-between py-3.5 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/6 transition-all duration-200 active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: `${isOpen ? 80 + index * 45 : 0}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateX(0)" : "translateX(12px)",
                    transition: "opacity 450ms cubic-bezier(0.32,0,0.08,1), transform 450ms cubic-bezier(0.32,0,0.08,1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-white/6 flex items-center justify-center text-[9px] font-black text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-semibold tracking-wide">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-200" />
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="mx-6 my-5 h-px bg-white/6" />

            {/* Contact section */}
            <p className="px-6 pb-2 text-[10px] font-black text-white/25 uppercase tracking-[0.18em]">Kontakt</p>

            <div className="px-3 space-y-0.5"
              style={{
                transitionDelay: `${isOpen ? 80 + navItems.length * 45 + 60 : 0}ms`,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(12px)",
                transition: "opacity 450ms cubic-bezier(0.32,0,0.08,1), transform 450ms cubic-bezier(0.32,0,0.08,1)",
              }}
            >
              <a
                href="tel:+49123456789"
                className="group flex items-center gap-3.5 py-3.5 px-4 rounded-xl hover:bg-white/6 text-white/75 hover:text-white transition-all active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-gold-400 flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Telefon</p>
                  <p className="text-sm font-semibold text-white/85">+49 (0) 123 456 789</p>
                </div>
              </a>

              <a
                href="https://wa.me/49123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 py-3.5 px-4 rounded-xl hover:bg-white/6 text-white/75 hover:text-white transition-all active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] flex-shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">WhatsApp</p>
                  <p className="text-sm font-semibold text-white/85">Support verfügbar</p>
                </div>
              </a>
            </div>
          </div>

          {/* CTA footer */}
          <div
            className="p-4 border-t border-white/8 shrink-0"
            style={{
              transitionDelay: `${isOpen ? 80 + navItems.length * 45 + 160 : 0}ms`,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 450ms cubic-bezier(0.32,0,0.08,1), transform 450ms cubic-bezier(0.32,0,0.08,1)",
            }}
          >
            <Link
              href={leadFormHref}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-bold text-navy-900 bg-gradient-gold hover:shadow-gold transition-all duration-300 active:scale-[0.98]"
            >
              {tHero("cta")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
