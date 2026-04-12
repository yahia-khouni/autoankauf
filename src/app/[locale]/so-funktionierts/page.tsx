"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ClipboardList, MessageSquare, Handshake, CreditCard,
  Search, FileText, ShieldCheck, Banknote,
  CheckCircle, Star, Shield, Zap, ArrowRight, Phone,
  Car, Clock, Award, MapPin, ChevronDown, Sparkles,
  Users, TrendingUp, Lock, CircleDot, Gauge,
  ChevronRight, HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════
   REVEAL — intersection-observer fade+slide
   ══════════════════════════════════════════════ */
function Reveal({
  children, delay = 0, dir = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  dir?: "up" | "left" | "right" | "none"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    o.observe(el); return () => o.disconnect();
  }, []);
  const t0: Record<string, string> = {
    up: "translateY(30px)", left: "translateX(-30px)", right: "translateX(30px)", none: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : t0[dir],
      transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ══════════════════════════════════════════════
   COUNTING NUMBER — animates on first view
   ══════════════════════════════════════════════ */
function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  const hasNum = !isNaN(num);
  const [display, setDisplay] = useState(hasNum ? "0" : value);
  const seen = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen.current) {
        seen.current = true;
        if (!hasNum) return;
        const dur = 1400; const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const cur = (num * ease);
          setDisplay(Number.isInteger(num) ? Math.round(cur).toLocaleString("de-DE") : cur.toFixed(1));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [hasNum, num]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ══════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════ */
export default function SoFunktioniertsPage() {
  const t = useTranslations("soFunktionierts");
  const [tab, setTab] = useState<"seller" | "buyer">("seller");
  const [activeStep, setActiveStep] = useState(0);

  const sellerSteps = [
    { icon: ClipboardList, num: "01", title: t("sellerStep1Title"), sub: t("sellerStep1Sub"), desc: t("sellerStep1Desc"), details: [t("sellerStep1D1"), t("sellerStep1D2"), t("sellerStep1D3"), t("sellerStep1D4")] },
    { icon: MessageSquare, num: "02", title: t("sellerStep2Title"), sub: t("sellerStep2Sub"), desc: t("sellerStep2Desc"), details: [t("sellerStep2D1"), t("sellerStep2D2"), t("sellerStep2D3"), t("sellerStep2D4")] },
    { icon: Handshake,     num: "03", title: t("sellerStep3Title"), sub: t("sellerStep3Sub"), desc: t("sellerStep3Desc"), details: [t("sellerStep3D1"), t("sellerStep3D2"), t("sellerStep3D3"), t("sellerStep3D4")] },
    { icon: CreditCard,    num: "04", title: t("sellerStep4Title"), sub: t("sellerStep4Sub"), desc: t("sellerStep4Desc"), details: [t("sellerStep4D1"), t("sellerStep4D2"), t("sellerStep4D3"), t("sellerStep4D4")] },
  ];
  const buyerSteps = [
    { icon: Search,      num: "01", title: t("buyerStep1Title"), sub: t("buyerStep1Sub"), desc: t("buyerStep1Desc"), details: [t("buyerStep1D1"), t("buyerStep1D2"), t("buyerStep1D3"), t("buyerStep1D4")] },
    { icon: FileText,    num: "02", title: t("buyerStep2Title"), sub: t("buyerStep2Sub"), desc: t("buyerStep2Desc"), details: [t("buyerStep2D1"), t("buyerStep2D2"), t("buyerStep2D3"), t("buyerStep2D4")] },
    { icon: ShieldCheck, num: "03", title: t("buyerStep3Title"), sub: t("buyerStep3Sub"), desc: t("buyerStep3Desc"), details: [t("buyerStep3D1"), t("buyerStep3D2"), t("buyerStep3D3"), t("buyerStep3D4")] },
    { icon: Banknote,    num: "04", title: t("buyerStep4Title"), sub: t("buyerStep4Sub"), desc: t("buyerStep4Desc"), details: [t("buyerStep4D1"), t("buyerStep4D2"), t("buyerStep4D3"), t("buyerStep4D4")] },
  ];

  const handleTabChange = useCallback((newTab: "seller" | "buyer") => {
    setTab(newTab);
  }, []);

  const steps = tab === "seller" ? sellerSteps : buyerSteps;

  const stats = [
    { val: "5000", suffix: "+", label: t("stat1Label"), icon: Users },
    { val: "4.9",  suffix: "★", label: t("stat2Label"), icon: Star  },
    { val: "24",   suffix: "h", label: t("stat3Label"), icon: Clock },
    { val: "100",  suffix: "%", label: t("stat4Label"), icon: Shield },
  ];

  const advantages = [
    { icon: Zap,        title: t("adv1Title"), desc: t("adv1Desc") },
    { icon: Shield,     title: t("adv2Title"), desc: t("adv2Desc") },
    { icon: TrendingUp, title: t("adv3Title"), desc: t("adv3Desc") },
    { icon: MapPin,     title: t("adv4Title"), desc: t("adv4Desc") },
    { icon: Award,      title: t("adv5Title"), desc: t("adv5Desc") },
    { icon: Lock,       title: t("adv6Title"), desc: t("adv6Desc") },
  ];

  const reviews = [
    { name: t("r1Name"), loc: t("r1Loc"), car: t("r1Car"), role: t("r1Role"), text: t("r1Text"), stars: 5 },
    { name: t("r2Name"), loc: t("r2Loc"), car: t("r2Car"), role: t("r2Role"), text: t("r2Text"), stars: 5 },
    { name: t("r3Name"), loc: t("r3Loc"), car: t("r3Car"), role: t("r3Role"), text: t("r3Text"), stars: 5 },
  ];

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") }, { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") }, { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") }, { q: t("faq6Q"), a: t("faq6A") },
    { q: t("faq7Q"), a: t("faq7A") },
  ];

  const tlItems = [
    { icon: ClipboardList, time: t("tl1Time"), title: t("tl1Title"), desc: t("tl1Desc") },
    { icon: MessageSquare, time: t("tl2Time"), title: t("tl2Title"), desc: t("tl2Desc") },
    { icon: Handshake,     time: t("tl3Time"), title: t("tl3Title"), desc: t("tl3Desc") },
    { icon: CreditCard,    time: t("tl4Time"), title: t("tl4Title"), desc: t("tl4Desc") },
  ];

  /* ════════════════════════════════════════════════
     ① HERO
     ════════════════════════════════════════════════ */
  return (
    <div className="antialiased">

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />

        {/* Soft ambient orbs only */}
        <div className="absolute bottom-16 left-10 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />

        {/* Diagonal bottom wedge */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 sm:h-20 fill-white">
            <polygon points="0,80 1440,10 1440,80" />
          </svg>
        </div>

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-md border border-white/15 px-4 py-1.5 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-sm font-medium text-gold-300 tracking-wide">{t("heroBadge")}</span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-5">
                {(() => {
                  const full = t("heroTitle");
                  const hl = t("heroHighlight");
                  const idx = full.indexOf(hl);
                  if (idx === -1) return full;
                  return (<>
                    {full.slice(0, idx)}
                    <span className="text-gold-gradient">{hl}</span>
                    {full.slice(idx + hl.length)}
                  </>);
                })()}
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <p className="text-base sm:text-xl text-slate-300/90 leading-relaxed mb-10 max-w-2xl mx-auto">
                {t("heroSubtitle")}
              </p>
            </Reveal>

            {/* Tab switcher — pill style */}
            <Reveal delay={200}>
              <div className="inline-flex items-center p-1 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 gap-1">
                {[
                  { key: "seller" as const, icon: Car, label: t("tabSell") },
                  { key: "buyer"  as const, icon: Search, label: t("tabBuy") },
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    id={`tab-${key}`}
                    onClick={() => handleTabChange(key)}
                    className={cn(
                      "relative flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300",
                      tab === key
                        ? "bg-gradient-gold text-navy-900 shadow-[0_4px_20px_rgba(251,191,36,0.35)]"
                        : "text-white/70 hover:text-white hover:bg-white/8"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── ② STEPS — clean card grid ─────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-gold-400/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-navy-900/[0.03] rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 mb-4">
              <CircleDot className="h-3.5 w-3.5 text-gold-500" />
              <span className="text-xs font-bold text-navy-700 uppercase tracking-[0.12em]">{tab === "seller" ? t("tabSell") : t("tabBuy")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
              {tab === "seller" ? t("tabSell") : t("tabBuy")}
            </h2>
          </Reveal>

          {/* 4-step cards — 2×2 grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <Reveal key={`${tab}-${i}`} delay={i * 70}>
                <div className="group relative bg-white border border-slate-200/70 rounded-2xl overflow-hidden hover:shadow-[0_8px_40px_rgba(10,25,41,0.10)] hover:-translate-y-1 transition-all duration-500">
                  {/* accent top bar */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-gold-400 to-gold-300" />
                  <div className="p-6 sm:p-8">
                    {/* icon + step number */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-13 h-13 w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="h-6 w-6 text-navy-900" />
                      </div>
                      <span className="text-4xl font-black text-slate-100 leading-none select-none">{step.num}</span>
                    </div>

                    <p className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-1.5">{step.sub}</p>
                    <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-3 leading-snug">{step.title}</h3>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-5">{step.desc}</p>

                    {/* detail pills */}
                    <ul className="grid grid-cols-1 gap-2">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-center gap-2.5">
                          <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0" />
                          <span className="text-sm text-navy-700 font-medium">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ③ TIMELINE ────────────────────────────────── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <div className="hidden sm:block absolute -top-10 right-14 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />

        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0}>
            <div className="text-center mb-14 sm:mb-20">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-1.5 mb-5">
                <Clock className="h-3.5 w-3.5 text-gold-400" />
                <span className="text-xs font-bold text-gold-300 tracking-[0.12em] uppercase">{t("timelineBadge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">{t("timelineTitle")}</h2>
              <p className="text-slate-400 text-sm sm:text-base">{t("timelineSubtitle")}</p>
            </div>
          </Reveal>

          {/* Timeline: vertical connector line + staggered cards */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line desktop */}
            <div className="hidden sm:block absolute left-[2.1rem] top-10 bottom-10 w-px bg-gradient-to-b from-gold-400/10 via-gold-400/40 to-gold-400/10" />

            <div className="space-y-6 sm:space-y-5">
              {tlItems.map((item, i) => (
                <Reveal key={i} delay={120 + i * 110} dir="left">
                  <div className="group flex items-start gap-5 sm:gap-6">
                    {/* icon node */}
                    <div className="relative flex-shrink-0">
                      <div className="w-17 w-16 h-16 rounded-2xl bg-white/6 backdrop-blur-md border border-white/12 flex items-center justify-center group-hover:bg-white/12 group-hover:border-gold-400/40 transition-all duration-500 shadow-lg">
                        <item.icon className="h-7 w-7 text-gold-400 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      {/* step badge */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center text-[9px] font-black text-navy-900 shadow-gold">
                        {i + 1}
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex-1 min-w-0 bg-white/5 backdrop-blur-sm border border-white/8 group-hover:border-gold-400/20 group-hover:bg-white/8 rounded-2xl px-5 py-4 transition-all duration-500">
                      <p className="text-[10px] font-black text-gold-400/80 uppercase tracking-[0.15em] mb-1">{item.time}</p>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ④ STATS ──────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-y border-slate-100 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-gold-50/50 to-transparent pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-10">
            <p className="text-xs font-black text-slate-300 uppercase tracking-[0.18em]">{t("trustTitle")}</p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="group relative flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <s.icon className="h-5.5 h-5 w-5 text-gold-600" />
                  </div>
                  {/* Animated number */}
                  <div className="text-4xl sm:text-5xl font-black tracking-tight leading-none mb-2">
                    <span className="text-gold-gradient">
                      <CountUp value={s.val} suffix={s.suffix} />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-snug">{s.label}</p>
                  {/* bottom accent */}
                  <div className="mt-4 w-8 h-0.5 bg-gradient-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ⑤ ADVANTAGES — bento masonry ────────────── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-400/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-navy-900/[0.03] rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-sm px-4 py-1.5 mb-5">
              <Award className="h-3.5 w-3.5 text-gold-500" />
              <span className="text-xs font-black text-navy-700 uppercase tracking-[0.12em]">{t("whyBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight mb-4">{t("whyTitle")}</h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">{t("whySubtitle")}</p>
          </Reveal>

          {/* 3-col grid with alternating card heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {advantages.map((adv, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className={cn(
                  "group relative bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-[0_8px_40px_rgba(10,25,41,0.10)] hover:-translate-y-1.5 transition-all duration-500",
                  i % 3 === 1 ? "lg:mt-6" : ""  // stagger middle column
                )}>
                  {/* top color band */}
                  <div className={cn(
                    "h-1 w-full bg-gradient-to-r transition-all duration-500",
                    i % 3 === 0 ? "from-gold-400 to-gold-300" :
                    i % 3 === 1 ? "from-navy-700 to-navy-500" :
                    "from-gold-300 to-gold-500"
                  )} />

                  <div className="p-6 sm:p-8">
                    {/* Icon with number */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-50 group-hover:border-gold-200 transition-all duration-300">
                        <adv.icon className="h-5.5 h-5 w-5 text-navy-700 group-hover:text-gold-600 transition-colors duration-300" />
                      </div>
                      <span className="text-[11px] font-black text-slate-200 group-hover:text-slate-300 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-2 leading-snug">{adv.title}</h3>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ⑥ REVIEWS — minimal cards ────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[32rem] h-[32rem] bg-gold-400/[0.05] rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-50 border border-gold-200 px-4 py-1.5 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />)}
              </div>
              <span className="text-xs font-bold text-gold-700">{t("reviewsBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-3">{t("reviewsTitle")}</h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">{t("reviewsSubtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={cn(
                  "group relative flex flex-col bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 hover:shadow-[0_8px_40px_rgba(10,25,41,0.08)] hover:border-gold-200/60 transition-all duration-500",
                  i === 1 ? "sm:translate-y-6" : ""
                )}>
                  {/* faint quote mark */}
                  <div className="absolute top-4 right-5 text-5xl font-serif text-slate-100 leading-none select-none group-hover:text-gold-100 transition-colors">"</div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(r.stars)].map((_, k) => <Star key={k} className="h-4 w-4 fill-gold-400 text-gold-400" />)}
                  </div>

                  {/* Role pill */}
                  <div className="inline-flex items-center gap-1.5 mb-3 bg-navy-50 border border-navy-100/80 rounded-full px-2.5 py-1 w-fit">
                    <Gauge className="h-3 w-3 text-navy-500" />
                    <span className="text-[11px] font-bold text-navy-700">{r.role}</span>
                  </div>

                  <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed flex-1 mb-6">"{r.text}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center text-gold-400 font-black text-sm flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-navy-900 text-sm truncate">{r.name}</p>
                      <p className="text-xs text-slate-400 truncate">{r.loc} · {r.car}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ⑦ FAQ — matches homepage style ──────────── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-navy-900/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

            {/* Left column — heading + contact card pushed to bottom */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <Reveal delay={0} className="flex flex-col h-full justify-between">
                <div className="mb-12">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-navy-100 px-4 py-2 mb-6">
                    <HelpCircle className="h-4 w-4 text-gold-500" />
                    <span className="text-sm font-bold text-navy-800 tracking-wide uppercase">{t("faqBadge")}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-navy-900 leading-tight">{t("faqTitle")}</h2>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t("faqSubtitle")}</p>
                </div>

                {/* Contact card pushed to bottom */}
                <div className="bg-white rounded-2xl p-6 shadow-premium border border-slate-100 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{t("faqContact")}</h3>
                  <p className="text-slate-600 text-sm mb-6">{t("faqContactDesc")}</p>
                  <a
                    href="tel:+4912345678900"
                    className="group flex items-center justify-between bg-navy-900 hover:bg-navy-800 text-white rounded-xl px-5 py-4 font-semibold text-base transition-all active:scale-[0.98] shadow-lg hover:shadow-navy-900/30"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">+49 123 456 789 00</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right column — Radix Accordion */}
            <div className="lg:col-span-8 h-full">
              <Reveal delay={100} className="h-full">
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden p-2 sm:p-4 h-full flex flex-col">
                  <Accordion type="single" collapsible className="w-full h-full flex-1">
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-slate-100 last:border-0 data-[state=open]:bg-slate-50/50 rounded-xl transition-all duration-300 px-4 sm:px-6"
                      >
                        <AccordionTrigger className="text-left py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180 group">
                          <span className="font-bold text-base sm:text-lg text-navy-900 group-hover:text-gold-600 transition-colors pr-4 leading-snug">
                            {faq.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 pb-8 px-0 leading-relaxed text-sm sm:text-base">
                          <div className="pt-2">{faq.a}</div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ⑧ CTA ────────────────────────────────────── */}
      <section className="py-16 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 bg-hero-pattern opacity-25" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-16 w-56 h-56 bg-gold-400/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 left-12 w-64 h-64 bg-gold-400/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gold-400/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 max-w-3xl mx-auto text-center">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-1.5 mb-7">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              <span className="text-xs font-bold text-gold-300 tracking-[0.12em] uppercase">{t("ctaBadge")}</span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
              {t("ctaTitle")}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
              {t("ctaSubtitle")}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#lead-form"
                id="cta-offer-link"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 btn-cta-glow"
              >
                <div className="absolute inset-0 bg-gradient-gold" />
                <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-40" />
                <span className="relative text-navy-900 text-lg">{t("ctaBtn")}</span>
                <ArrowRight className="relative h-5 w-5 text-navy-900 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="tel:+4912345678900"
                id="cta-phone-link"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white font-semibold text-base transition-all backdrop-blur-sm"
              >
                <Phone className="h-4.5 h-4 w-4 text-gold-400" />
                +49 123 456 789 00
              </a>
            </div>

            {/* Feature pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[t("ctaFeat1"), t("ctaFeat2"), t("ctaFeat3")].map((feat, i) => (
                <span key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <span className="w-4 h-4 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-2.5 w-2.5 text-gold-400" />
                  </span>
                  {feat}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      </section>
    </div>
  );
}
