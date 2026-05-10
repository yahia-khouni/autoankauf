"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { FaqContactCard } from "@/components/sections/faq-contact-card";
import {
  Search, Clock, Calendar, ArrowRight, BookOpen,
  ChevronDown, ChevronUp, Car, Euro, FileText, HelpCircle,
  TrendingUp, Shield, CheckCircle, Star, Phone,
  Sparkles, Filter, X, AlertCircle,
  Wrench, Users, List, BookMarked, Tag,
  Lightbulb, Info,
} from "lucide-react";
import { COMPANY } from "@/lib/company";
import { type Locale } from "@/lib/i18n";
import { blogPosts, type BlogPost } from "@/data/blog-posts";

/* ════════════════════════════════════════════════════════════
   REVEAL — intersection-observer fade + slide
   ════════════════════════════════════════════════════════════ */
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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    o.observe(el); return () => o.disconnect();
  }, []);
  const t0: Record<string, string> = {
    up: "translateY(24px)", left: "translateX(-24px)", right: "translateX(24px)", none: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : t0[dir],
      transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

const BLOG_POSTS: BlogPost[] = blogPosts;

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  catTips: TrendingUp,
  catKnowledge: BookMarked,
  catChecklist: List,
  catSpecial: Star,
  catGuide: BookOpen,
};

/* ════════════════════════════════════════════════════════════
   INLINE ARTICLE CONTENT (expands inside the card, no scroll)
   ════════════════════════════════════════════════════════════ */
