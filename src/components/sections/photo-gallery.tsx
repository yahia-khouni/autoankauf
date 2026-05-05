"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  SearchCheck,
  BadgeDollarSign,
  CalendarCheck,
  Car,
  Banknote,
  FileText,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

// ─── Slide data ──────────────────────────────────────────────────────────────

type Slide = {
  id: number;
  step: string;
  icon: typeof ClipboardList;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  gradient: string;
  accentGradient: string;
  glowColor: string;
  pattern: "circles" | "grid" | "dots" | "lines";
};

type SlideMeta = Omit<Slide, "title" | "subtitle" | "description" | "imageAlt">;

const slideMeta: SlideMeta[] = [
  {
    id: 1,
    step: "01",
    icon: ClipboardList,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-navy-950 via-navy-900 to-navy-800",
    accentGradient: "from-gold-400 to-gold-300",
    glowColor: "rgba(251,191,36,0.18)",
    pattern: "circles",
  },
  {
    id: 2,
    step: "02",
    icon: SearchCheck,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#0f2235] via-[#1a3a5c] to-[#243b53]",
    accentGradient: "from-gold-500 to-gold-400",
    glowColor: "rgba(212,175,55,0.15)",
    pattern: "grid",
  },
  {
    id: 3,
    step: "03",
    icon: BadgeDollarSign,
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#102a43] via-[#1e3a4f] to-[#2d5016]",
    accentGradient: "from-green-400 to-gold-400",
    glowColor: "rgba(74,222,128,0.12)",
    pattern: "dots",
  },
  {
    id: 4,
    step: "04",
    icon: CalendarCheck,
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#1a0a2e] via-[#16213e] to-[#0f3460]",
    accentGradient: "from-purple-400 to-gold-400",
    glowColor: "rgba(167,139,250,0.12)",
    pattern: "lines",
  },
  {
    id: 5,
    step: "05",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#0d1f2d] via-[#1a2f42] to-[#243b53]",
    accentGradient: "from-gold-300 to-gold-500",
    glowColor: "rgba(251,191,36,0.20)",
    pattern: "circles",
  },
  {
    id: 6,
    step: "06",
    icon: Banknote,
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#0a2218] via-[#0f3527] to-[#1a4733]",
    accentGradient: "from-green-300 to-gold-400",
    glowColor: "rgba(74,222,128,0.18)",
    pattern: "grid",
  },
  {
    id: 7,
    step: "07",
    icon: FileText,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#0b1f2a] via-[#133044] to-[#1b4258]",
    accentGradient: "from-gold-400 to-gold-300",
    glowColor: "rgba(251,191,36,0.16)",
    pattern: "lines",
  },
  {
    id: 8,
    step: "08",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#0a1b2a] via-[#102c3f] to-[#1b3d52]",
    accentGradient: "from-gold-400 to-gold-500",
    glowColor: "rgba(212,175,55,0.14)",
    pattern: "grid",
  },
  {
    id: 9,
    step: "09",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-[#121a24] via-[#1b2a3b] to-[#233446]",
    accentGradient: "from-green-300 to-gold-400",
    glowColor: "rgba(74,222,128,0.14)",
    pattern: "dots",
  },
];

function buildSlides(t: ReturnType<typeof useTranslations>): Slide[] {
  return slideMeta.map((slide, index) => ({
    ...slide,
    title: t(`card${index + 1}Title`),
    subtitle: t(`card${index + 1}Subtitle`),
    description: t(`card${index + 1}Description`),
    imageAlt: t(`card${index + 1}Alt`),
  }));
}

// ─── SVG Background Patterns ─────────────────────────────────────────────────

function PatternCircles() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pc" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="20" fill="none" stroke="#fbbf24" strokeWidth="1" />
          <circle cx="30" cy="30" r="10" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pc)" />
    </svg>
  );
}

function PatternGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fbbf24" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg)" />
    </svg>
  );
}

function PatternDots() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pd" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.5" fill="#fbbf24" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pd)" />
    </svg>
  );
}

function PatternLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pl" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="0" y1="30" x2="30" y2="0" stroke="#fbbf24" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pl)" />
    </svg>
  );
}

// ─── Single Slide Card ────────────────────────────────────────────────────────

function SlideCard({ slide, stepLabel }: { slide: Slide; stepLabel: string }) {
  const Icon = slide.icon;

  const PatternEl =
    slide.pattern === "circles"
      ? PatternCircles
      : slide.pattern === "grid"
      ? PatternGrid
      : slide.pattern === "dots"
      ? PatternDots
      : PatternLines;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slide.gradient} h-[380px] sm:h-[400px] flex flex-col justify-between p-6 sm:p-8 group transition-transform duration-500 hover:-translate-y-1 border border-white/10`}
      style={{ boxShadow: `0 20px 60px -10px ${slide.glowColor}, 0 8px 24px rgba(0,0,0,0.4)` }}
    >
      {/* Context image */}
      {slide.image ? (
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="h-full w-full object-cover opacity-35"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/15 to-transparent" />
        </div>
      ) : null}

      {/* Pattern */}
      <PatternEl />

      {/* Glow orb */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-70"
        style={{ background: slide.glowColor ? `radial-gradient(circle, ${slide.glowColor} 0%, transparent 70%)` : undefined }}
      />

      {/* Step number — watermark */}
      <div className="absolute bottom-4 right-5 text-[100px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
        {slide.step}
      </div>

      {/* Top: step badge + icon */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Step badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 backdrop-blur-sm px-3 py-1.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${slide.accentGradient}`} />
          <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.14em]">
            {stepLabel} {slide.step}
          </span>
        </div>

        {/* Icon container */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Icon className="h-6 w-6 text-gold-300" />
        </div>
      </div>

      {/* Bottom: title, subtitle, description */}
      <div className="relative z-10 space-y-3">
        {/* Accent line */}
        <div className={`h-0.5 w-10 rounded-full bg-gradient-to-r ${slide.accentGradient}`} />

        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.12em] mb-1">
            {slide.subtitle}
          </p>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
            {slide.title}
          </h3>
        </div>

        <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed">
          {slide.description}
        </p>
      </div>
    </div>
  );
}

