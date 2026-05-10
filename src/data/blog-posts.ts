import type { ElementType } from "react";
import { BarChart2, Car, Euro, FileText, List, TrendingUp, Wrench, Zap } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export interface ArticleSection {
  heading: Record<Locale, string>;
  body: Record<Locale, string>;
  tip?: Record<Locale, string>;
}

export interface BlogPost {
  slug: string;
  categoryKey: string;
  date: string;
  readTime: number;
  featured: boolean;
  icon: ElementType;
  titles: Record<Locale, string>;
  excerpts: Record<Locale, string>;
  fullContent: ArticleSection[];
  keyPoints: Record<Locale, string[]>;
}

export const blogPosts: BlogPost[] = [
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
          de: "Sie möchten keinen Aufwand? Verkaufen Sie Ihr Auto direkt an autoankaufsr.de — kostenlos, ohne Insertionsgebühren, ohne Besichtigungstourismus. Wir kommen zu Ihnen, prüfen das Fahrzeug und zahlen sofort. Das gesamte Prozess dauert oft nur 48 Stunden.",
          en: "Don't want the hassle? Sell your car directly to autoankaufsr.de — free of charge, no listing fees, no tire-kickers. We come to you, inspect the vehicle and pay on the spot. The entire process often takes just 48 hours.",
          fr: "Vous ne voulez pas de tracas ? Vendez votre voiture directement à autoankaufsr.de — gratuitement, sans frais de vente, sans les curieux. Nous venons chez vous, inspectons le véhicule et payons sur place. Le processus complet prend souvent seulement 48 heures.",
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
          de: "Bei autoankaufsr.de kaufen wir Fahrzeuge in jedem Zustand — mit Unfallschäden, Motorschäden, hoher Laufleistung oder technischen Problemen. Jedes Fahrzeug erhält eine faire, individuelle Bewertung basierend auf seinem tatsächlichen Marktwert. Füllen Sie einfach unser Formular aus und erhalten Sie innerhalb von 24 Stunden ein Angebot.",
          en: "At autoankaufsr.de we buy vehicles in any condition — with accident damage, engine damage, high mileage or technical problems. Every vehicle receives a fair, individual valuation based on its actual market value. Simply fill out our form and receive an offer within 24 hours.",
          fr: "Chez autoankaufsr.de, nous achetons des véhicules dans n'importe quel état — avec des dommages d'accident, des dommages moteur, un kilométrage élevé ou des problèmes techniques. Chaque véhicule reçoit une évaluation équitable et individuelle.",
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
          de: "Nach dem Verkauf Ihres Fahrzeugs müssen Sie es bei der Zulassungsstelle abmelden — oder der Käufer übernimmt es auf seinen Namen um. Die Abmeldung ist wichtig, damit Sie nicht mehr für Steuern und Versicherung haften. Bei autoankaufsr.de übernehmen wir die Abmeldung kostenlos für Sie — Sie müssen sich um nichts kümmern.",
          en: "After selling your vehicle, you must deregister it at the registration office — or the buyer registers it in their name. Deregistration is important so you are no longer liable for taxes and insurance. At autoankaufsr.de, we handle the deregistration for you free of charge — you don't need to worry about anything.",
          fr: "Après avoir vendu votre véhicule, vous devez le désinscrire à la préfecture — ou l'acheteur le réenregistre à son nom. La désinscription est importante pour que vous ne soyez plus responsable des taxes et de l'assurance. Chez autoankaufsr.de, nous nous occupons de la désinscription gratuitement pour vous.",
        },
        tip: {
          de: "Kostenlos: Bei autoankaufsr.de erledigen wir die KFZ-Abmeldung vollständig und kostenlos für Sie.",
          en: "Free of charge: At autoankaufsr.de, we handle the vehicle deregistration completely and free of charge for you.",
          fr: "Gratuit : Chez autoankaufsr.de, nous nous occupons de la désinscription totalement et gratuitement pour vous.",
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
          de: "Gut zu wissen: Alle Fahrzeuge bei autoankaufsr.de durchlaufen eine 150-Punkte-Prüfung — Sie kaufen mit voller Sicherheit.",
          en: "Good to know: All vehicles at autoankaufsr.de go through a 150-point inspection — you buy with full confidence.",
          fr: "Bon à savoir : Tous les véhicules chez autoankaufsr.de passent une inspection en 150 points — vous achetez en toute sécurité.",
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
          de: "Wir helfen: Bei autoankaufsr.de können wir die Restfinanzierung direkt mit Ihrer Bank abwickeln — Sie erhalten den Differenzbetrag sofort.",
          en: "We help: At autoankaufsr.de we can settle the remaining financing directly with your bank — you receive the difference amount immediately.",
          fr: "Nous aidons : Chez autoankaufsr.de, nous pouvons régler le financement restant directement avec votre banque — vous recevez immédiatement le montant de la différence.",
        },
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

