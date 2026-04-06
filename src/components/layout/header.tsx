"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/standorte", label: t("locations") },
    { href: "/so-funktionierts", label: t("howItWorks") },
    { href: "/ueber-uns", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/kontakt", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+4912345678900" className="flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" />
              +49 123 456 789 00
            </a>
            <a 
              href="https://wa.me/4912345678900" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Uber 5.000 Autos angekauft</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Autoankauf</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/#lead-form"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Jetzt Angebot erhalten
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn("md:hidden border-t", isOpen ? "block" : "hidden")}>
        <nav className="container py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#lead-form"
            className="block w-full text-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            onClick={() => setIsOpen(false)}
          >
            Jetzt Angebot erhalten
          </Link>
          <div className="pt-4 border-t">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
