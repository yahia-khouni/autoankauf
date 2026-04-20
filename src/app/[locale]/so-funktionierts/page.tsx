"use client";

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  ClipboardList, MessageSquare, Handshake, CreditCard,
  Search, FileText, ShieldCheck, Banknote,
  CheckCircle, Shield, Zap, ArrowRight, Phone,
  Car, Clock, Award, MapPin, Sparkles, Star,
  Users, TrendingUp, Lock, CircleDot,
  HelpCircle, XCircle, ThumbsUp, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { FaqContactCard } from "@/components/sections/faq-contact-card";

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
   COMPARISON — modern split-table design
   ══════════════════════════════════════════════ */
type TFn = ReturnType<typeof useTranslations>;

/* Animated row — slides + fades in when visible */
function CompRow({
  icon: Icon, label, trad, us, delay,
}: { icon: React.ElementType; label: string; trad: string; us: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[1fr_180px_1fr] items-center gap-3 sm:gap-4 py-4 border-b border-slate-100 last:border-0 transition-all duration-700"
      style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)" }}
    >
      {/* Traditional column */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-5 h-5 flex-shrink-0 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <XCircle className="h-3 w-3 text-red-400" />
        </div>
        <span className="text-xs sm:text-sm text-slate-400 line-through leading-snug">{trad}</span>
      </div>

      {/* Center label */}
      <div className="flex flex-col items-center gap-1.5 px-1">
        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          <Icon className="h-4 w-4 text-navy-500" />
        </div>
        <p className="text-[10px] sm:text-xs font-bold text-navy-700 text-center uppercase tracking-wide leading-tight">{label}</p>
      </div>

      {/* autoankauf column */}
      <div className="flex items-center justify-end gap-2 min-w-0">
        <span className="text-xs sm:text-sm font-bold text-navy-800 text-right leading-snug">{us}</span>
        <div className="w-5 h-5 flex-shrink-0 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center">
          <CheckCircle className="h-3 w-3 text-gold-500" />
        </div>
      </div>
    </div>
  );
}

