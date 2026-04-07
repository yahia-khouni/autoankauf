"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, Star, ArrowRight, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navItems = [
    { href: "/", label: t("home"), icon: "🏠" },
    { href: "/standorte", label: t("locations"), icon: "📍" },
    { href: "/so-funktionierts", label: t("howItWorks"), icon: "⚙️" },
    { href: "/ueber-uns", label: t("about"), icon: "👥" },
    { href: "/blog", label: t("blog"), icon: "📰" },
    { href: "/kontakt", label: t("contact"), icon: "✉️" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100" 
        : "bg-transparent"
    )}>
      {/* Top Bar - Desktop Only */}
      <div className={cn(
        "hidden md:block transition-all duration-300 overflow-hidden",
        isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"
      )}>
        <div className="bg-navy-900 text-white py-2.5">
          <div className="container flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+4912345678900" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone className="h-4 w-4 text-gold-400" />
                +49 123 456 789 00
              </a>
              <a 
                href="https://wa.me/4912345678900" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-gold-400" />
                WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
                <span className="text-slate-300">Über 5.000 Autos angekauft</span>
              </div>
              <div className="h-4 w-px bg-slate-600" />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Nav */}
      <div className={cn(
        "container flex items-center justify-between transition-all duration-300",
        isScrolled ? "h-16" : "h-16 md:h-20"
      )}>
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
            <span className="text-base sm:text-lg font-bold text-navy-900">A</span>
          </div>
          <div className={cn(
            "transition-colors",
            isScrolled ? "text-navy-900" : "text-white"
          )}>
            <span className="text-lg sm:text-xl font-bold">Autoankauf</span>
            <span className="hidden sm:inline text-gold-500 font-semibold ml-1">Deutschland</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 animated-underline",
                isScrolled 
                  ? "text-slate-700 hover:text-navy-900 hover:bg-slate-50" 
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {isScrolled && <LanguageSwitcher />}
          <Link
            href="/#lead-form"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-gold text-navy-900 hover:shadow-gold-lg hover:scale-105"
          >
            {tHero("cta")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden p-2.5 rounded-xl transition-all duration-200",
            isScrolled 
              ? "hover:bg-slate-100 active:bg-slate-200" 
              : "hover:bg-white/10 active:bg-white/20",
            isOpen && "bg-gold-500 hover:bg-gold-500"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-navy-900" />
          ) : (
            <Menu className={cn("h-6 w-6", isScrolled ? "text-navy-900" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu - Premium Full Screen Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 transition-all duration-500",
        isOpen ? "visible" : "invisible pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={cn(
          "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out overflow-hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Header */}
          <div className="bg-gradient-premium p-6 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                  <span className="text-lg font-bold text-navy-900">A</span>
                </div>
                <div className="text-white">
                  <span className="text-lg font-bold">Autoankauf</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            
            {/* Trust Badge in Header */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
              <span className="text-sm text-white/90">4.9 Sterne · 5.000+ Kunden</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-320px)]">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-gold-50 border border-transparent hover:border-gold-200 transition-all duration-200 active:scale-[0.98]"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1 font-medium text-navy-900">{item.label}</span>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>
          
          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 space-y-4">
            {/* CTA Button */}
            <Link
              href="/#lead-form"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-gold text-navy-900 font-bold text-base shadow-gold active:scale-[0.98] transition-transform"
              onClick={() => setIsOpen(false)}
            >
              <span>{tHero("cta")}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            {/* Contact Row */}
            <div className="flex items-center justify-between gap-3">
              <a 
                href="tel:+4912345678900" 
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-navy-900 text-white text-sm font-medium active:scale-[0.98] transition-transform"
              >
                <Phone className="h-4 w-4" />
                Anrufen
              </a>
              <a 
                href="https://wa.me/4912345678900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 text-white text-sm font-medium active:scale-[0.98] transition-transform"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center justify-center pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
