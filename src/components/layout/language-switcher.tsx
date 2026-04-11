"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    const newPath = newLocale === "de" 
      ? `/${segments.join("/")}`
      : `/${newLocale}/${segments.join("/")}`;
    router.push(newPath || "/");
  };

  return (
    <div className={cn(
      "flex items-center gap-1 p-1 rounded-full border transition-all duration-300",
      variant === 'dark' 
        ? "bg-white/5 border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
        : "bg-slate-100 border-slate-200/50 shadow-inner my-1"
    )}>
      <Globe className={cn(
        "h-3.5 w-3.5 ml-2 mr-1",
        variant === 'dark' ? "text-gold-400" : "text-gold-600"
      )} />
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={cn(
            "text-[10px] font-bold px-2.5 py-1.5 rounded-full transition-all duration-300 uppercase tracking-widest",
            locale === l
              ? variant === 'dark'
                ? "bg-gradient-gold text-navy-900 shadow-md shadow-gold-500/20"
                : "bg-white text-navy-900 shadow-sm border border-slate-200/60"
              : variant === 'dark'
                ? "text-white/60 hover:text-white hover:bg-white/10"
                : "text-slate-500 hover:text-navy-900 hover:bg-slate-200/60"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
