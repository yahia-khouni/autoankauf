import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { BadgeCheck, Car, MapPin, ShieldCheck, ClipboardList, BadgeDollarSign, BadgeCheck as BadgeCheckSolid } from "lucide-react";
import { useTranslations } from "next-intl";


export function WhoWeAreSection() {
  const t = useTranslations("whoWeAre");

  const highlights = [
    {
      icon: Car,
      title: t("highlight1Title"),
      text: t("highlight1Text"),
    },
    {
      icon: MapPin,
      title: t("highlight2Title"),
      text: t("highlight2Text"),
    },
    {
      icon: ShieldCheck,
      title: t("highlight3Title"),
      text: t("highlight3Text"),
    },
  ];

  const process = [
    { icon: ClipboardList, title: t("process1"), step: "01" },
    { icon: BadgeCheckSolid, title: t("process2"), step: "02" },
    { icon: BadgeDollarSign, title: t("process3"), step: "03" },
  ];

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-10 w-64 h-64 bg-gold-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-12 w-72 h-72 bg-navy-900/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gold-300/40 px-4 py-2 text-xs sm:text-sm font-semibold text-navy-900 shadow-sm">
              <BadgeCheck className="h-4 w-4 text-gold-500" />
              {t("badge")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900">
              {t("title")}
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
          <AnimateOnScroll className="lg:col-span-7" direction="left">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.08)] p-6 sm:p-8 lg:p-10 space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                {t.rich("paragraph1", {
                  brand: (chunks) => <span className="font-semibold text-navy-900">{chunks}</span>,
                })}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                {t("paragraph2")}
              </p>
              <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 text-white p-5 sm:p-6">
                <p className="text-sm sm:text-base leading-relaxed">
                  {t("paragraph3")}
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll className="lg:col-span-5" direction="right" delay={80}>
            <div className="space-y-4 sm:space-y-5">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:border-gold-300/60 hover:shadow-[0_16px_34px_rgba(212,175,55,0.16)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gold-400/15 border border-gold-400/25 flex items-center justify-center shrink-0 group-hover:bg-gold-400/25 transition-colors">
                      <item.icon className="h-5 w-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1.5">{item.title}</h3>
                      <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={140}>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-3 gap-4 sm:gap-5">
            {process.map((step) => (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.18)] hover:border-gold-300/50 transition-all duration-300 p-5 flex items-center gap-4 overflow-hidden"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-100/0 group-hover:from-gold-50/40 group-hover:to-gold-100/20 transition-all duration-300 rounded-2xl pointer-events-none" />

                {/* Icon badge */}
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(15,23,42,0.25)] group-hover:shadow-[0_4px_14px_rgba(212,175,55,0.35)] group-hover:from-navy-800 group-hover:to-navy-900 transition-all duration-300">
                  <step.icon className="h-5 w-5 text-gold-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.14em] mb-0.5">{step.step}</p>
                  <span className="text-sm font-bold text-navy-900 leading-tight block">{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
