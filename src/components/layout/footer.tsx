import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Autoankauf</h3>
            <p className="text-sm mb-4">
              Wir kaufen Ihr Auto schnell, fair und unkompliziert. 
              Deutschlandweiter Service mit sofortiger Abwicklung.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/4912345678900"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+4912345678900" className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4" />
                  +49 123 456 789 00
                </a>
              </li>
              <li>
                <a href="mailto:info@autoankauf.de" className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4" />
                  info@autoankauf.de
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  [Strasse]<br />
                  [PLZ Stadt]<br />
                  Deutschland
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/standorte" className="hover:text-white">Standorte</Link></li>
              <li><Link href="/so-funktionierts" className="hover:text-white">So funktionierts</Link></li>
              <li><Link href="/ueber-uns" className="hover:text-white">Uber uns</Link></li>
              <li><Link href="/blog" className="hover:text-white">Ratgeber</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/impressum" className="hover:text-white">{t("imprint")}</Link></li>
              <li><Link href="/datenschutz" className="hover:text-white">{t("privacy")}</Link></li>
              <li><Link href="/agb" className="hover:text-white">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
