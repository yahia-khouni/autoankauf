import { Phone } from "lucide-react";

export function FaqContactCard({
  title,
  description,
  phoneHref,
  ctaLabel,
  phoneDisplay,
}: {
  title: string;
  description: string;
  phoneHref: string;
  ctaLabel: string;
  phoneDisplay: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-premium border border-slate-100">
      <div className="h-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-300 mb-6" />

      <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold-100 flex items-center justify-center mb-4">
        <Phone className="h-6 w-6 text-gold-600" />
      </div>

      <h3 className="text-xl font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{description}</p>

      <a
        href={phoneHref}
        className="group relative flex items-center justify-between rounded-xl px-5 py-4 transition-all active:scale-[0.98]
                   bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700
                   text-white shadow-lg hover:shadow-navy-900/30 ring-1 ring-white/10"
      >
        <span className="flex flex-col leading-tight">
          <span className="font-semibold text-base tracking-tight group-hover:translate-x-0.5 transition-transform">
            {ctaLabel}
          </span>
          <span className="text-xs text-white/70 font-medium">{phoneDisplay}</span>
        </span>

        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
          <Phone className="h-4 w-4 text-white" />
        </div>
      </a>
    </div>
  );
}

