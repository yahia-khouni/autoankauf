import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">{t("description")}</p>
        <Link
          href="/#lead-form"
          className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          {t("button")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
