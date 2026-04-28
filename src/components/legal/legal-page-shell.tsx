import type { ReactNode } from "react";
import { Scale, ShieldCheck } from "lucide-react";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  tocLabel: string;
  legalInfoLabel: string;
  sections: LegalSection[];
};

export function LegalPageShell({
  eyebrow,
  title,
  description,
  tocLabel,
  legalInfoLabel,
  sections,
}: LegalPageShellProps) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-hero-pattern opacity-35" />
      <div className="absolute top-20 left-6 sm:left-16 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-6 sm:right-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-navy-900/40 backdrop-blur-xl p-5 sm:p-8 shadow-[0_18px_55px_rgba(2,6,23,0.38)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/35 bg-gold-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
              <Scale className="h-3.5 w-3.5" />
              {eyebrow}
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
              {description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white/85">
                <ShieldCheck className="h-4 w-4 text-gold-300" />
                <span>{legalInfoLabel}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5 sm:gap-6">
            <aside className="h-fit rounded-2xl border border-white/10 bg-navy-900/35 backdrop-blur-xl p-4 sm:p-5 lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300 mb-3">
                {tocLabel}
              </p>
              <nav className="space-y-1.5">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-2.5 py-2 text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="space-y-4">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 shadow-[0_12px_32px_rgba(2,6,23,0.12)] scroll-mt-24"
                >
                  <h2 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_strong]:font-semibold [&_strong]:text-navy-900 [&_a]:text-navy-800 [&_a]:underline [&_a]:decoration-gold-400 [&_a]:underline-offset-4 hover:[&_a]:text-navy-900">
                    {section.content}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
