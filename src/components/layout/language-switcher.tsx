"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
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
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          className={`text-sm px-2 py-1 rounded ${
            locale === l 
              ? "bg-white/20 font-semibold" 
              : "hover:bg-white/10"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
