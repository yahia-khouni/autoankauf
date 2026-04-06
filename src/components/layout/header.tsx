"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, Star, ArrowRight } from "lucide-react";
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
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100" 
        : "bg-transparent"
    )}>
      {/* Top Bar */}
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
        isScrolled ? "h-16" : "h-20"
      )}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
            <span className="text-lg font-bold text-navy-900">A</span>
          </div>
          <div className={cn(
            "transition-colors",
            isScrolled ? "text-navy-900" : "text-white"
          )}>
            <span className="text-xl font-bold">Autoankauf</span>
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

        <button
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors",
            isScrolled ? "hover:bg-slate-100" : "hover:bg-white/10"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={cn("h-6 w-6", isScrolled ? "text-navy-900" : "text-white")} />
          ) : (
            <Menu className={cn("h-6 w-6", isScrolled ? "text-navy-900" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute left-0 right-0 bg-white border-b shadow-premium transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 px-4 text-sm font-medium text-slate-700 hover:text-navy-900 hover:bg-slate-50 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/#lead-form"
              className="block w-full text-center rounded-xl bg-gradient-gold px-6 py-4 text-sm font-bold text-navy-900 shadow-gold"
              onClick={() => setIsOpen(false)}
            >
              {tHero("cta")}
            </Link>
          </div>
          <div className="pt-4 flex items-center justify-between">
            <LanguageSwitcher />
            <a href="tel:+4912345678900" className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-gold-500" />
              +49 123 456 789 00
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
