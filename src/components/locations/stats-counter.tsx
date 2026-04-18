"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Award, CarFront } from "lucide-react";

const iconMap = {
  ShieldCheck,
  Award,
  CarFront,
} as const;

type IconName = keyof typeof iconMap;

interface StatItem {
  value: string;
  iconName: IconName;
}

interface StatsCounterProps {
  stats: StatItem[];
}

/**
 * Animated stats counter component. Numbers count up
 * when the component scrolls into view.
 * Uses icon name strings instead of component references
 * to avoid Server->Client component serialization issues.
 */
export function StatsCounter({ stats }: StatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col sm:flex-row flex-wrap items-center sm:items-center justify-start gap-4 mt-12 w-full max-w-3xl">
      {stats.map((stat, i) => {
        const Icon = iconMap[stat.iconName];
        return (
          <div
            key={i}
            className={`group relative flex items-center justify-center gap-3 bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 text-center transition-all duration-700 hover:-translate-y-1 hover:bg-slate-800/60 hover:border-white/20 overflow-hidden ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ 
              transitionDelay: `${i * 150}ms`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            {/* Glow on hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-400/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-3">
              <Icon className="h-5 w-5 text-gold-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-transform duration-500 group-hover:scale-110" />
              <span className="text-[16px] font-medium text-white tracking-wide">
                {stat.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