function ComparisonSection({ t, leadFormHref }: { t: TFn; leadFormHref: string }) {
  const rows = [
    { icon: Clock, label: t("cmpRow1Label"), trad: t("cmpRow1Trad"), us: t("cmpRow1Us") },
    { icon: Car, label: t("cmpRow2Label"), trad: t("cmpRow2Trad"), us: t("cmpRow2Us") },
    { icon: ThumbsUp, label: t("cmpRow3Label"), trad: t("cmpRow3Trad"), us: t("cmpRow3Us") },
    { icon: Shield, label: t("cmpRow4Label"), trad: t("cmpRow4Trad"), us: t("cmpRow4Us") },
    { icon: FileText, label: t("cmpRow5Label"), trad: t("cmpRow5Trad"), us: t("cmpRow5Us") },
    { icon: Zap, label: t("cmpRow6Label"), trad: t("cmpRow6Trad"), us: t("cmpRow6Us") },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-gold-400/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-navy-900/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6 max-w-5xl mx-auto">

        {/* Header */}
        <Reveal delay={0} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-sm px-4 py-1.5 mb-5">
            <TrendingUp className="h-3.5 w-3.5 text-gold-500" />
            <span className="text-xs font-black text-navy-700 uppercase tracking-[0.12em]">{t("cmpBadge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight mb-3">
            {(() => {
              const title = t("cmpTitle");
              const hl = "autoankauf.de";
              const idx = title.indexOf(hl);
              if (idx === -1) return title;
              return (<>{title.slice(0, idx)}<span className="text-gold-gradient">{hl}</span>{title.slice(idx + hl.length)}</>);
            })()}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">{t("cmpSubtitle")}</p>
        </Reveal>

        {/* Main comparison card */}
        <Reveal delay={60}>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_40px_rgba(10,25,41,0.07)] overflow-hidden">

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[1fr_180px_1fr] px-6 sm:px-10 py-4 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-300 flex-shrink-0" />
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{t("cmpColTrad")}</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">vs</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs font-black text-navy-700 uppercase tracking-widest">{t("cmpColUs")}</span>
                <span className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />
              </div>
            </div>

            {/* Comparison rows */}
            <div className="px-6 sm:px-10">
              {rows.map((row, i) => (
                <CompRow key={i} icon={row.icon} label={row.label} trad={row.trad} us={row.us} delay={i * 100} />
              ))}
            </div>

            {/* Bottom CTA strip */}
            <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 px-6 sm:px-10 py-6 sm:py-8 mt-0">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
                    {[t("cmpRow1Us"), t("cmpRow4Us"), t("cmpRow6Us")].map((feat, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle className="h-3.5 w-3.5 text-gold-400 flex-shrink-0" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={leadFormHref}
                  className="group relative flex-shrink-0 flex items-center gap-3 bg-gradient-gold text-navy-900 font-bold rounded-xl px-7 py-3.5 text-sm hover:shadow-[0_4px_24px_rgba(251,191,36,0.45)] transition-all duration-300 active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-30" />
                  <span className="relative">{t("cmpCtaBtn")}</span>
                  <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════ */
export default function SoFunktioniertsPage() {
  const t = useTranslations("soFunktionierts");
  const locale = useLocale();
  const leadFormHref = locale === "de" ? "/#lead-form" : `/${locale}/#lead-form`;
  const [tab, setTab] = useState<"seller" | "buyer">("seller");
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const pendingFaqScrollY = useRef<number | null>(null);

  const handleFaqToggle = useCallback((i: number) => {
    pendingFaqScrollY.current = window.scrollY;
    setFaqOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  useLayoutEffect(() => {
    const y = pendingFaqScrollY.current;
    if (y === null) return;
    pendingFaqScrollY.current = null;

    const root = document.documentElement;
    const prevScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: y, left: 0, behavior: "auto" });
    root.style.scrollBehavior = prevScrollBehavior;
  }, [faqOpenIndex]);

  const sellerSteps = [
    { icon: ClipboardList, num: "01", title: t("sellerStep1Title"), sub: t("sellerStep1Sub"), desc: t("sellerStep1Desc"), details: [t("sellerStep1D1"), t("sellerStep1D2"), t("sellerStep1D3"), t("sellerStep1D4")] },
    { icon: MessageSquare, num: "02", title: t("sellerStep2Title"), sub: t("sellerStep2Sub"), desc: t("sellerStep2Desc"), details: [t("sellerStep2D1"), t("sellerStep2D2"), t("sellerStep2D3"), t("sellerStep2D4")] },
    { icon: Handshake, num: "03", title: t("sellerStep3Title"), sub: t("sellerStep3Sub"), desc: t("sellerStep3Desc"), details: [t("sellerStep3D1"), t("sellerStep3D2"), t("sellerStep3D3"), t("sellerStep3D4")] },
    { icon: CreditCard, num: "04", title: t("sellerStep4Title"), sub: t("sellerStep4Sub"), desc: t("sellerStep4Desc"), details: [t("sellerStep4D1"), t("sellerStep4D2"), t("sellerStep4D3"), t("sellerStep4D4")] },
  ];
  const buyerSteps = [
    { icon: Search, num: "01", title: t("buyerStep1Title"), sub: t("buyerStep1Sub"), desc: t("buyerStep1Desc"), details: [t("buyerStep1D1"), t("buyerStep1D2"), t("buyerStep1D3"), t("buyerStep1D4")] },
    { icon: FileText, num: "02", title: t("buyerStep2Title"), sub: t("buyerStep2Sub"), desc: t("buyerStep2Desc"), details: [t("buyerStep2D1"), t("buyerStep2D2"), t("buyerStep2D3"), t("buyerStep2D4")] },
    { icon: ShieldCheck, num: "03", title: t("buyerStep3Title"), sub: t("buyerStep3Sub"), desc: t("buyerStep3Desc"), details: [t("buyerStep3D1"), t("buyerStep3D2"), t("buyerStep3D3"), t("buyerStep3D4")] },
    { icon: Banknote, num: "04", title: t("buyerStep4Title"), sub: t("buyerStep4Sub"), desc: t("buyerStep4Desc"), details: [t("buyerStep4D1"), t("buyerStep4D2"), t("buyerStep4D3"), t("buyerStep4D4")] },
  ];

  const handleTabChange = useCallback((newTab: "seller" | "buyer") => {
    setTab(newTab);
  }, []);

  const steps = tab === "seller" ? sellerSteps : buyerSteps;

  const stats = [
    { val: "5000", suffix: "+", label: t("stat1Label"), icon: Users },
    { val: "4.9", suffix: "★", label: t("stat2Label"), icon: Star },
    { val: "24", suffix: "h", label: t("stat3Label"), icon: Clock },
    { val: "100", suffix: "%", label: t("stat4Label"), icon: Shield },
  ];

  const advantages = [
    { icon: Zap, title: t("adv1Title"), desc: t("adv1Desc") },
    { icon: Shield, title: t("adv2Title"), desc: t("adv2Desc") },
    { icon: TrendingUp, title: t("adv3Title"), desc: t("adv3Desc") },
    { icon: MapPin, title: t("adv4Title"), desc: t("adv4Desc") },
    { icon: Award, title: t("adv5Title"), desc: t("adv5Desc") },
    { icon: Lock, title: t("adv6Title"), desc: t("adv6Desc") },
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
    { icon: Handshake, time: t("tl3Time"), title: t("tl3Title"), desc: t("tl3Desc") },
    { icon: CreditCard, time: t("tl4Time"), title: t("tl4Title"), desc: t("tl4Desc") },
  ];

  /* ════════════════════════════════════════════════
     ① HERO
     ════════════════════════════════════════════════ */
  return (
    <div className="antialiased">

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />

        {/* Soft ambient orbs only */}
        <div className="absolute bottom-16 left-10 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />


        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-5 py-2 backdrop-blur-sm mb-7">
                <ClipboardList className="h-4 w-4 text-gold-400" />
                <span className="text-sm font-medium text-gold-300">{t("heroBadge")}</span>
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


          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
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
                      <span className="text-4xl font-black text-slate-200 leading-none select-none">{step.num}</span>
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
            <p className="text-xs font-black text-slate-600 uppercase tracking-[0.18em]">{t("trustTitle")}</p>
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

      {/* ─── ⑥ COMPARISON — Traditional vs autoankauf.de ── */}
      <ComparisonSection t={t} leadFormHref={leadFormHref} />

      {/* ─── ⑦ FAQ — same layout as homepage FAQSection ──────────── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 relative [overflow-anchor:none]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-400/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-navy-900/5 rounded-full blur-[80px]" />
        </div>

        <div className="container relative px-4 sm:px-6 z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start lg:h-max">
              <AnimateOnScroll delay={0}>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-navy-100 px-4 py-2 mb-6">
                    <HelpCircle className="h-4 w-4 text-gold-500" />
                    <span className="text-sm font-bold text-navy-800 tracking-wide uppercase">{t("faqBadge")}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 text-navy-900 leading-tight">{t("faqTitle")}</h2>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t("faqSubtitle")}</p>
                </div>

                <FaqContactCard
                  title={t("faqContact")}
                  description={t("faqContactDesc")}
                  ctaLabel={t("faqCall")}
                  phoneDisplay="+49 123 456 789 00"
                  phoneHref="tel:+4912345678900"
                />
              </AnimateOnScroll>
            </div>

            <div className="lg:col-span-8">
              <AnimateOnScroll delay={100}>
                <div className="rounded-3xl shadow-lg border border-slate-100 overflow-hidden bg-white">
                  <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500" />
                  <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 bg-slate-50/60">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
                      {faqs.length} Fragen &amp; Antworten
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {faqOpenIndex !== null ? `${faqOpenIndex + 1} / ${faqs.length}` : "Klicken zum öffnen"}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {faqs.map((faq, i) => {
                      const isOpen = faqOpenIndex === i;
                      return (
                        <div
                          key={i}
                          style={{ overflowAnchor: "none" }}
                          className={`transition-colors duration-300 ${isOpen ? "bg-gold-50/30" : "bg-white hover:bg-slate-50/50"}`}
                        >
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleFaqToggle(i)}
                            className="w-full flex items-center gap-4 px-5 sm:px-7 py-5 text-left group focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <span
                              className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
                                isOpen
                                  ? "bg-gold-400 text-navy-900 shadow-[0_2px_8px_rgba(251,191,36,0.4)]"
                                  : "bg-slate-100 text-slate-400 group-hover:bg-gold-100 group-hover:text-gold-700"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`flex-1 font-semibold text-base sm:text-[17px] leading-snug transition-colors duration-200 ${
                                isOpen ? "text-navy-900" : "text-navy-800 group-hover:text-navy-900"
                              }`}
                            >
                              {faq.q}
                            </span>
                            <span
                              className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                isOpen
                                  ? "bg-gold-400 border-gold-400 rotate-180 shadow-[0_2px_8px_rgba(251,191,36,0.35)]"
                                  : "border-slate-200 bg-white group-hover:border-gold-300 group-hover:bg-gold-50"
                              }`}
                            >
                              <ChevronDown
                                className={`h-3.5 w-3.5 transition-colors ${isOpen ? "text-navy-900" : "text-slate-400 group-hover:text-gold-600"}`}
                              />
                            </span>
                          </button>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateRows: isOpen ? "1fr" : "0fr",
                              transition: "grid-template-rows 0.38s cubic-bezier(0.16,1,0.3,1)",
                            }}
                          >
                            <div className="overflow-hidden">
                              <div className="pl-16 pr-5 sm:pr-7 pb-6 pt-1">
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0 w-0.5 rounded-full bg-gradient-to-b from-gold-400 to-gold-200 self-stretch" />
                                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{faq.a}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimateOnScroll>
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
                href={leadFormHref}
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
