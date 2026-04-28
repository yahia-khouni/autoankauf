"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

type TestimonialItem = {
  name: string;
  location: string;
  car: string;
  rating: number;
  year?: number;
  text: string;
  verified: boolean;
};

type RawTestimonial = {
  name?: string;
  location?: string;
  car?: string;
  rating?: number;
  year?: number;
  text?: string;
  verified?: boolean;
};

const COMPANY_FOUNDING_YEAR = 2013;

function normalizeReviewYear(year: number | undefined): number | undefined {
  if (typeof year !== "number" || !Number.isFinite(year)) return undefined;
  const currentYear = new Date().getFullYear();
  const singleYear = Math.round(year);
  return Math.min(currentYear, Math.max(COMPANY_FOUNDING_YEAR, singleYear));
}

export function TestimonialsSection({
  title,
  badge,
  testimonials: propTestimonials,
}: {
  title?: string;
  badge?: string;
  testimonials?: TestimonialItem[];
} = {}) {
  const t = useTranslations("testimonials");

  const fallbackTestimonials: TestimonialItem[] = [
    {
      name: "Thomas M.",
      location: "Munich",
      car: "BMW 3 Series, 2019",
      rating: 5,
      year: 2019,
      text: "Super fast processing and fair communication.",
      verified: true,
    },
    {
      name: "Sarah K.",
      location: "Berlin",
      car: "VW Golf, 2018",
      rating: 4,
      year: 2018,
      text: "Fair offer and a smooth pickup process.",
      verified: true,
    },
    {
      name: "Michael W.",
      location: "Hamburg",
      car: "Audi A4, 2020",
      rating: 5,
      year: 2020,
      text: "Better offer than local dealers.",
      verified: true,
    },
  ];

  const rawReviews = t.raw("reviews");
  const defaultTestimonials: TestimonialItem[] = Array.isArray(rawReviews)
    ? rawReviews
        .filter((item): item is RawTestimonial => !!item && typeof item === "object")
        .map((item) => ({
          name: typeof item.name === "string" ? item.name : "",
          location: typeof item.location === "string" ? item.location : "",
          car: typeof item.car === "string" ? item.car : "",
          rating: typeof item.rating === "number" ? item.rating : 5,
          year: normalizeReviewYear(typeof item.year === "number" ? item.year : 2024),
          text: typeof item.text === "string" ? item.text : "",
          verified: item.verified !== false,
        }))
        .filter((item) => !!item.name && !!item.text)
    : fallbackTestimonials;

  const testimonials = (propTestimonials && propTestimonials.length > 0 ? propTestimonials : defaultTestimonials).map((item) => ({
    ...item,
    rating: Math.min(5, Math.max(1, Math.round(item.rating))),
    year: normalizeReviewYear(item.year),
  }));
  const displayTitle = title || t("title");
  const displayBadge = badge || t("badge");
  const rawAverageScore = t.raw("averageScore");
  const configuredAverageScore = typeof rawAverageScore === "number"
    ? rawAverageScore
    : typeof rawAverageScore === "string"
      ? parseFloat(rawAverageScore)
      : Number.NaN;
  const averageRating = testimonials.length
    ? testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length
    : 5;
  const displayAverageRating = Number.isFinite(configuredAverageScore)
    ? Math.min(5, Math.max(0, configuredAverageScore))
    : averageRating;
  const roundedAverage = Math.round(displayAverageRating);
  const [manualStartIndex, setManualStartIndex] = useState(0);

  const handleBrowse = (direction: "prev" | "next") => {
    if (testimonials.length <= 1) return;
    const delta = direction === "next" ? 1 : -1;
    setManualStartIndex((prev) => {
      const next = prev + delta;
      const max = testimonials.length;
      return ((next % max) + max) % max;
    });
  };

  const orderedTestimonials = testimonials.length
    ? [
        ...testimonials.slice(manualStartIndex),
        ...testimonials.slice(0, manualStartIndex),
      ]
    : testimonials;
  const allTestimonials = [...orderedTestimonials, ...orderedTestimonials];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Ambient Golden Light - More visible now */}
      <div className="absolute top-1/4 left-0 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-gold-400/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-10 w-[25rem] sm:w-[35rem] h-[25rem] sm:h-[35rem] bg-gold-500/15 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gold-100 border border-gold-200 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-600 fill-gold-500" />
            <span className="text-xs sm:text-sm font-medium text-gold-700">
              {displayBadge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-navy-900">
            {displayTitle}
          </h2>

          {/* Rating Summary - Compact on Mobile */}
          <div className="inline-flex items-center gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-8 py-3 sm:py-4 shadow-[0_4px_12px_rgba(0,0,0,0.07)] border border-slate-100">
            <div className="text-2xl sm:text-4xl font-bold text-navy-900">
              {displayAverageRating.toFixed(1)}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 sm:h-5 sm:w-5 ${i < roundedAverage ? "fill-gold-400 text-gold-400" : "text-slate-300"}`}
                  />
                ))}
              </div>
              <p className="text-[10px] sm:text-sm text-slate-500">
                {t("ratingCount")}
              </p>
            </div>
          </div>
        </div>

        {/* Browse Controls */}
        <div className="flex items-center justify-center sm:justify-end gap-2 mb-4 sm:mb-6">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => handleBrowse("prev")}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-slate-200 bg-white text-navy-700 hover:bg-navy-900 hover:text-gold-300 hover:border-navy-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={testimonials.length <= 1}
          >
            <ChevronLeft className="h-5 w-5 mx-auto" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => handleBrowse("next")}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-slate-200 bg-white text-navy-700 hover:bg-navy-900 hover:text-gold-300 hover:border-navy-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={testimonials.length <= 1}
          >
            <ChevronRight className="h-5 w-5 mx-auto" />
          </button>
        </div>

        {/* Desktop: Infinite Marquee */}
        <div className="hidden sm:block overflow-hidden w-full">
          <div className="flex gap-6 animate-marquee testimonials-track cursor-default">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card flex-shrink-0 w-[340px]"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Animated Marquee */}
        <div className="sm:hidden overflow-hidden w-full -mx-4 px-4 pb-4">
          <div className="flex gap-4 animate-marquee testimonials-track cursor-default" style={{ animationDuration: '20s' }}>
            {allTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] max-w-[320px] testimonial-card"
              >
                <TestimonialCard testimonial={testimonial} compact />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-1.5 sm:gap-2">
            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-500" />
            {t("verified")}
          </p>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: TestimonialItem;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative bg-white rounded-2xl sm:rounded-3xl ${
        compact ? "p-5" : "p-8"
      } shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.04)] border border-slate-100/80 hover:shadow-premium hover:border-gold-200 transition-all duration-500 h-full overflow-hidden`}
    >
      {/* Watermark Quote */}
      <div className="absolute top-3 right-4 text-6xl font-bold text-navy-100 leading-none select-none pointer-events-none opacity-60">
        &quot;
      </div>

      {/* Stars */}
      <div className={`flex gap-0.5 sm:gap-1 ${compact ? "mb-4" : "mb-6"}`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${compact ? "h-4 w-4" : "h-5 w-5"} ${i < testimonial.rating ? "fill-gold-400 text-gold-400" : "text-slate-300"}`}
          />
        ))}
      </div>

      {/* Quote Text — no italic */}
      <p
        className={`text-slate-700 ${
          compact
            ? "mb-4 text-sm leading-relaxed"
            : "mb-6 leading-relaxed text-lg"
        }`}
      >
        &quot;{testimonial.text}&quot;
      </p>

      {/* Author */}
      <div
        className={`flex items-center gap-3 sm:gap-4 ${
          compact ? "pt-4" : "pt-6"
        } border-t border-slate-100`}
      >
        {/* Avatar */}
        <div
          className={`${
            compact ? "w-10 h-10 text-base" : "w-14 h-14 text-xl"
          } rounded-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center font-bold text-gold-400`}
        >
          {testimonial.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <p
              className={`font-bold text-navy-900 ${compact ? "text-sm" : ""}`}
            >
              {testimonial.name}
            </p>
            {testimonial.verified && (
              <CheckCircle
                className={`${
                  compact ? "h-3.5 w-3.5" : "h-4 w-4"
                } text-gold-500 fill-gold-100`}
              />
            )}
          </div>
          <p
            className={`${compact ? "text-xs" : "text-sm"} text-slate-500 truncate`}
          >
            {testimonial.location} &bull; {testimonial.car}{testimonial.year ? ` • ${testimonial.year}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