// ─── Main Gallery Section ────────────────────────────────────────────────────

const SLIDES_PER_PAGE_DESKTOP = 3;
const SLIDES_PER_PAGE_MOBILE = 1;

export function PhotoGallerySection() {
  const t = useTranslations("gallery");
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = buildSlides(t);
  const stepLabel = t("stepLabel");

  const totalDesktopPages = Math.ceil(slides.length / SLIDES_PER_PAGE_DESKTOP);
  const totalMobilePages = slides.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalDesktopPages) % totalDesktopPages);
  }, [totalDesktopPages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalDesktopPages);
  }, [totalDesktopPages]);

  // Desktop: which 3 slides to show
  const desktopSlices = slides.slice(
    currentIndex * SLIDES_PER_PAGE_DESKTOP,
    currentIndex * SLIDES_PER_PAGE_DESKTOP + SLIDES_PER_PAGE_DESKTOP
  );

  // Mobile: show 1 slide at a time, reuse currentIndex as slide index (clamped)
  const mobileIndex = currentIndex % totalMobilePages;
  const handleMobilePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalMobilePages) % totalMobilePages);
  }, [totalMobilePages]);
  const handleMobileNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalMobilePages);
  }, [totalMobilePages]);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-gradient-to-b from-navy-950/[0.03] to-transparent rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -right-20 w-[35rem] h-[35rem] bg-gold-400/[0.04] rounded-full blur-[100px]" />
        <div className="absolute top-40 -left-20 w-[28rem] h-[28rem] bg-navy-900/[0.04] rounded-full blur-[80px]" />
      </div>

      <div className="container relative px-4 sm:px-6 z-10">
        {/* ── Header ── */}
        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
            {/* Left: title block */}
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-navy-500 mb-3">
                <span className="h-px w-8 bg-navy-200" />
                {t("kicker")}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-navy-950 border border-navy-800 px-4 py-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-xs font-bold text-gold-400 uppercase tracking-[0.16em]">
                  {t("badge")}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-navy-900 leading-[1.15] mb-4">
                {t("titleLead")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                    {t("titleAccent")}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-gold-400 to-gold-300 opacity-60" />
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            {/* Right: desktop nav controls */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* Page indicators */}
              <div className="flex gap-1.5 mr-2">
                {Array.from({ length: totalDesktopPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={t("pageLabel", { page: i + 1 })}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "w-6 bg-gold-500"
                        : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <button
                type="button"
                aria-label={t("navPrev")}
                onClick={handlePrev}
                className="h-11 w-11 rounded-full border-2 border-slate-200 bg-white text-navy-700 hover:bg-navy-900 hover:text-gold-300 hover:border-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-gold"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={t("navNext")}
                onClick={handleNext}
                className="h-11 w-11 rounded-full border-2 border-slate-200 bg-white text-navy-700 hover:bg-navy-900 hover:text-gold-300 hover:border-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-gold"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── Desktop Carousel (3 per page) ── */}
        <div className="hidden sm:block">
          <AnimateOnScroll delay={80}>
            <div
              className="grid grid-cols-3 gap-5 lg:gap-6"
              key={currentIndex}
              style={{
                animation: "galleryFadeIn 0.45s cubic-bezier(0.16,1,0.3,1) both",
              }}
            >
              {desktopSlices.map((slide) => (
                <SlideCard key={slide.id} slide={slide} stepLabel={stepLabel} />
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* ── Mobile Carousel (1 per page) ── */}
        <div className="sm:hidden">
          <div
            key={mobileIndex}
            style={{
              animation: "galleryFadeIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <SlideCard slide={slides[mobileIndex]} stepLabel={stepLabel} />
          </div>

          {/* Mobile nav */}
          <div className="flex items-center justify-between mt-5">
            <button
              type="button"
              aria-label={t("navPrevShort")}
              onClick={handleMobilePrev}
              className="h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-navy-700 hover:bg-navy-900 hover:text-gold-300 hover:border-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={t("imageLabel", { index: i + 1 })}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === mobileIndex
                      ? "w-5 bg-gold-500"
                      : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label={t("navNextShort")}
              onClick={handleMobileNext}
              className="h-10 w-10 rounded-full border-2 border-slate-200 bg-white text-navy-700 hover:bg-navy-900 hover:text-gold-300 hover:border-navy-800 transition-all duration-300 flex items-center justify-center shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}