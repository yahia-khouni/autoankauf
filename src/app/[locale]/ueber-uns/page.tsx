"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  Users, Award, Clock, Car, Euro, Shield, Heart,
  MapPin, TrendingUp, CheckCircle, ArrowRight,
  Star, Sparkles, Phone, Lock, ThumbsUp,
} from "lucide-react";
import { COMPANY } from "@/lib/company";

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
   COUNT-UP — animates number on first view
   ══════════════════════════════════════════════ */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const seen = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen.current) {
        seen.current = true;
        const dur = 1600; const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(end * ease));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{display.toLocaleString("de-DE")}{suffix}</span>;
}

/* ══════════════════════════════════════════════
   VALUE CARD — animated scroll-reveal item
   ══════════════════════════════════════════════ */
function ValCard({ icon: Icon, title, desc, delay }: { icon: React.ElementType; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group flex items-start gap-5"
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(22px)",
        transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {/* Icon square */}
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gold-50 border border-gold-100 flex items-center justify-center shadow-sm group-hover:bg-gold-400 group-hover:border-gold-400 group-hover:shadow-gold transition-all duration-300">
        <Icon className="h-5 w-5 text-gold-600 group-hover:text-navy-900 transition-colors duration-300" />
      </div>

      {/* Text */}
      <div className="flex-1 pt-0.5">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-base sm:text-lg font-bold text-navy-900 leading-snug">{title}</h3>
          {/* Animated underline */}
          <div className="flex-1 h-px bg-gold-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
        <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════ */
export default function UeberUnsPage() {
  const t = useTranslations("ueberUns");
  const locale = useLocale();
  const leadFormHref = locale === "de" ? "/#lead-form" : `/${locale}/#lead-form`;

  const stats = [
    { icon: Car, end: 5000, suffix: "+", label: t("stat1Label") },
    { icon: Star, end: 4, suffix: ".9★", label: t("stat2Label") },
    { icon: Clock, end: 24, suffix: "h", label: t("stat3Label") },
    { icon: Award, end: 10, suffix: "+", label: t("stat4Label") },
    { icon: MapPin, end: 50, suffix: "+", label: t("stat5Label") },
    { icon: Users, end: 98, suffix: "%", label: t("stat6Label") },
  ];

  const values = [
    { icon: Euro, title: t("val1Title"), desc: t("val1Desc"), color: "gold" as const },
    { icon: Clock, title: t("val2Title"), desc: t("val2Desc"), color: "navy" as const },
    { icon: Shield, title: t("val3Title"), desc: t("val3Desc"), color: "gold" as const },
    { icon: Heart, title: t("val4Title"), desc: t("val4Desc"), color: "navy" as const },
    { icon: TrendingUp, title: t("val5Title"), desc: t("val5Desc"), color: "gold" as const },
    { icon: Lock, title: t("val6Title"), desc: t("val6Desc"), color: "navy" as const },
  ];

  const milestones = [
    { year: "2013", title: t("ms1Title"), desc: t("ms1Desc") },
    { year: "2016", title: t("ms2Title"), desc: t("ms2Desc") },
    { year: "2019", title: t("ms3Title"), desc: t("ms3Desc") },
    { year: "2022", title: t("ms4Title"), desc: t("ms4Desc") },
    { year: "2025", title: t("ms5Title"), desc: t("ms5Desc") },
  ];

  const whyUs = [
    t("why1"), t("why2"), t("why3"), t("why4"),
    t("why5"), t("why6"), t("why7"), t("why8"),
  ];

  const ctaHighlights = [
    { icon: ThumbsUp, text: t("ctaFeat1") },
    { icon: Shield, text: t("ctaFeat2") },
    { icon: Clock, text: t("ctaFeat3") },
  ];


  return (
    <div className="antialiased">

      {/* ─── ① HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute bottom-16 left-10 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -top-10 right-0 w-80 h-80 bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />


        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-5 py-2 backdrop-blur-sm mb-7">
                <Users className="h-4 w-4 text-gold-400" />
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

            <Reveal delay={200}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={leadFormHref}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden btn-cta-glow"
                >
                  <div className="absolute inset-0 bg-gradient-gold" />
                  <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-40" />
                  <span className="relative text-navy-900">{t("heroCta")}</span>
                  <ArrowRight className="relative h-5 w-5 text-navy-900 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/15 text-white font-semibold transition-all backdrop-blur-sm"
                >
                  <Phone className="h-4 w-4 text-gold-400" />
                  {COMPANY.phoneDisplayIntl}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ─── ② STATS ─────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-gradient-to-r from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-12">
            <p className="text-xs font-black text-slate-600 uppercase tracking-[0.18em]">{t("statsBadge")}</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200/60 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <s.icon className="h-5 w-5 text-gold-600" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black leading-none mb-1">
                    <span className="text-gold-gradient">
                      <CountUp end={s.end} suffix={s.suffix} />
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-snug">{s.label}</p>
                  <div className="mt-3 w-6 h-0.5 bg-gradient-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ③ STORY ─────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-gold-400/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

            {/* Left — visual card stack */}
            <Reveal delay={0} dir="left">
              <div className="relative">
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 sm:p-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 mb-6">
                      <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                      <span className="text-xs font-bold text-gold-300 uppercase tracking-wide">{t("storySince")}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">{t("storyCardTitle")}</h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{t("storyCardText")}</p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {[
                        { n: "5.000+", l: t("storyCard1") },
                        { n: "10+", l: t("storyCard2") },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <p className="text-2xl font-black text-gold-gradient mb-1">{item.n}</p>
                          <p className="text-xs text-slate-400">{item.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating trust badge */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-premium border border-slate-100 p-4 flex items-center gap-3 max-w-[200px]">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                    <ThumbsUp className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-navy-900">{t("storyBadge1")}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, k) => <Star key={k} className="h-3 w-3 fill-gold-400 text-gold-400" />)}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — text */}
            <Reveal delay={80} dir="right">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 mb-6">
                  <Award className="h-3.5 w-3.5 text-gold-500" />
                  <span className="text-xs font-black text-navy-700 uppercase tracking-[0.12em]">{t("storyBadge")}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight mb-6">
                  {t("storyTitle")}
                </h2>
                <div className="space-y-4 text-slate-600 text-base sm:text-[17px] leading-relaxed">
                  <p>{t("storyP1")}</p>
                  <p>{t("storyP2")}</p>
                  <p>{t("storyP3")}</p>
                </div>

                {/* Why us checklist */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {whyUs.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-navy-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── ④ VALUES — clean animated feature list ──────── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-gold-400/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] bg-navy-900/[0.02] rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6 max-w-5xl mx-auto">

          {/* Header */}
          <Reveal delay={0} className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-50 border border-gold-200 px-4 py-1.5 mb-5">
              <Heart className="h-3.5 w-3.5 text-gold-600" />
              <span className="text-xs font-black text-gold-700 uppercase tracking-[0.12em]">{t("valBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight mb-4">{t("valTitle")}</h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">{t("valSubtitle")}</p>
            {/* Centered gold rule */}
            <div className="mt-8 mx-auto w-16 h-0.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-300" />
          </Reveal>

          {/* 2-column feature list */}
          <div className="grid sm:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-10 sm:gap-y-12 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <ValCard key={i} icon={v.icon} title={v.title} desc={v.desc} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>


      {/* ─── ⑤ MILESTONES — animated timeline ───────────── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-1.5 mb-5">
              <TrendingUp className="h-3.5 w-3.5 text-gold-400" />
              <span className="text-xs font-bold text-gold-300 tracking-[0.12em] uppercase">{t("msBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">{t("msTitle")}</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">{t("msSubtitle")}</p>
          </Reveal>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/10 via-gold-400/40 to-gold-400/10" />

            <div className="space-y-8 sm:space-y-0">
              {milestones.map((ms, i) => (
                <Reveal key={i} delay={i * 100} dir={i % 2 === 0 ? "left" : "right"}>
                  <div className={`sm:grid sm:grid-cols-2 sm:gap-8 items-center ${i % 2 !== 0 ? "sm:[&>*:first-child]:col-start-2 sm:[&>*:last-child]:col-start-1 sm:[&>*:last-child]:row-start-1" : ""}`}>
                    {/* Year bubble */}
                    <div className={`flex ${i % 2 === 0 ? "sm:justify-end" : "sm:justify-start"} justify-start mb-4 sm:mb-0`}>
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                          <span className="text-lg font-black text-navy-900">{ms.year}</span>
                        </div>
                        {/* Connector dot — center line */}
                        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-400 shadow-gold"
                          style={{ [i % 2 === 0 ? "right" : "left"]: "-2.25rem" }}
                        />
                      </div>
                    </div>
                    {/* Content */}
                    <div className={`bg-white/6 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-gold-400/20 rounded-2xl px-6 py-5 transition-all duration-400 ${i % 2 === 0 ? "sm:text-left" : "sm:text-right"}`}>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">{ms.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{ms.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ⑦ TRUST STRIP ──────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-slate-50 border-y border-slate-100">
        <div className="container px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-7">
            <p className="text-xs font-black text-slate-600 uppercase tracking-[0.18em]">{t("trustBadge")}</p>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield, text: t("trust1") },
              { icon: Award, text: t("trust2") },
              { icon: CheckCircle, text: t("trust3") },
              { icon: Star, text: t("trust4") },
              { icon: MapPin, text: t("trust5") },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="flex items-center gap-2.5 text-sm text-navy-700 font-semibold">
                  <item.icon className="h-4 w-4 text-gold-500 flex-shrink-0" />
                  {item.text}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ⑧ CTA ────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 relative overflow-hidden bg-[#f8f6ef]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_55%)]" />
        <div className="absolute -top-24 right-0 w-80 h-80 bg-gold-400/12 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-0 w-80 h-80 bg-navy-900/5 rounded-full blur-3xl" />

        <div className="container relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gold-200 px-4 py-1.5 shadow-sm mb-6">
                  <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                  <span className="text-xs font-bold text-gold-700 tracking-[0.12em] uppercase">{t("ctaBadge")}</span>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-900 mb-5 leading-tight tracking-tight">
                  {t("ctaTitle")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-base sm:text-lg text-slate-600 mx-auto lg:mx-0 leading-relaxed max-w-xl">
                  {t("ctaSubtitle")}
                </p>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {ctaHighlights.map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 border border-gold-200 text-gold-600 transition-all duration-300 group-hover:bg-gold-400 group-hover:text-navy-900 group-hover:shadow-gold">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-navy-900">{item.text}</span>
                      <span className="ml-auto h-2.5 w-2.5 rounded-full bg-gold-400/60 motion-safe:animate-pulse" />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="w-full">
              <div className="group relative w-full rounded-3xl bg-white/90 border border-slate-200/80 shadow-[0_18px_45px_rgba(15,23,42,0.12)] p-8 sm:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.16)]">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-white to-white opacity-90" />
                <div className="absolute -top-20 -right-16 w-52 h-52 bg-gold-400/12 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-navy-900/5 rounded-full blur-3xl" />
                <div className="relative flex flex-col gap-5">
                  <Link
                    href={leadFormHref}
                    className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden btn-cta-glow"
                  >
                    <div className="absolute inset-0 bg-gradient-gold" />
                    <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-40" />
                    <span className="relative text-navy-900 text-lg">{t("ctaBtn")}</span>
                    <ArrowRight className="relative h-5 w-5 text-navy-900 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={COMPANY.phoneHref}
                    className="group w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-navy-900 text-white font-semibold text-base transition-all hover:bg-navy-800"
                  >
                    <Phone className="h-4 w-4 text-gold-400" />
                    {COMPANY.phoneDisplayIntl}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