function ArticleInlineContent({
  post, locale, t, isOpen, leadFormHref, articleHref,
}: {
  post: BlogPost;
  locale: Locale;
  t: (k: string) => string;
  isOpen: boolean;
  leadFormHref: string;
  articleHref: string;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure real height so we can animate max-height accurately
  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "de" ? "de-DE" : locale === "fr" ? "fr-FR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div
      aria-hidden={!isOpen}
      style={{
        height,
        overflow: "hidden",
        transition: "height .55s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div ref={bodyRef}>
        {/* Divider */}
        <div className="mx-5 border-t border-gold-100" />

        {/* Dark header band */}
        <div className="relative overflow-hidden px-5 sm:px-6 py-5 gradient-premium">
          <div className="absolute inset-0 bg-hero-pattern opacity-15" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              {(() => { const CatIcon = CATEGORY_ICONS[post.categoryKey] || Tag; return <CatIcon className="h-3.5 w-3.5 text-gold-400" />; })()}
              <span className="text-[10px] font-bold text-gold-300 uppercase tracking-wider">{t(post.categoryKey)}</span>
              <span className="text-white/20 mx-1">·</span>
              <div className="flex items-center gap-1 text-[10px] text-white/40">
                <Calendar className="h-3 w-3" />{formattedDate}
              </div>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white leading-snug mb-1.5">{post.titles[locale]}</h2>
            <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed">{post.excerpts[locale]}</p>
          </div>
        </div>

        {/* Key points */}
        <div className="bg-gold-50/60 border-b border-gold-100/60 px-5 sm:px-6 py-3">
          <p className="text-[10px] font-black text-gold-700 uppercase tracking-widest mb-2">{t("keyPoints")}</p>
          <div className="flex flex-wrap gap-1.5">
            {post.keyPoints[locale].map((kp, i) => (
              <div key={i} className="flex items-center gap-1 bg-white border border-gold-200 rounded-full px-2.5 py-0.5">
                <CheckCircle className="h-2.5 w-2.5 text-gold-500 flex-shrink-0" />
                <span className="text-[10px] font-semibold text-navy-800">{kp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article sections */}
        <div className="px-5 sm:px-6 py-5 space-y-5">
          {post.fullContent.map((section, i) => (
            <div key={i}>
              <h3 className="text-sm sm:text-base font-bold text-navy-900 mb-2 leading-snug">
                {section.heading[locale]}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-2">
                {section.body[locale]}
              </p>
              {section.tip && (
                <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">{section.tip[locale]}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mx-5 sm:mx-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-navy-900 mb-0.5">{t("articleCtaTitle")}</p>
            <p className="text-[11px] text-slate-500">{t("articleCtaDesc")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={articleHref}
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-navy-900 text-xs font-bold hover:border-gold-300 hover:text-gold-700 transition-colors flex-shrink-0"
            >
              {t("readMore")}
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={leadFormHref}
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors flex-shrink-0"
            >
              {t("articleCtaBtn")}
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   BLOG CARD — expands in-place, no scrolling
   ════════════════════════════════════════════════════════════ */
function BlogCard({
  post, locale, t, delay, isExpanded, onExpand, leadFormHref, articleHref,
}: {
  post: BlogPost; locale: Locale; t: (key: string) => string;
  delay: number; isExpanded: boolean; onExpand: () => void; leadFormHref: string; articleHref: string;
}) {
  const Icon = post.icon;
  const CategoryIcon = CATEGORY_ICONS[post.categoryKey] || Tag;
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "de" ? "de-DE" : locale === "fr" ? "fr-FR" : "en-GB"
  );

  return (
    <Reveal delay={delay}>
      {/* Outer wrapper: no h-full, lets the card grow naturally in the grid cell */}
      <div
        className={`group relative flex flex-col w-full text-left bg-white border rounded-3xl overflow-hidden transition-all duration-500
          ${isExpanded
            ? "border-gold-400/70 shadow-[0_0_0_3px_rgba(251,191,36,0.15),0_12px_40px_rgba(10,42,67,0.14)]"
            : "border-slate-100 hover:border-gold-200/60 hover:shadow-[0_6px_28px_rgba(10,42,67,0.10)]"
          }`}
      >
        {/* ── Clickable summary header ── */}
        <button
          onClick={onExpand}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-t-3xl"
          aria-expanded={isExpanded}
        >
          {/* Image area */}
          <div className="relative flex items-center justify-center h-36 sm:h-40 overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 gradient-premium" />
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/8 via-transparent to-transparent" />
            <div className={`relative z-10 w-12 h-12 rounded-xl border border-white/15 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isExpanded ? "bg-gold-400/30" : "bg-white/10 group-hover:bg-white/15"}`}>
              <Icon className="h-6 w-6 text-gold-400" />
            </div>
            {post.featured && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-gold-400 px-2.5 py-0.5">
                <Sparkles className="h-2.5 w-2.5 text-navy-900" />
                <span className="text-[9px] font-black text-navy-900 uppercase tracking-wider">{t("featured")}</span>
              </div>
            )}
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md px-2 py-0.5">
              <CategoryIcon className="h-2.5 w-2.5 text-gold-300" />
              <span className="text-[9px] font-bold text-white/90 uppercase tracking-wide">{t(post.categoryKey)}</span>
            </div>
            {/* Expand indicator */}
            <div className={`absolute bottom-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? "bg-gold-400 text-navy-900" : "bg-white/10 text-white/50 group-hover:bg-white/20"}`}>
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </div>
          </div>

          {/* Card summary text */}
          <div className="flex flex-col p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Calendar className="h-3 w-3" />{formattedDate}
              </span>
              <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="h-3 w-3" />{post.readTime} {t("minRead")}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-navy-900 leading-snug mb-2 group-hover:text-navy-700 transition-colors line-clamp-2">
              {post.titles[locale]}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
              {post.excerpts[locale]}
            </p>

            <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${isExpanded ? "text-gold-500" : "text-gold-600 group-hover:text-gold-500"}`}>
              {isExpanded ? t("closeArticle") : t("readMore")}
              <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
            </div>
          </div>
        </button>

        <div className="px-5 pb-4">
          <Link
            href={articleHref}
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-navy-700 hover:text-gold-600 transition-colors"
          >
            {t("readMore")}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Inline expanding content — NO scroll, grows the card ── */}
        <ArticleInlineContent
          post={post}
          locale={locale}
          t={t}
          isOpen={isExpanded}
          leadFormHref={leadFormHref}
          articleHref={articleHref}
        />
      </div>
    </Reveal>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════ */
export default function BlogPage() {
  const t = useTranslations("blogPage");
  const locale = useLocale() as Locale;
  const leadFormHref = locale === "de" ? "/#lead-form" : `/${locale}/#lead-form`;
  const getBlogArticleHref = (slug: string) => locale === "de" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { key: "all", labelKey: "all" },
    { key: "catTips", labelKey: "catTips" },
    { key: "catKnowledge", labelKey: "catKnowledge" },
    { key: "catChecklist", labelKey: "catChecklist" },
    { key: "catSpecial", labelKey: "catSpecial" },
    { key: "catGuide", labelKey: "catGuide" },
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchCat = activeCategory === "all" || post.categoryKey === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q
      || post.titles[locale].toLowerCase().includes(q)
      || post.excerpts[locale].toLowerCase().includes(q)
      || t(post.categoryKey).toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleExpand = useCallback((slug: string) => {
    setExpandedSlug(prev => prev === slug ? null : slug);
  }, []);

  const faqItems = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
  ];

  const topicsGrid = [
    { icon: Car, titleKey: "topic1Title", descKey: "topic1Desc" },
    { icon: Euro, titleKey: "topic2Title", descKey: "topic2Desc" },
    { icon: FileText, titleKey: "topic3Title", descKey: "topic3Desc" },
    { icon: Wrench, titleKey: "topic4Title", descKey: "topic4Desc" },
    { icon: Shield, titleKey: "topic5Title", descKey: "topic5Desc" },
    { icon: Users, titleKey: "topic6Title", descKey: "topic6Desc" },
  ];

  /* ── Simple flat render — each card expands in-place ── */
  function renderArticleGrid() {
    return filteredPosts.map((post, i) => (
      <BlogCard
        key={post.slug}
        post={post}
        locale={locale}
        t={t}
        delay={i * 45}
        isExpanded={expandedSlug === post.slug}
        onExpand={() => handleExpand(post.slug)}
        leadFormHref={leadFormHref}
        articleHref={getBlogArticleHref(post.slug)}
      />
    ));
  }

  return (
    <div className="antialiased">

      {/* ─── ① HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex items-center pt-28 pb-24 sm:pt-36 sm:pb-32">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gold-500/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -top-10 right-0 w-80 h-80 bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-5 py-2 backdrop-blur-sm mb-7">
                <BookOpen className="h-4 w-4 text-gold-400" />
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

            {/* Search bar */}
            <Reveal delay={200}>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  id="blog-search"
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-slate-400 text-base focus:outline-none focus:border-gold-400/60 focus:bg-white/15 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {[
                  { val: `${BLOG_POSTS.length}+`, label: t("statArticles") },
                  { val: "5", label: t("statCategories") },
                  { val: "100%", label: t("statFree") },
                ].map((s, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-gold-gradient">{s.val}</span>
                    <span className="text-xs sm:text-sm text-slate-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Single smooth sinusoidal wave ── */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-16 md:h-20 block"
          >
            <path
              d="M0,80 L0,58 C400,2 1040,78 1440,42 L1440,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ─── ② SIMPLE EXPLAINER — plain-language for all users ── */}
      <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-gold-400/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 px-4 sm:px-6 max-w-5xl mx-auto">
          <Reveal delay={0} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-50 border border-gold-200 px-4 py-1.5 mb-5">
              <Info className="h-3.5 w-3.5 text-gold-600" />
              <span className="text-xs font-black text-gold-700 uppercase tracking-[0.12em]">{t("explainerBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-4">{t("explainerTitle")}</h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">{t("explainerSubtitle")}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Car, num: "1", titleKey: "exp1Title", descKey: "exp1Desc" },
              { icon: Euro, num: "2", titleKey: "exp2Title", descKey: "exp2Desc" },
              { icon: CheckCircle, num: "3", titleKey: "exp3Title", descKey: "exp3Desc" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group relative flex flex-col items-start gap-4 p-6 sm:p-7 rounded-3xl border border-slate-100 bg-white hover:border-gold-200/60 hover:shadow-[0_6px_24px_rgba(10,42,67,0.08)] transition-all duration-400">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center shadow-[0_6px_20px_rgba(10,42,67,0.2)]">
                      <item.icon className="h-6 w-6 text-gold-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-400 text-navy-900 text-[11px] font-black flex items-center justify-center shadow-sm">
                      {item.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-2">{t(item.titleKey)}</h3>
                    <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* "Did You Know" strip */}
          <Reveal delay={200} className="mt-8">
            <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">{t("didYouKnowTitle")}</p>
                <p className="text-sm text-amber-800 leading-relaxed">{t("didYouKnow")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ③ TOPIC KNOWLEDGE GRID ─────────────────────── */}
      <section className="py-14 sm:py-20 bg-slate-50/60 relative overflow-hidden">
        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-sm px-4 py-1.5 mb-5">
              <BookOpen className="h-3.5 w-3.5 text-gold-500" />
              <span className="text-xs font-black text-navy-700 uppercase tracking-[0.12em]">{t("topicsBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-4">{t("topicsTitle")}</h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">{t("topicsSubtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {topicsGrid.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <Reveal key={i} delay={i * 50}>
                  <div className="group flex items-start gap-4 p-5 rounded-2xl border border-white bg-white hover:border-gold-200/60 hover:shadow-[0_4px_20px_rgba(10,42,67,0.08)] transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200/60 flex items-center justify-center group-hover:bg-gold-400 group-hover:border-gold-400 transition-all duration-300">
                      <Icon className="h-4.5 w-4.5 text-gold-600 group-hover:text-navy-900 transition-colors duration-300" style={{ height: "18px", width: "18px" }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-900 mb-1">{t(topic.titleKey)}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{t(topic.descKey)}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ④ ARTICLE GRID ─────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
        <div className="container relative z-10 px-4 sm:px-6">

          {/* Filter header */}
          <Reveal delay={0} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 mb-3">
                  <Filter className="h-3.5 w-3.5 text-gold-500" />
                  <span className="text-xs font-black text-navy-700 uppercase tracking-[0.12em]">{t("filterBadge")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">{t("filterTitle")}</h2>
              </div>
              <p className="text-sm text-slate-400 pb-1">
                {filteredPosts.length} {t("filterResults")}
              </p>
            </div>
          </Reveal>

          {/* Category chips */}
          <Reveal delay={40} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const CatIcon = cat.key !== "all" ? CATEGORY_ICONS[cat.key] : null;
                return (
                  <button
                    key={cat.key}
                    id={`filter-${cat.key}`}
                    onClick={() => { setActiveCategory(cat.key); setExpandedSlug(null); }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-250 ${activeCategory === cat.key
                        ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-gold-300 hover:text-navy-700"
                      }`}
                  >
                    {CatIcon && <CatIcon className="h-3 w-3" />}
                    {t(cat.labelKey)}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* No results */}
          {filteredPosts.length === 0 && (
            <Reveal delay={0}>
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-600 mb-2">{t("noResults")}</h3>
                <p className="text-sm text-slate-400 mb-6">{t("noResultsDesc")}</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors"
                >
                  {t("resetFilters")}
                </button>
              </div>
            </Reveal>
          )}

          {/* Article grid — uniform 3-col, expanded inline after each row */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {renderArticleGrid()}
          </div>
        </div>
      </section>

      {/* ─── ⑤ GUIDES — sell + buy ──────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50/60 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-gold-400/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 px-4 sm:px-6 max-w-5xl mx-auto">
          <Reveal delay={0} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-sm px-4 py-1.5 mb-5">
              <HelpCircle className="h-3.5 w-3.5 text-gold-500" />
              <span className="text-xs font-black text-navy-700 uppercase tracking-[0.12em]">{t("guidesBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight mb-4">{t("guidesTitle")}</h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">{t("guidesSubtitle")}</p>
          </Reveal>

          <Reveal delay={0} dir="left">
            <div className="relative rounded-3xl overflow-hidden mb-6">
              <div className="absolute inset-0 gradient-premium" />
              <div className="absolute inset-0 bg-hero-pattern opacity-20" />
              <div className="relative z-10 p-7 sm:p-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 border border-gold-400/25 px-3 py-1 mb-5">
                    <Car className="h-3.5 w-3.5 text-gold-400" />
                    <span className="text-xs font-black text-gold-300 uppercase tracking-wider">{t("sellGuideTag")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">{t("sellGuideTitle")}</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">{t("sellGuideText")}</p>
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {[t("sellStep1"), t("sellStep2"), t("sellStep3"), t("sellStep4")].map((step, i) => (
                      <div key={i} className="flex items-start gap-2 bg-white/5 rounded-xl p-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-400 text-navy-900 flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                        <span className="text-xs text-slate-300 leading-snug pt-0.5">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={leadFormHref} className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-400 text-navy-900 text-sm font-bold hover:bg-gold-300 transition-colors shadow-gold">
                    {t("sellGuideCta")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} dir="right">
            <div className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white">
              <div className="absolute right-0 top-0 w-48 h-48 bg-gold-400/[0.06] rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 p-7 sm:p-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gold-50 border border-gold-200 px-3 py-1 mb-5">
                    <TrendingUp className="h-3.5 w-3.5 text-gold-600" />
                    <span className="text-xs font-black text-gold-700 uppercase tracking-wider">{t("buyGuideTag")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3 leading-snug">{t("buyGuideTitle")}</h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">{t("buyGuideText")}</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[t("buyTip1"), t("buyTip2"), t("buyTip3"), t("buyTip4")].map((tip, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0" />
                        <span className="text-sm text-navy-700 font-medium">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ⑥ FAQ — same layout as homepage FAQSection ───────────────── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-50 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-400/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-navy-900/5 rounded-full blur-[80px]" />
        </div>

        <div className="container relative px-4 sm:px-6 z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start lg:h-max">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-navy-100 px-4 py-2 mb-6">
                  <HelpCircle className="h-4 w-4 text-gold-500" />
                  <span className="text-sm font-bold text-navy-800 tracking-wide uppercase">{t("faqBadge")}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 text-navy-900 leading-tight">{t("faqTitle")}</h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t("faqSubtitle")}</p>
              </div>

              <FaqContactCard
                title={t("faqContactTitle")}
                description={t("faqContactDesc")}
                ctaLabel={t("faqCall")}
                phoneDisplay={COMPANY.phoneDisplayIntl}
                phoneHref={COMPANY.phoneHref}
              />
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-3xl shadow-lg border border-slate-100 overflow-hidden bg-white">
                  <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500" />
                  <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 bg-slate-50/60">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
                      {faqItems.length} Fragen &amp; Antworten
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {faqOpenIndex !== null ? `${faqOpenIndex + 1} / ${faqItems.length}` : "Klicken zum öffnen"}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {faqItems.map((item, i) => {
                      const isOpen = faqOpenIndex === i;
                      return (
                        <div key={i} className={`transition-colors duration-300 ${isOpen ? "bg-gold-50/30" : "bg-white hover:bg-slate-50/50"}`}>
                          <button
                            type="button"
                            onClick={() => setFaqOpenIndex(faqOpenIndex === i ? null : i)}
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
                              {item.q}
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
                                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{item.a}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ⑦ TRUST STRIP ──────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-white border-y border-slate-100">
        <div className="container px-4 sm:px-6">
          <Reveal delay={0} className="text-center mb-7">
            <p className="text-sm font-black text-navy-800/60 uppercase tracking-[0.16em]">{t("trustBadge")}</p>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield, text: t("trust1") },
              { icon: Star, text: t("trust2") },
              { icon: CheckCircle, text: t("trust3") },
              { icon: Clock, text: t("trust4") },
              { icon: Users, text: t("trust5") },
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

      {/* ─── ⑧ CTA ───────────────────────────────────────── */}
      <section className="py-16 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 bg-hero-pattern opacity-25" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-16 w-56 h-56 bg-gold-400/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 left-12 w-64 h-64 bg-gold-400/8 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 max-w-3xl mx-auto text-center">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-1.5 mb-7">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              <span className="text-xs font-bold text-gold-300 tracking-[0.12em] uppercase">{t("ctaBadge")}</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">{t("ctaTitle")}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-base sm:text-xl text-slate-300 mx-auto mb-10 leading-relaxed max-w-xl">{t("ctaSubtitle")}</p>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={leadFormHref} id="blog-cta-btn"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-base overflow-hidden btn-cta-glow">
                <div className="absolute inset-0 bg-gradient-gold" />
                <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-40" />
                <span className="relative text-navy-900 text-lg">{t("ctaBtn")}</span>
                <ArrowRight className="relative h-5 w-5 text-navy-900 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={COMPANY.phoneHref}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white font-semibold text-base transition-all backdrop-blur-sm">
                <Phone className="h-4 w-4 text-gold-400" />{COMPANY.phoneDisplayIntl}
              </a>
            </div>
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
