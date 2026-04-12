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
        <Link href={getLocalizedHref("/")} className="flex items-center gap-2 sm:gap-3 group">
          <div className={cn(
            "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-gold group-hover:scale-105 transition-all duration-300",
            isScrolled ? "bg-gradient-gold text-navy-900" : "bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-navy-900"
          )}>
            <span className="text-base sm:text-lg font-bold">A</span>
          </div>
          <div className={cn(
            "transition-colors flex flex-col -gap-1",
            isScrolled ? "text-navy-900" : "text-white"
          )}>
            <span className="text-xl sm:text-2xl font-black tracking-tight leading-none">Autoankauf</span>
            <span className={cn(
              "text-[10px] sm:text-xs font-semibold tracking-wider uppercase",
              isScrolled ? "text-gold-600" : "text-gold-400"
            )}>Deutschland</span>
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

      {/* Mobile Menu - Premium Full Screen Overlay */}
      <div className={cn(
        "xl:hidden fixed inset-0 z-50 transition-all duration-[800ms]",
        isOpen ? "visible" : "invisible pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-navy-950/80 backdrop-blur-[4px] transition-opacity duration-[800ms]",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={cn(
          "absolute right-0 top-0 flex h-[100dvh] w-[80vw] max-w-[400px] flex-col shadow-2xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Background exactly matching hero section */}
          <div className="absolute inset-0 bg-navy-900 z-[-2]" />
          <div className="absolute inset-0 gradient-hero z-[-1]" />
          <div className="absolute inset-0 bg-hero-pattern opacity-50 z-[-1]" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 pt-safe border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-lg font-bold text-navy-900">A</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">Autoankauf</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 rounded-full hover:bg-white/5 active:scale-95 transition-all text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto flex flex-col pt-4 pb-24 space-y-6 shrink-0 min-h-0">
            {/* Navigation Links */}
            <nav className="px-4 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  className="group flex items-center justify-between py-4 px-4 rounded-2xl hover:bg-white/5 text-white/90 hover:text-white transition-all duration-300 active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    transitionDelay: `${isOpen ? 400 + index * 250 : 0}ms`,
                    transform: isOpen ? "translateY(0)" : "translateY(24px)",
                    opacity: isOpen ? 1 : 0,
                    transition: "all 1000ms cubic-bezier(0.16,1,0.3,1)"
                  }}
                >
                  <span className="text-xl font-medium tracking-wide block">{item.label}</span>
                  <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-gold-500 group-hover:translate-x-2 transition-all duration-[400ms]" />
                </Link>
              ))}
            </nav>

            <div className="h-px bg-white/10 mx-8 flex-none shrink-0" />

            {/* Contact Info Block */}
            <div className="px-6 space-y-2">
              <a 
                href="tel:+49123456789" 
                className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-white/5 text-white/80 hover:text-white transition-all active:scale-[0.98]"
                style={{
                  transitionDelay: `${isOpen ? 400 + navItems.length * 250 + 150 : 0}ms`,
                  transform: isOpen ? "translateY(0)" : "translateY(24px)",
                  opacity: isOpen ? 1 : 0,
                  transition: "all 1000ms cubic-bezier(0.16,1,0.3,1)"
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-gold-400">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-lg font-medium">+49 (0) 123 456 789</span>
              </a>
              
              <a 
                href="https://wa.me/49123456789" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-white/5 text-white/80 hover:text-white transition-all active:scale-[0.98]"
                style={{
                  transitionDelay: `${isOpen ? 400 + navItems.length * 250 + 400 : 0}ms`,
                  transform: isOpen ? "translateY(0)" : "translateY(24px)",
                  opacity: isOpen ? 1 : 0,
                  transition: "all 1000ms cubic-bezier(0.16,1,0.3,1)"
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="text-lg font-medium">WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* CTA Button Fixed at Bottom */}
          <div className="p-6 pt-0 mt-auto shrink-0 bg-transparent" style={{
                transitionDelay: `${isOpen ? 400 + navItems.length * 250 + 650 : 0}ms`,
                transform: isOpen ? "translateY(0)" : "translateY(24px)",
                opacity: isOpen ? 1 : 0,
                transition: "all 1000ms cubic-bezier(0.16,1,0.3,1)"
              }}>
            <Link
              href={leadFormHref}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-bold text-navy-900 bg-gradient-gold hover:shadow-gold-lg transition-all duration-300 active:scale-[0.98]"
            >
              {tHero("cta")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
