"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export function LanguageSwitcher({ variant = 'dark', compact = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (newLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    const newPath = newLocale === "de" 
      ? `/${segments.join("/")}`
      : `/${newLocale}/${segments.join("/")}`;
    router.push(newPath || "/");
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center p-2 rounded-full transition-all duration-300 backdrop-blur-md",
            variant === 'dark' 
              ? "bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-white" 
              : "bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200/50 text-navy-900",
            isOpen && (variant === 'dark' ? "bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "bg-slate-200")
          )}
          aria-label="Select language"
        >
          <Globe className="h-[18px] w-[18px]" />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 min-w-[140px] rounded-2xl bg-white shadow-premium border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => handleChange(l)}
                className={cn(
                  "block w-full text-left px-5 py-3.5 text-[15px] font-bold uppercase tracking-widest transition-colors",
                  locale === l ? "bg-slate-50 text-gold-600" : "text-navy-900 hover:bg-slate-50 hover:text-gold-500"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center rounded-full border transition-all duration-300",
      compact ? "gap-0.5 p-0.5" : "gap-1 p-1",
      variant === 'dark' 
        ? "bg-white/5 border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
        : "bg-slate-100 border-slate-200/50 shadow-inner my-1"
    )}>
      <Globe className={cn(
        compact ? "h-3 w-3 ml-1.5 mr-0.5" : "h-3.5 w-3.5 ml-2 mr-1",
        variant === 'dark' ? "text-gold-400" : "text-gold-600"
      )} />
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={cn(
            "font-bold rounded-full transition-all duration-300 uppercase",
            compact ? "text-[9px] px-1.5 py-1 tracking-[0.08em]" : "text-[10px] px-2.5 py-1.5 tracking-widest",
            locale === l
              ? variant === 'dark'
                ? "bg-white/15 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                : "bg-white text-navy-900 shadow-sm border border-slate-200/60"
              : variant === 'dark'
                ? "text-white/60 hover:text-white hover:bg-white/5"
                : "text-slate-500 hover:text-navy-900 hover:bg-slate-200/60"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
