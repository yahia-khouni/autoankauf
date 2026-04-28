"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { FaqContactCard } from "@/components/sections/faq-contact-card";
import {
  Search, Clock, Calendar, ArrowRight, BookOpen,
  ChevronDown, ChevronUp, Car, Euro, FileText, HelpCircle,
  TrendingUp, Zap, Shield, CheckCircle, Star, Phone,
  Sparkles, Filter, X, AlertCircle,
  Wrench, BarChart2, Users, List, BookMarked, Tag,
  Lightbulb, Info,
} from "lucide-react";

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

/* ════════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ════════════════════════════════════════════════════════════ */
type Locale = "de" | "en" | "fr";

interface ArticleSection {
  heading: Record<Locale, string>;
  body: Record<Locale, string>;
  tip?: Record<Locale, string>;
}

interface BlogPost {
  slug: string;
  categoryKey: string;
  date: string;
  readTime: number;
  featured: boolean;
  icon: React.ElementType;
  titles: Record<Locale, string>;
  excerpts: Record<Locale, string>;
  fullContent: ArticleSection[];
  keyPoints: Record<Locale, string[]>;
}

/* ════════════════════════════════════════════════════════════
   FULL BLOG CONTENT DATA
   ════════════════════════════════════════════════════════════ */
const BLOG_POSTS: BlogPost[] = [
  {
    slug: "auto-verkaufen-tipps",
    categoryKey: "catTips",
    date: "2024-01-15",
    readTime: 5,
    featured: true,
    icon: TrendingUp,
    titles: {
      de: "Auto verkaufen: 10 Tipps für den besten Preis",
      en: "Selling Your Car: 10 Tips to Get the Best Price",
      fr: "Vendre sa voiture : 10 conseils pour obtenir le meilleur prix",
    },
    excerpts: {
      de: "Mit diesen Tipps maximieren Sie den Verkaufspreis Ihres Fahrzeugs und vermeiden typische Fehler — von der Aufbereitung bis zur richtigen Preisgestaltung.",
      en: "Use these proven tips to maximize your vehicle's sale price and avoid common mistakes — from preparation to pricing.",
      fr: "Utilisez ces conseils pour maximiser le prix de vente de votre véhicule et éviter les erreurs classiques.",
    },
    keyPoints: {
      de: ["Auto gründlich reinigen", "Service-Heft bereitstellen", "Marktpreis recherchieren", "Mehrere Angebote einholen"],
      en: ["Clean the car thoroughly", "Gather service records", "Research market price", "Get multiple offers"],
      fr: ["Nettoyer la voiture", "Rassembler les carnets", "Rechercher le prix marché", "Obtenir plusieurs offres"],
    },
    fullContent: [
      {
        heading: { de: "1. Bereiten Sie Ihr Auto vor", en: "1. Prepare Your Car", fr: "1. Préparez votre voiture" },
        body: {
          de: "Ein sauberes, gepflegtes Auto erzielt deutlich höhere Preise. Lassen Sie das Fahrzeug gründlich innen und außen reinigen — professionelle Aufbereitung kostet zwischen 50 und 200 € und erhöht den Verkaufspreis häufig um ein Vielfaches. Beheben Sie kleine Kratzer und Delle, so weit es wirtschaftlich sinnvoll ist.",
          en: "A clean, well-maintained car fetches significantly higher prices. Have the vehicle thoroughly cleaned inside and out — professional detailing costs €50–200 and often increases the sale price by much more. Fix small scratches and dents where it makes economic sense.",
          fr: "Une voiture propre et bien entretenue obtient des prix nettement plus élevés. Faites nettoyer le véhicule à l'intérieur et à l'extérieur — un nettoyage professionnel coûte 50 à 200 € et augmente souvent bien davantage le prix de vente.",
        },
        tip: {
          de: "Tipp: Ein frisch aufbereitetes Auto kann bis zu 15 % mehr einbringen als ein ungereinigtes.",
          en: "Tip: A freshly detailed car can fetch up to 15% more than an uncleaned one.",
          fr: "Conseil : Une voiture fraîchement préparée peut rapporter jusqu'à 15 % de plus.",
        },
      },
      {
        heading: { de: "2. Alle Unterlagen zusammenstellen", en: "2. Gather All Documents", fr: "2. Rassemblez tous les documents" },
        body: {
          de: "Stellen Sie alle wichtigen Dokumente bereit: Fahrzeugbrief (Zulassungsbescheinigung Teil II), Fahrzeugschein (Teil I), alle Schlüssel, TÜV-Berichte und das Serviceheft. Vollständige Unterlagen signalisieren dem Käufer Vertrauen und erhöhen den wahrgenommenen Wert Ihres Fahrzeugs deutlich.",
          en: "Gather all important documents: the vehicle title (Part II registration certificate), registration card (Part I), all keys, TÜV reports and the service booklet. Complete documentation signals trustworthiness and significantly increases the perceived value of your vehicle.",
          fr: "Rassemblez tous les documents importants : le titre de propriété (certificat d'immatriculation partie II), la carte grise (partie I), toutes les clés, les rapports TÜV et le carnet d'entretien. Des documents complets signalent la confiance et augmentent significativement la valeur perçue.",
        },
      },
      {
        heading: { de: "3. Den richtigen Preis finden", en: "3. Finding the Right Price", fr: "3. Trouver le bon prix" },
        body: {
          de: "Recherchieren Sie aktuelle Marktpreise für Ihr Fahrzeug auf Plattformen wie mobile.de oder autoscout24.de. Berücksichtigen Sie Kilometerstand, Baujahr, Ausstattung und Zustand. Ein realistischer Preis verhindert, dass Ihr Auto lange unverkauft bleibt — oder Sie unter Wert verkaufen.",
          en: "Research current market prices for your vehicle on platforms like mobile.de or autoscout24.de. Consider mileage, year, equipment and condition. A realistic price prevents your car from sitting unsold for too long — or being sold below its value.",
          fr: "Recherchez les prix actuels du marché pour votre véhicule sur des plateformes comme mobile.de ou autoscout24.de. Tenez compte du kilométrage, de l'année, de l'équipement et de l'état. Un prix réaliste évite que votre voiture reste invendue trop longtemps.",
        },
        tip: {
          de: "Wichtig: Setzen Sie einen etwas höheren Preis an, um Verhandlungsspielraum zu haben.",
          en: "Important: Set a slightly higher price to leave room for negotiation.",
          fr: "Important : Fixez un prix légèrement plus élevé pour laisser place à la négociation.",
        },
      },
      {
        heading: { de: "4. Das einfachste: Direkt an uns verkaufen", en: "4. The Easiest Option: Sell Directly to Us", fr: "4. L'option la plus simple : nous vendre directement" },
        body: {
          de: "Sie möchten keinen Aufwand? Verkaufen Sie Ihr Auto direkt an autoankauf.de — kostenlos, ohne Insertionsgebühren, ohne Besichtigungstourismus. Wir kommen zu Ihnen, prüfen das Fahrzeug und zahlen sofort. Das gesamte Prozess dauert oft nur 48 Stunden.",
          en: "Don't want the hassle? Sell your car directly to autoankauf.de — free of charge, no listing fees, no tire-kickers. We come to you, inspect the vehicle and pay on the spot. The entire process often takes just 48 hours.",
          fr: "Vous ne voulez pas de tracas ? Vendez votre voiture directement à autoankauf.de — gratuitement, sans frais de vente, sans les curieux. Nous venons chez vous, inspectons le véhicule et payons sur place. Le processus complet prend souvent seulement 48 heures.",
        },
      },
    ],
  },
  {
    slug: "fahrzeugbewertung-verstehen",
    categoryKey: "catKnowledge",
    date: "2024-01-10",
    readTime: 4,
    featured: true,
    icon: BarChart2,
    titles: {
      de: "Fahrzeugbewertung: So wird der Wert Ihres Autos ermittelt",
      en: "Vehicle Valuation: How Your Car's Value Is Determined",
      fr: "Évaluation d'un véhicule : comment est déterminée la valeur de votre voiture",
    },
    excerpts: {
      de: "Welche Faktoren beeinflussen den Wert Ihres Fahrzeugs? Marktpreise, Kilometerstand, Zustand und mehr — transparent erklärt.",
      en: "Which factors influence your vehicle's value? Market prices, mileage, condition and more — explained clearly.",
      fr: "Quels facteurs influencent la valeur de votre véhicule ? Prix de marché, kilométrage, état et plus — expliqués clairement.",
    },
    keyPoints: {
      de: ["Marke & Modell", "Kilometerstand", "Unfallhistorie", "Aktuelle Marktnachfrage"],
      en: ["Make & Model", "Mileage", "Accident History", "Current Market Demand"],
      fr: ["Marque & Modèle", "Kilométrage", "Historique d'accidents", "Demande du marché actuelle"],
    },
    fullContent: [
      {
        heading: { de: "Was bestimmt den Wert Ihres Autos?", en: "What Determines Your Car's Value?", fr: "Qu'est-ce qui détermine la valeur de votre voiture ?" },
        body: {
          de: "Der Wert eines Gebrauchtwagens wird durch viele Faktoren bestimmt. Die wichtigsten sind: Marke und Modell (manche Marken behalten ihren Wert besser), Baujahr und Kilometerstand, der allgemeine Fahrzeugzustand, die Vollständigkeit der Servicehistorie sowie die aktuelle Nachfrage am Markt. Ein gut gewartetes Auto mit Serviceheft kann bis zu 20 % mehr wert sein.",
          en: "The value of a used car is determined by many factors. The most important are: make and model (some brands retain value better), year and mileage, overall vehicle condition, completeness of service history, and current market demand. A well-maintained car with a service booklet can be worth up to 20% more.",
          fr: "La valeur d'une voiture d'occasion est déterminée par de nombreux facteurs. Les plus importants sont : la marque et le modèle (certaines marques conservent mieux leur valeur), l'année et le kilométrage, l'état général du véhicule, l'exhaustivité de l'historique de service et la demande actuelle du marché.",
        },
        tip: {
          de: "Gut zu wissen: Ein vollständiges Serviceheft kann den Fahrzeugwert um bis zu 20 % steigern.",
          en: "Good to know: A complete service booklet can increase vehicle value by up to 20%.",
          fr: "Bon à savoir : Un carnet d'entretien complet peut augmenter la valeur du véhicule jusqu'à 20 %.",
        },
      },
      {
        heading: { de: "Wie berechnen wir Ihren Fahrzeugwert?", en: "How Do We Calculate Your Vehicle's Value?", fr: "Comment calculons-nous la valeur de votre véhicule ?" },
        body: {
          de: "Unsere Experten kombinieren aktuelle Marktdaten aus Hunderttausenden von Fahrzeugangeboten mit über 10 Jahren Erfahrung im deutschen Automobilmarkt. Das Ergebnis ist ein fairer, transparenter Preis — ohne algorithmische Abwertung, ohne versteckte Abzüge. Sie erhalten unser Angebot innerhalb von 24 Stunden.",
          en: "Our experts combine current market data from hundreds of thousands of vehicle listings with over 10 years of experience in the German automotive market. The result is a fair, transparent price — without algorithmic undervaluation, without hidden deductions. You receive our offer within 24 hours.",
          fr: "Nos experts combinent les données actuelles du marché de centaines de milliers d'annonces de véhicules avec plus de 10 ans d'expérience sur le marché automobile allemand. Le résultat est un prix équitable et transparent — sans dévaluation algorithmique, sans déductions cachées.",
        },
      },
    ],
  },
  {
    slug: "unterlagen-autoverkauf",
    categoryKey: "catChecklist",
    date: "2024-01-05",
    readTime: 3,
    featured: false,
    icon: FileText,
    titles: {
      de: "Welche Unterlagen brauche ich für den Autoverkauf?",
      en: "What Documents Do I Need to Sell My Car?",
      fr: "Quels documents faut-il pour vendre sa voiture ?",
    },
    excerpts: {
      de: "Eine komplette Checkliste aller Dokumente für einen reibungslosen Autoverkauf — vom Fahrzeugbrief bis zur Hauptuntersuchung.",
      en: "A complete checklist of all documents for a smooth car sale — from the title to the vehicle inspection.",
      fr: "Une liste complète de tous les documents pour une vente de voiture sans accroc.",
    },
    keyPoints: {
      de: ["Fahrzeugbrief (Teil II)", "Fahrzeugschein (Teil I)", "Alle Schlüssel", "TÜV-Bericht & Serviceheft"],
      en: ["Vehicle Title (Part II)", "Registration Card (Part I)", "All Keys", "TÜV Report & Service Book"],
      fr: ["Titre de propriété (Partie II)", "Carte grise (Partie I)", "Toutes les clés", "Rapport TÜV & carnet"],
    },
    fullContent: [
      {
        heading: { de: "Die Pflicht-Dokumente", en: "The Mandatory Documents", fr: "Les documents obligatoires" },
        body: {
          de: "Für jeden Autoverkauf in Deutschland zwingend erforderlich sind: (1) Zulassungsbescheinigung Teil II — das ist der sogenannte Fahrzeugbrief, den Sie beim Kauf erhalten haben. (2) Zulassungsbescheinigung Teil I — der Fahrzeugschein, der immer im Auto mitgeführt werden muss. (3) Alle vorhandenen Fahrzeugschlüssel — auch Zweit- und Notfallschlüssel. Fehlende Schlüssel können den Wert erheblich mindern.",
          en: "Mandatory for every car sale in Germany: (1) Registration Certificate Part II — the vehicle title you received when buying. (2) Registration Certificate Part I — the registration card always kept in the car. (3) All available vehicle keys — including spare and emergency keys. Missing keys can significantly reduce value.",
          fr: "Obligatoires pour toute vente de voiture en Allemagne : (1) Certificat d'immatriculation partie II — le titre de propriété reçu lors de l'achat. (2) Certificat d'immatriculation partie I — la carte grise conservée dans la voiture. (3) Toutes les clés disponibles — y compris les doubles et clés d'urgence.",
        },
        tip: {
          de: "Wichtig: Haben Sie den Fahrzeugbrief verloren? Ein Duplikat bei der Zulassungsstelle kostet rund 25–50 € und dauert 1–2 Wochen.",
          en: "Important: Lost your vehicle title? A duplicate from the registration office costs around €25–50 and takes 1–2 weeks.",
          fr: "Important : Perdu le titre de propriété ? Un duplicata de la préfecture coûte environ 25 à 50 € et prend 1 à 2 semaines.",
        },
      },
      {
        heading: { de: "Empfohlene Zusatzdokumente", en: "Recommended Additional Documents", fr: "Documents supplémentaires recommandés" },
        body: {
          de: "Zusätzlich sollten Sie bereithalten: das Serviceheft mit allen Einträgen, vorhandene TÜV-Berichte und AU-Bescheinigungen, Quittungen für durchgeführte Reparaturen sowie die Betriebsanleitung. Diese Dokumente erhöhen das Vertrauen der Käufer und rechtfertigen einen höheren Preis.",
          en: "Additionally, you should have ready: the service booklet with all entries, any TÜV reports and exhaust inspection certificates, receipts for repairs carried out, and the owner's manual. These documents build buyer trust and justify a higher price.",
          fr: "En plus, vous devriez avoir : le carnet d'entretien avec toutes les entrées, les rapports TÜV et certificats de contrôle des émissions, les reçus de réparations effectuées et le manuel d'utilisation.",
        },
      },
    ],
  },
  {
    slug: "unfallwagen-verkaufen",
    categoryKey: "catSpecial",
    date: "2023-12-28",
    readTime: 6,
    featured: false,
    icon: Wrench,
    titles: {
      de: "Unfallwagen verkaufen: Das müssen Sie wissen",
      en: "Selling a Damaged Car: What You Need to Know",
      fr: "Vendre une voiture accidentée : ce que vous devez savoir",
    },
    excerpts: {
      de: "Auch beschädigte Fahrzeuge lassen sich verkaufen. Erfahren Sie, worauf Sie achten sollten und wie Sie dennoch einen fairen Preis erzielen.",
      en: "Even damaged vehicles can be sold. Find out what to watch for and how to still get a fair price.",
      fr: "Même les véhicules endommagés peuvent être vendus. Découvrez ce à quoi faire attention et comment obtenir un prix équitable.",
    },
    keyPoints: {
      de: ["Schaden ehrlich angeben", "Gutachten einholen", "Spezialankäufer kontaktieren", "Sofortangebot erhalten"],
      en: ["Disclose damage honestly", "Get an expert report", "Contact specialist buyers", "Receive instant offer"],
      fr: ["Déclarer honnêtement les dégâts", "Obtenir un rapport expert", "Contacter des acheteurs spécialisés", "Recevoir une offre immédiate"],
    },
    fullContent: [
      {
        heading: { de: "Unfallfahrzeuge — ein Sonderfall", en: "Accident Vehicles — A Special Case", fr: "Véhicules accidentés — un cas particulier" },
        body: {
          de: "Viele Menschen glauben fälschlicherweise, dass ein Unfallwagen unverkäuflich ist — das ist falsch. Es gibt für jedes Fahrzeug einen Markt, auch für total beschädigte Autos. Wichtig ist dabei die vollständige und ehrliche Offenlegung des Schadens. Verschwiegene Schäden können später zur Anfechtung des Kaufvertrags oder sogar zu Strafanzeigen führen.",
          en: "Many people mistakenly believe a damaged car is unsellable — this is false. There is a market for every vehicle, even totally damaged ones. What's important is complete and honest disclosure of the damage. Concealed damages can later lead to contract disputes or even criminal charges.",
          fr: "Beaucoup de gens croient à tort qu'une voiture accidentée est invendable — c'est faux. Il y a un marché pour chaque véhicule, même les épaves totales. L'important est la divulgation complète et honnête des dommages.",
        },
        tip: {
          de: "Rechtlich wichtig: Als Verkäufer müssen Sie alle bekannten Mängel offenlegen. Tun Sie es nicht, können Sie zur Haftung gezogen werden.",
          en: "Legally important: As a seller, you must disclose all known defects. If you don't, you can be held liable.",
          fr: "Légalement important : En tant que vendeur, vous devez divulguer tous les défauts connus. Si vous ne le faites pas, vous pouvez être tenu responsable.",
        },
      },
      {
        heading: { de: "Wir kaufen auch Unfallwagen", en: "We Also Buy Damaged Vehicles", fr: "Nous achetons aussi les véhicules accidentés" },
        body: {
          de: "Bei autoankauf.de kaufen wir Fahrzeuge in jedem Zustand — mit Unfallschäden, Motorschäden, hoher Laufleistung oder technischen Problemen. Jedes Fahrzeug erhält eine faire, individuelle Bewertung basierend auf seinem tatsächlichen Marktwert. Füllen Sie einfach unser Formular aus und erhalten Sie innerhalb von 24 Stunden ein Angebot.",
          en: "At autoankauf.de we buy vehicles in any condition — with accident damage, engine damage, high mileage or technical problems. Every vehicle receives a fair, individual valuation based on its actual market value. Simply fill out our form and receive an offer within 24 hours.",
          fr: "Chez autoankauf.de, nous achetons des véhicules dans n'importe quel état — avec des dommages d'accident, des dommages moteur, un kilométrage élevé ou des problèmes techniques. Chaque véhicule reçoit une évaluation équitable et individuelle.",
        },
      },
    ],
  },
  {
    slug: "kfz-abmeldung-anleitung",
    categoryKey: "catGuide",
    date: "2023-12-20",
    readTime: 4,
    featured: false,
    icon: List,
    titles: {
      de: "KFZ-Abmeldung: Schritt-für-Schritt Anleitung",
      en: "Vehicle Deregistration: Step-by-Step Guide",
      fr: "Désinscription d'un véhicule : guide étape par étape",
    },
    excerpts: {
      de: "So melden Sie Ihr Fahrzeug richtig ab — mit allen wichtigen Infos zu Fristen, Kosten und dem Verfahren.",
      en: "How to properly deregister your vehicle — with all key info on deadlines, costs and the process.",
      fr: "Comment désinscrire correctement votre véhicule — avec toutes les informations clés sur les délais, coûts et procédures.",
    },
    keyPoints: {
      de: ["Zulassungsstelle aufsuchen", "Kennzeichen abgeben", "KFZ-Versicherung kündigen", "Bestätigung aufbewahren"],
      en: ["Visit registration office", "Return license plates", "Cancel car insurance", "Keep confirmation"],
      fr: ["Visiter la préfecture", "Rendre les plaques", "Annuler l'assurance", "Conserver la confirmation"],
    },
    fullContent: [
      {
        heading: { de: "Wann und warum abmelden?", en: "When and Why Deregister?", fr: "Quand et pourquoi désinscrire ?" },
        body: {
          de: "Nach dem Verkauf Ihres Fahrzeugs müssen Sie es bei der Zulassungsstelle abmelden — oder der Käufer übernimmt es auf seinen Namen um. Die Abmeldung ist wichtig, damit Sie nicht mehr für Steuern und Versicherung haften. Bei autoankauf.de übernehmen wir die Abmeldung kostenlos für Sie — Sie müssen sich um nichts kümmern.",
          en: "After selling your vehicle, you must deregister it at the registration office — or the buyer registers it in their name. Deregistration is important so you are no longer liable for taxes and insurance. At autoankauf.de, we handle the deregistration for you free of charge — you don't need to worry about anything.",
          fr: "Après avoir vendu votre véhicule, vous devez le désinscrire à la préfecture — ou l'acheteur le réenregistre à son nom. La désinscription est importante pour que vous ne soyez plus responsable des taxes et de l'assurance. Chez autoankauf.de, nous nous occupons de la désinscription gratuitement pour vous.",
        },
        tip: {
          de: "Kostenlos: Bei autoankauf.de erledigen wir die KFZ-Abmeldung vollständig und kostenlos für Sie.",
          en: "Free of charge: At autoankauf.de, we handle the vehicle deregistration completely and free of charge for you.",
          fr: "Gratuit : Chez autoankauf.de, nous nous occupons de la désinscription totalement et gratuitement pour vous.",
        },
      },
      {
        heading: { de: "Die Schritte der Abmeldung", en: "The Deregistration Steps", fr: "Les étapes de la désinscription" },
        body: {
          de: "Für die Selbst-Abmeldung benötigen Sie: (1) Personalausweis oder Reisepass, (2) Fahrzeugschein (Teil I), (3) Fahrzeugbrief (Teil II), (4) die Kennzeichen des Fahrzeugs. Die Gebühren betragen je nach Zulassungsstelle 5 bis 15 EUR. Alternativ kann auch eine bevollmächtigte Person für Sie die Abmeldung vornehmen.",
          en: "For self-deregistration you need: (1) ID card or passport, (2) Vehicle registration card (Part I), (3) Vehicle title (Part II), (4) the vehicle's license plates. Fees range from €5 to €15 depending on the registration office. Alternatively, an authorized person can deregister for you.",
          fr: "Pour la désinscription vous-même, vous avez besoin : (1) Carte d'identité ou passeport, (2) Carte grise (partie I), (3) Titre de propriété (partie II), (4) les plaques d'immatriculation du véhicule. Les frais varient de 5 à 15 EUR selon la préfecture.",
        },
      },
    ],
  },
  {
    slug: "elektroauto-verkaufen",
    categoryKey: "catSpecial",
    date: "2023-12-15",
    readTime: 5,
    featured: true,
    icon: Zap,
    titles: {
      de: "Elektroauto verkaufen: Besonderheiten und Tipps",
      en: "Selling an Electric Car: Specifics and Tips",
      fr: "Vendre une voiture électrique : particularités et conseils",
    },
    excerpts: {
      de: "Der Markt für gebrauchte E-Autos wächst. So verkaufen Sie Ihr Elektrofahrzeug erfolgreich — Batteriezustand, Reichweite und Vermarktungsstrategien.",
      en: "The used EV market is booming. How to sell your electric vehicle successfully — battery health, range and marketing strategies.",
      fr: "Le marché des VE d'occasion est en plein essor. Comment vendre votre véhicule électrique avec succès — état de la batterie, autonomie et stratégies.",
    },
    keyPoints: {
      de: ["Batteriezustand prüfen", "Reichweite dokumentieren", "Förderprogramme erwähnen", "Ladeequipment einschließen"],
      en: ["Check battery health", "Document range", "Mention incentives", "Include charging equipment"],
      fr: ["Vérifier l'état de la batterie", "Documenter l'autonomie", "Mentionner les aides", "Inclure le chargeur"],
    },
    fullContent: [
      {
        heading: { de: "Besonderheiten beim E-Auto-Verkauf", en: "Special Features When Selling an EV", fr: "Particularités lors de la vente d'un VE" },
        body: {
          de: "Elektroautos haben eigene Wertermittlungsfaktoren. Der wichtigste ist der Batteriezustand (State of Health, SoH) — je höher, desto höher der Wert. Lassen Sie den Batteriezustand von einem Werkstatt offiziell dokumentieren. Auch die Restkapazität und die echte Ladegeschwindigkeit sind kaufentscheidend für viele Käufer.",
          en: "Electric cars have their own value factors. The most important is the battery State of Health (SoH) — the higher, the more value. Have the battery condition officially documented by a workshop. The remaining capacity and real charging speed are also purchase-deciding factors for many buyers.",
          fr: "Les voitures électriques ont leurs propres facteurs de valeur. Le plus important est l'état de santé de la batterie (SoH) — plus il est élevé, plus la valeur est élevée. Faites documenter officiellement l'état de la batterie par un atelier.",
        },
        tip: {
          de: "Tipp: Schließen Sie das originale Ladekabel, den Typ-2-Adapter und falls vorhanden den Wallbox-Adapter in den Verkauf ein — das erhöht den Wert erheblich.",
          en: "Tip: Include the original charging cable, Type-2 adapter and if available the wallbox adapter in the sale — this significantly increases the value.",
          fr: "Conseil : Incluez le câble de charge original, l'adaptateur Type-2 et si disponible l'adaptateur wallbox dans la vente — cela augmente considérablement la valeur.",
        },
      },
      {
        heading: { de: "Wir kaufen alle E-Fahrzeuge", en: "We Buy All Electric Vehicles", fr: "Nous achetons tous les véhicules électriques" },
        body: {
          de: "Ob Tesla, BMW i-Reihe, Volkswagen ID, Renault Zoe oder andere E-Marken — wir kaufen alle Elektrofahrzeuge fair und schnell. Unsere Experten kennen den E-Auto-Markt genau und bieten Ihnen immer den aktuellen Marktwert.",
          en: "Whether Tesla, BMW i-Series, Volkswagen ID, Renault Zoe or other EV brands — we buy all electric vehicles fairly and quickly. Our experts know the EV market well and always offer you the current market value.",
          fr: "Que ce soit Tesla, BMW i-Series, Volkswagen ID, Renault Zoe ou d'autres marques de VE — nous achetons tous les véhicules électriques équitablement et rapidement.",
        },
      },
    ],
  },
  {
    slug: "auto-kaufen-ratgeber",
    categoryKey: "catKnowledge",
    date: "2023-12-05",
    readTime: 7,
    featured: false,
    icon: Car,
    titles: {
      de: "Gebrauchtwagen kaufen: Der große Ratgeber",
      en: "Buying a Used Car: The Complete Guide",
      fr: "Acheter une voiture d'occasion : le guide complet",
    },
    excerpts: {
      de: "Was sind die wichtigsten Punkte beim Kauf eines Gebrauchtwagens? Unser Leitfaden hilft Ihnen, den richtigen Wagen zum richtigen Preis zu finden.",
      en: "What are the most important points when buying a used car? Our guide helps you find the right car at the right price.",
      fr: "Quels sont les points les plus importants lors de l'achat d'une voiture d'occasion ? Notre guide vous aide à trouver la bonne voiture au bon prix.",
    },
    keyPoints: {
      de: ["Fahrzeughistorie prüfen", "TÜV-Bericht lesen", "Probefahrt machen", "Marktpreis vergleichen"],
      en: ["Check vehicle history", "Read TÜV report", "Take a test drive", "Compare market price"],
      fr: ["Vérifier l'historique", "Lire le rapport TÜV", "Faire un essai", "Comparer le prix"],
    },
    fullContent: [
      {
        heading: { de: "Schritt 1: Die richtige Fahrzeugauswahl", en: "Step 1: The Right Vehicle Selection", fr: "Étape 1 : La bonne sélection de véhicule" },
        body: {
          de: "Bevor Sie ein Fahrzeug besichtigen, klären Sie: Was ist mein Budget? Welche Nutzung plane ich (Stadt, Pendler, Familie)? Wie hoch ist mein Bedarf an Kofferraum, Sitzen, Motorstärke? Ein klares Anforderungsprofil spart Zeit und verhindert Fehlkäufe. Bei uns finden Sie geprüfte Fahrzeuge, die alle Ihre Anforderungen abdecken.",
          en: "Before viewing a vehicle, clarify: What is my budget? What use do I plan (city, commuter, family)? What are my needs for trunk space, seats, engine power? A clear requirement profile saves time and prevents wrong purchases. With us you find checked vehicles that meet all your requirements.",
          fr: "Avant de voir un véhicule, clarifiez : Quel est mon budget ? Quelle utilisation est-ce que je prévois (ville, navetteur, famille) ? Quels sont mes besoins en espace de coffre, places, puissance moteur ?",
        },
      },
      {
        heading: { de: "Was Sie beim Kauf niemals überspringen sollten", en: "What You Should Never Skip When Buying", fr: "Ce que vous ne devriez jamais sauter lors de l'achat" },
        body: {
          de: "Lassen Sie immer einen unabhängigen ADAC- oder TÜV-Fachmann das Fahrzeug prüfen — selbst wenn der Verkäufer einen gültigen TÜV vorweist. Eine unabhängige Prüfung kostet ca. 100 € und kann Ihnen Tausende von Euro ersparen. Prüfen Sie zudem die Fahrzeughistorie über offizielle Stellen und verlangen Sie den Nachweis aller Servicearbeiten.",
          en: "Always have an independent ADAC or TÜV expert inspect the vehicle — even if the seller shows a valid TÜV. An independent inspection costs around €100 and can save you thousands of euros. Also check the vehicle history through official channels and request proof of all service work.",
          fr: "Faites toujours inspecter le véhicule par un expert ADAC ou TÜV indépendant — même si le vendeur montre un TÜV valide. Une inspection indépendante coûte environ 100 € et peut vous faire économiser des milliers d'euros.",
        },
        tip: {
          de: "Gut zu wissen: Alle Fahrzeuge bei autoankauf.de durchlaufen eine 150-Punkte-Prüfung — Sie kaufen mit voller Sicherheit.",
          en: "Good to know: All vehicles at autoankauf.de go through a 150-point inspection — you buy with full confidence.",
          fr: "Bon à savoir : Tous les véhicules chez autoankauf.de passent une inspection en 150 points — vous achetez en toute sécurité.",
        },
      },
    ],
  },
  {
    slug: "finanzierung-autoverkauf",
    categoryKey: "catTips",
    date: "2023-11-20",
    readTime: 5,
    featured: false,
    icon: Euro,
    titles: {
      de: "Autofinanzierung: Was Verkäufer wissen müssen",
      en: "Car Financing: What Sellers Need to Know",
      fr: "Financement automobile : ce que les vendeurs doivent savoir",
    },
    excerpts: {
      de: "Wie wirkt sich eine laufende Autofinanzierung auf den Verkauf aus? Wir erklären Vorfälligkeitsentschädigungen und Ablöseverfahren.",
      en: "How does an active car loan affect the sale? We explain early repayment fees and payoff procedures.",
      fr: "Comment un prêt auto en cours affecte-t-il la vente ? Nous expliquons les pénalités de remboursement anticipé.",
    },
    keyPoints: {
      de: ["Restschuld ermitteln", "Vorfälligkeitsentschädigung prüfen", "Bank kontaktieren", "Verkaufserlös verrechnen"],
      en: ["Determine remaining debt", "Check early repayment fees", "Contact the bank", "Offset sale proceeds"],
      fr: ["Déterminer la dette restante", "Vérifier les pénalités", "Contacter la banque", "Compenser le produit de vente"],
    },
    fullContent: [
      {
        heading: { de: "Finanziertes Auto verkaufen — ist das möglich?", en: "Selling a Financed Car — Is That Possible?", fr: "Vendre une voiture financée — est-ce possible ?" },
        body: {
          de: "Ja, es ist möglich, ein Auto zu verkaufen, das noch nicht vollständig abbezahlt ist — aber es erfordert einige Schritte. Zunächst: Kontaktieren Sie Ihre Bank oder Ihren Finanzierungsanbieter und erfragen Sie die aktuelle Restschuld sowie eine eventuelle Vorfälligkeitsentschädigung. Diese Kosten müssen beim Verkaufserlös berücksichtigt werden.",
          en: "Yes, it is possible to sell a car that is not yet fully paid off — but it requires some steps. First: Contact your bank or financing provider and ask for the current outstanding balance and any early repayment fee. These costs must be considered in the sale proceeds.",
          fr: "Oui, il est possible de vendre une voiture qui n'est pas encore entièrement remboursée — mais cela nécessite quelques étapes. Premièrement : Contactez votre banque ou votre prestataire de financement et demandez le solde restant actuel et tout frais de remboursement anticipé.",
        },
        tip: {
          de: "Wir helfen: Bei autoankauf.de können wir die Restfinanzierung direkt mit Ihrer Bank abwickeln — Sie erhalten den Differenzbetrag sofort.",
          en: "We help: At autoankauf.de we can settle the remaining financing directly with your bank — you receive the difference amount immediately.",
          fr: "Nous aidons : Chez autoankauf.de, nous pouvons régler le financement restant directement avec votre banque — vous recevez immédiatement le montant de la différence.",
        },
      },
    ],
  },
];

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
  post, locale, t, isOpen, leadFormHref,
}: {
  post: BlogPost; locale: Locale; t: (k: string) => string; isOpen: boolean; leadFormHref: string;
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
  );
}

/* ════════════════════════════════════════════════════════════
   BLOG CARD — expands in-place, no scrolling
   ════════════════════════════════════════════════════════════ */
function BlogCard({
  post, locale, t, delay, isExpanded, onExpand, leadFormHref,
}: {
  post: BlogPost; locale: Locale; t: (key: string) => string;
  delay: number; isExpanded: boolean; onExpand: () => void; leadFormHref: string;
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

        {/* ── Inline expanding content — NO scroll, grows the card ── */}
        <ArticleInlineContent
          post={post}
          locale={locale}
          t={t}
          isOpen={isExpanded}
          leadFormHref={leadFormHref}
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
                phoneDisplay="+49 123 456 789 00"
                phoneHref="tel:+4912345678900"
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
              <a href="tel:+4912345678900"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white font-semibold text-base transition-all backdrop-blur-sm">
                <Phone className="h-4 w-4 text-gold-400" />+49 123 456 789 00
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
