"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { LeadForm } from "@/components/forms/lead-form";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Loader2,
  Star,
  Shield,
  Lock,
  Users,
  Sparkles,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── reusable reveal animation ─── */
function Reveal({
  children,
  delay = 0,
  dir = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const start: Record<string, string> = {
    up: "translateY(28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : start[dir],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── General contact form (separate from LeadForm) ─── */
function GeneralContactForm() {
  const t = useTranslations("kontaktPage");
  const [fields, setFields] = useState({
    name: "", email: "", phone: "", subject: "", message: "", privacy: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string | boolean) =>
    setFields((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.subject || !fields.message || !fields.privacy) {
      setError(t("gfErrorRequired"));
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulated
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg animate-scale-in">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-2">{t("gfSuccessTitle")}</h3>
        <p className="text-slate-600">{t("gfSuccessMsg")}</p>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 transition-all hover:border-gold-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-navy-700 uppercase tracking-wide">
            {t("gfName")} *
          </label>
          <input
            type="text"
            placeholder={t("gfNamePlaceholder")}
            className={inputBase}
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-navy-700 uppercase tracking-wide">
            {t("gfEmail")} *
          </label>
          <input
            type="email"
            placeholder={t("gfEmailPlaceholder")}
            className={inputBase}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-navy-700 uppercase tracking-wide">
            {t("gfPhone")}
          </label>
          <input
            type="tel"
            placeholder={t("gfPhonePlaceholder")}
            className={inputBase}
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-navy-700 uppercase tracking-wide">
            {t("gfSubject")} *
          </label>
          <input
            type="text"
            placeholder={t("gfSubjectPlaceholder")}
            className={inputBase}
            value={fields.subject}
            onChange={(e) => update("subject", e.target.value)}
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-navy-700 uppercase tracking-wide">
          {t("gfMessage")} *
        </label>
        <textarea
          rows={5}
          placeholder={t("gfMessagePlaceholder")}
          className={cn(inputBase, "resize-none min-h-[130px]")}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {/* Privacy */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <input
          type="checkbox"
          id="gf-privacy"
          className="mt-0.5 h-5 w-5 rounded border-2 border-slate-300 text-gold-500 focus:ring-gold-400 focus:ring-offset-0 cursor-pointer accent-amber-400"
          checked={fields.privacy}
          onChange={(e) => update("privacy", e.target.checked)}
        />
        <label htmlFor="gf-privacy" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
          {t("gfPrivacy")}
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full flex items-center justify-center gap-2 h-14 rounded-xl font-bold text-base overflow-hidden transition-all duration-300 btn-cta-glow disabled:opacity-60"
      >
        <div className="absolute inset-0 bg-gradient-gold" />
        <div className="absolute inset-0 bg-gradient-gold-shine bg-[length:200%_100%] animate-shine opacity-50" />
        {loading ? (
          <>
            <Loader2 className="relative h-5 w-5 text-navy-900 animate-spin" />
            <span className="relative text-navy-900">{t("gfSubmitting")}</span>
          </>
        ) : (
          <>
            <Send className="relative h-5 w-5 text-navy-900 group-hover:translate-x-0.5 transition-transform" />
            <span className="relative text-navy-900">{t("gfSubmit")}</span>
          </>
        )}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════ */
/*  PAGE                                                       */
/* ══════════════════════════════════════════════════════════ */
export default function KontaktPage() {
  const t = useTranslations("kontaktPage");
  const locale = useLocale();
  const mapAnimRef = useRef<HTMLDivElement>(null);
  const [mapInView, setMapInView] = useState(false);
  const getLocalizedHref = (path: string) => {
    if (locale === "de") return path;
    if (path === "/") return `/${locale}`;
    return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
  };

  useEffect(() => {
    const el = mapAnimRef.current;
    if (!el || mapInView) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mapInView]);

  const channels = [
    {
      id: "phone",
      icon: Phone,
      iconBg: "bg-navy-50 border-navy-100",
      iconColor: "text-navy-700",
      accentBar: "from-navy-700 to-navy-500",
      title: t("phoneTitle"),
      primary: t("phoneNumber"),
      secondary: t("phoneHours"),
      action: t("phoneAction"),
      href: "tel:+4912345678900",
      isExternal: false,
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      iconBg: "bg-green-50 border-green-100",
      iconColor: "text-green-600",
      accentBar: "from-green-500 to-green-400",
      title: t("waTitle"),
      primary: "+49 123 456 789 00",
      secondary: t("waDesc"),
      action: t("waAction"),
      href: "https://wa.me/4912345678900",
      isExternal: true,
    },
    {
      id: "email",
      icon: Mail,
      iconBg: "bg-gold-50 border-gold-100",
      iconColor: "text-gold-600",
      accentBar: "from-gold-500 to-gold-400",
      title: t("emailTitle"),
      primary: t("emailAddress"),
      secondary: t("emailDesc"),
      action: t("emailAction"),
      href: "mailto:info@autoankauf.de",
      isExternal: false,
    },
    {
      id: "hours",
      icon: Clock,
      iconBg: "bg-slate-50 border-slate-100",
      iconColor: "text-slate-600",
      accentBar: "from-slate-400 to-slate-300",
      title: t("hoursTitle"),
      primary: `${t("hoursMoFr")} · ${t("hoursSa")}`,
      secondary: t("hoursNote"),
      action: null,
      href: null,
      isExternal: false,
    },
  ];

  const trustItems = [
    { icon: Users, title: t("trust1Title"), desc: t("trust1Desc") },
    { icon: Star, title: t("trust2Title"), desc: t("trust2Desc") },
    { icon: Lock, title: t("trust3Title"), desc: t("trust3Desc") },
    { icon: Shield, title: t("trust4Title"), desc: t("trust4Desc") },
  ];

  const mapPoints = [
    { id: "hh", label: "Hamburg", x: 53, y: 20 },
    { id: "hb", label: "Bremen", x: 45, y: 25 },
    { id: "be", label: "Berlin", x: 71, y: 30 },
    { id: "nrw", label: "NRW", x: 36, y: 42 },
    { id: "he", label: "Hessen", x: 46, y: 52 },
    { id: "sn", label: "Sachsen", x: 67, y: 56 },
    { id: "bw", label: "Baden-W.", x: 42, y: 73 },
    { id: "by", label: "Bayern", x: 60, y: 77 },
  ];

  return (
    <div>
      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />

        {/* Soft ambient orbs only */}
        <div className="absolute bottom-16 left-10 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />


        <div className="container relative z-10 text-center px-4 sm:px-6">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-5 py-2 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-300">{t("heroBadge")}</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-5 text-shadow-lg">
              {/* split on heroHighlight */}
              {(() => {
                const full = t("heroTitle");
                const hl = t("heroHighlight");
                const idx = full.indexOf(hl);
                if (idx === -1) return <span>{full}</span>;
                return (
                  <>
                    {full.slice(0, idx)}
                    <span className="text-gold-gradient">{hl}</span>
                    {full.slice(idx + hl.length)}
                  </>
                );
              })()}
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </Reveal>

          {/* quick action pills */}
          <Reveal delay={220}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a
                href="tel:+4912345678900"
                className="inline-flex items-center gap-2 bg-gradient-gold text-navy-900 font-bold px-5 py-2.5 rounded-full text-sm shadow-gold hover:shadow-gold-lg transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="h-4 w-4" />
                {t("phoneAction")}
              </a>
              <a
                href="https://wa.me/4912345678900"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 py-2.5 rounded-full text-sm backdrop-blur-sm transition-all"
              >
                <MessageCircle className="h-4 w-4 text-green-400" />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 2. CHANNEL CARDS ─ 4-col grid ════════════════════ */}
      <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0}>
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-navy-900/10 px-4 py-2 mb-4">
                <Phone className="h-4 w-4 text-gold-500" />
                <span className="text-sm font-bold text-navy-800 tracking-wide uppercase">{t("channelsSectionBadge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-3 tracking-tight">{t("channelsSectionTitle")}</h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">{t("channelsSectionSubtitle")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            {channels.map((ch, i) => (
              <Reveal key={ch.id} delay={i * 80}>
                <div className="group relative bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-7 hover:shadow-xl hover:-translate-y-1.5 hover:border-gold-300/40 transition-all duration-500 overflow-hidden h-full flex flex-col">
                  {/* top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${ch.accentBar} opacity-80 group-hover:opacity-100 transition-opacity`} />

                  {/* icon */}
                  <div className={`w-13 h-13 w-12 h-12 flex-shrink-0 rounded-2xl border ${ch.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <ch.icon className={`h-6 w-6 ${ch.iconColor}`} />
                  </div>

                  <h3 className="text-base font-bold text-navy-900 mb-1">{ch.title}</h3>
                  <p className="text-sm font-semibold text-navy-800 mb-1">{ch.primary}</p>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{ch.secondary}</p>

                  {ch.action && ch.href && (
                    <a
                      href={ch.href}
                      {...(ch.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors group/link"
                    >
                      {ch.action}
                      <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. DUAL FORM SECTION ══════════════════════════════ */}
      <section className="py-14 sm:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        <div className="absolute top-0 -right-32 w-[40rem] h-[40rem] bg-gold-400/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[30rem] h-[30rem] bg-navy-900/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-start">

            {/* ── Left: Vehicle offer form ── */}
            <Reveal delay={0} dir="left">
              <div className="relative">
                {/* glow */}
                <div className="absolute -inset-1 bg-gradient-gold rounded-3xl blur-xl opacity-20 pointer-events-none" />
                <div className="relative bg-white rounded-3xl border border-slate-200/60 shadow-premium-lg overflow-hidden">
                  {/* decorative corner */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold-300/40 via-gold-200/15 to-transparent rounded-bl-full pointer-events-none" />

                  <div className="p-6 sm:p-8 border-b border-slate-100">
                    <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-3 py-1 mb-4">
                      <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                      <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">{t("formSectionBadge")}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">{t("formSectionTitle")}</h2>
                    <p className="text-sm sm:text-base text-slate-500">{t("formSectionSubtitle")}</p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <LeadForm />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Right: General inquiry form + info ── */}
            <div className="space-y-6">
              {/* Address + Hours info card */}
              <Reveal delay={80} dir="right">
                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                    {/* Address */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-navy-700" />
                        </div>
                        <span className="font-bold text-navy-900">{t("addressTitle")}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t("addressLine1")}<br />{t("addressLine2")}<br />{t("addressLine3")}
                      </p>
                      <Link
                        href={getLocalizedHref("/standorte")}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors"
                      >
                        <span className="inline-flex items-center gap-1 bg-gold-50 border border-gold-200 rounded-full px-2 py-0.5">
                          {t("locationsBadge")}
                        </span>
                        <ArrowRight className="h-3 w-3" />
                        {t("locationsLink")}
                      </Link>
                    </div>

                    {/* Hours */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-slate-600" />
                        </div>
                        <span className="font-bold text-navy-900">{t("hoursTitle")}</span>
                      </div>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                          {t("hoursMoFr")}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                          {t("hoursSa")}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-slate-300 flex-shrink-0" />
                          {t("hoursSo")}
                        </li>
                      </ul>
                      <p className="mt-3 text-xs text-slate-400 italic">{t("hoursNote")}</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* General inquiry form */}
              <Reveal delay={140} dir="right">
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                  <div className="p-6 sm:p-8 border-b border-slate-100">
                    <div className="inline-flex items-center gap-2 bg-navy-50 border border-navy-100 rounded-full px-3 py-1 mb-4">
                      <Send className="h-3.5 w-3.5 text-navy-600" />
                      <span className="text-xs font-bold text-navy-700 uppercase tracking-wider">{t("generalInquiryBadge")}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">{t("generalInquiryTitle")}</h2>
                    <p className="text-sm sm:text-base text-slate-500">{t("generalInquirySubtitle")}</p>
                  </div>
                  <div className="p-6 sm:p-8">
                    <GeneralContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. TRUST STRIP ════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 bg-hero-pattern opacity-25" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="container relative z-10 px-4 sm:px-6">
          <Reveal delay={0}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 mb-2">
                <Shield className="h-4 w-4 text-gold-400" />
                <span className="text-sm font-medium text-gold-300">{t("trustBadge")}</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {trustItems.map((item, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-7 hover:bg-white/10 hover:border-gold-400/20 transition-all duration-400">
                  <div className="w-12 h-12 rounded-2xl bg-gold-400/15 border border-gold-400/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6 text-gold-400" />
                  </div>
                  <p className="font-bold text-white text-sm sm:text-base mb-1">{item.title}</p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. MAP PLACEHOLDER + final CTA ═══════════════════ */}
      <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 -right-24 w-[35rem] h-[35rem] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Map placeholder — premium styled */}
            <Reveal delay={0} dir="left">
              <div
                ref={mapAnimRef}
                className={`map-circuit-wrap relative rounded-3xl overflow-hidden aspect-[4/3] shadow-premium-lg border border-slate-200/70 bg-gradient-to-br from-slate-900 via-navy-900 to-navy-950 group ${mapInView ? "is-visible" : ""}`}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/images/map.png"
                    alt="Germany map with state locations"
                    fill
                    className="object-cover scale-[1.02] sm:scale-[1.04] opacity-85 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/35 via-transparent to-navy-900/55" />
                </div>

                {/* soft route circuits */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path className="map-circuit-path path-1" d="M36 42 C 41 34, 48 28, 53 20" stroke="rgba(251,191,36,0.42)" strokeWidth="0.4" fill="none" strokeDasharray="1.4 1.2" />
                  <path className="map-circuit-path path-2" d="M53 20 C 59 22, 65 26, 71 30" stroke="rgba(251,191,36,0.34)" strokeWidth="0.35" fill="none" strokeDasharray="1.2 1.1" />
                  <path className="map-circuit-path path-3" d="M36 42 C 38 49, 42 53, 46 52" stroke="rgba(251,191,36,0.34)" strokeWidth="0.35" fill="none" strokeDasharray="1.2 1.1" />
                  <path className="map-circuit-path path-4" d="M46 52 C 53 56, 61 58, 67 56" stroke="rgba(251,191,36,0.34)" strokeWidth="0.35" fill="none" strokeDasharray="1.2 1.1" />
                  <path className="map-circuit-path path-5" d="M46 52 C 45 63, 43 69, 42 73" stroke="rgba(251,191,36,0.36)" strokeWidth="0.35" fill="none" strokeDasharray="1.2 1.1" />
                  <path className="map-circuit-path path-6" d="M46 52 C 52 63, 56 71, 60 77" stroke="rgba(251,191,36,0.4)" strokeWidth="0.4" fill="none" strokeDasharray="1.4 1.2" />
                  <path className="map-circuit-path path-7" d="M45 25 C 47 24, 50 23, 53 20" stroke="rgba(96,165,250,0.40)" strokeWidth="0.3" fill="none" strokeDasharray="1.1 1.1" />
                  <path className="map-circuit-path path-8" d="M53 20 C 56 26, 58 34, 60 44" stroke="rgba(96,165,250,0.36)" strokeWidth="0.3" fill="none" strokeDasharray="1.1 1.1" />
                  <path className="map-circuit-path path-9" d="M71 30 C 69 38, 68 47, 67 56" stroke="rgba(96,165,250,0.38)" strokeWidth="0.3" fill="none" strokeDasharray="1.1 1.1" />
                  <path className="map-circuit-path path-10" d="M36 42 C 44 43, 52 44, 60 44" stroke="rgba(96,165,250,0.34)" strokeWidth="0.28" fill="none" strokeDasharray="1 1" />
                  <path className="map-circuit-path path-11" d="M60 44 C 56 49, 51 51, 46 52" stroke="rgba(96,165,250,0.34)" strokeWidth="0.28" fill="none" strokeDasharray="1 1" />
                  <path className="map-circuit-path path-12" d="M60 44 C 62 50, 64 54, 67 56" stroke="rgba(96,165,250,0.34)" strokeWidth="0.28" fill="none" strokeDasharray="1 1" />
                  <path className="map-circuit-path path-13" d="M46 52 C 50 58, 54 64, 57 70" stroke="rgba(96,165,250,0.30)" strokeWidth="0.26" fill="none" strokeDasharray="0.9 1" />
                  <path className="map-circuit-path path-14" d="M57 70 C 58 74, 59 76, 60 77" stroke="rgba(96,165,250,0.30)" strokeWidth="0.26" fill="none" strokeDasharray="0.9 1" />
                  <path className="map-circuit-path path-15" d="M46 52 C 44 60, 43 67, 42 73" stroke="rgba(96,165,250,0.32)" strokeWidth="0.28" fill="none" strokeDasharray="1 1" />
                  <path className="map-circuit-path path-16" d="M36 42 C 33 36, 32 30, 33 24" stroke="rgba(96,165,250,0.28)" strokeWidth="0.24" fill="none" strokeDasharray="0.9 1.1" />
                </svg>

                {/* state markers */}
                {mapPoints.map((point) => (
                  <div
                    key={point.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 map-node node-${point.id}`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  >
                    <div className="relative group/point">
                      <span className="absolute inset-0 rounded-full bg-gold-300/40 blur-[3px] scale-150 node-glow" />
                      <span className="absolute inset-0 rounded-full bg-sky-300/35 blur-[4px] scale-[1.8] node-blue-glow" />
                      <span className="absolute inset-[-9px] rounded-full border border-gold-300/40 node-ring" />
                      <span className="absolute inset-[-12px] rounded-full border border-sky-300/35 node-ring-blue" />
                      <span className="relative flex h-3.5 w-3.5 rounded-full border border-gold-200/80 bg-gradient-to-br from-gold-300 via-gold-400 to-sky-300 shadow-[0_0_0_2px_rgba(15,23,42,0.55)] node-core" />
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold tracking-wide text-gold-100/90 opacity-0 group-hover/point:opacity-100 transition-opacity">
                        {point.label}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                    <p className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-1">{t("locationsBadge")}</p>
                    <p className="text-sm text-white font-medium">{t("addressLine1")}, {t("addressLine2")}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CTA text */}
            <Reveal delay={100} dir="right">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-navy-900/10 px-4 py-2">
                  <MapPin className="h-4 w-4 text-gold-500" />
                  <span className="text-sm font-bold text-navy-800 tracking-wide uppercase">{t("locationsBadge")}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
                  {t("locationsLink")}
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {t("channelsSectionSubtitle")}
                </p>

                {/* Quick contact items */}
                <div className="space-y-3">
                  {[
                    { icon: Phone, label: t("phoneNumber"), href: "tel:+4912345678900", color: "text-navy-700" },
                    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/4912345678900", color: "text-green-600" },
                    { icon: Mail, label: t("emailAddress"), href: "mailto:info@autoankauf.de", color: "text-gold-600" },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-gold-200 hover:bg-gold-50/40 hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-navy-900">{item.label}</span>
                      <ArrowRight className="h-4 w-4 text-slate-300 ml-auto group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <style jsx>{`
        .map-circuit-path {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          opacity: 0;
        }
        .map-circuit-wrap.is-visible .map-circuit-path {
          animation: drawCircuit 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .map-circuit-wrap.is-visible .path-2 { animation-delay: 120ms; }
        .map-circuit-wrap.is-visible .path-3 { animation-delay: 220ms; }
        .map-circuit-wrap.is-visible .path-4 { animation-delay: 320ms; }
        .map-circuit-wrap.is-visible .path-5 { animation-delay: 420ms; }
        .map-circuit-wrap.is-visible .path-6 { animation-delay: 520ms; }
        .map-circuit-wrap.is-visible .path-7 { animation-delay: 610ms; }
        .map-circuit-wrap.is-visible .path-8 { animation-delay: 680ms; }
        .map-circuit-wrap.is-visible .path-9 { animation-delay: 750ms; }
        .map-circuit-wrap.is-visible .path-10 { animation-delay: 820ms; }
        .map-circuit-wrap.is-visible .path-11 { animation-delay: 890ms; }
        .map-circuit-wrap.is-visible .path-12 { animation-delay: 960ms; }
        .map-circuit-wrap.is-visible .path-13 { animation-delay: 1030ms; }
        .map-circuit-wrap.is-visible .path-14 { animation-delay: 1100ms; }
        .map-circuit-wrap.is-visible .path-15 { animation-delay: 1170ms; }
        .map-circuit-wrap.is-visible .path-16 { animation-delay: 1240ms; }

        .map-node {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.45);
        }
        .map-circuit-wrap.is-visible .map-node {
          animation: popNode 460ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        }
        .map-circuit-wrap.is-visible .node-hh { animation-delay: 640ms; }
        .map-circuit-wrap.is-visible .node-hb { animation-delay: 690ms; }
        .map-circuit-wrap.is-visible .node-be { animation-delay: 740ms; }
        .map-circuit-wrap.is-visible .node-nrw { animation-delay: 790ms; }
        .map-circuit-wrap.is-visible .node-he { animation-delay: 840ms; }
        .map-circuit-wrap.is-visible .node-sn { animation-delay: 890ms; }
        .map-circuit-wrap.is-visible .node-bw { animation-delay: 940ms; }
        .map-circuit-wrap.is-visible .node-by { animation-delay: 990ms; }
        .map-circuit-wrap.is-visible .map-node .node-ring {
          animation: ringPulse 2.4s ease-out infinite;
        }
        .map-circuit-wrap.is-visible .map-node .node-ring-blue {
          animation: ringPulseBlue 2.8s ease-out infinite 250ms;
        }
        .map-circuit-wrap.is-visible .map-node .node-glow {
          animation: glowPulse 2s ease-in-out infinite;
        }
        .map-circuit-wrap.is-visible .map-node .node-blue-glow {
          animation: glowPulseBlue 2.2s ease-in-out infinite;
        }
        .map-circuit-wrap.is-visible .map-node .node-core {
          animation: nodeFloat 2.6s ease-in-out infinite;
        }

        @keyframes drawCircuit {
          0% { stroke-dashoffset: 120; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes popNode {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.45); }
          65% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes ringPulse {
          0% { opacity: 0.75; transform: scale(0.35); }
          80% { opacity: 0; transform: scale(1.55); }
          100% { opacity: 0; transform: scale(1.55); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
        @keyframes ringPulseBlue {
          0% { opacity: 0.6; transform: scale(0.32); }
          80% { opacity: 0; transform: scale(1.75); }
          100% { opacity: 0; transform: scale(1.75); }
        }
        @keyframes glowPulseBlue {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.78; }
        }
        @keyframes nodeFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1.5px); }
        }
      `}</style>
    </div>
  );
}
