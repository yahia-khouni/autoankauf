"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LeadForm } from "@/components/forms/lead-form";
import {
  Phone,
  Mail,
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

  return (
    <div>
      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />

        {/* Soft ambient orbs only */}
        <div className="absolute bottom-16 left-10 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-gold-400/6 rounded-full blur-[80px] pointer-events-none" />


        <div className="container relative z-10 text-center px-4 sm:px-6">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-400/30 px-5 py-2 backdrop-blur-sm mb-6">
              <MessageCircle className="h-4 w-4 text-gold-400" />
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

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
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
    </div>
  );
}
