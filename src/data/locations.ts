export interface StateData {
  slug: string;
  name: string;
  cities: { slug: string; name: string; population: number }[];
}

export const germanStates: StateData[] = [
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Wurttemberg",
    cities: [
      { slug: "stuttgart", name: "Stuttgart", population: 635911 },
      { slug: "karlsruhe", name: "Karlsruhe", population: 313092 },
      { slug: "mannheim", name: "Mannheim", population: 311831 },
      { slug: "freiburg", name: "Freiburg", population: 231195 },
      { slug: "heidelberg", name: "Heidelberg", population: 162273 },
      { slug: "ulm", name: "Ulm", population: 128928 },
      { slug: "heilbronn", name: "Heilbronn", population: 127480 },
      { slug: "pforzheim", name: "Pforzheim", population: 125542 },
      { slug: "reutlingen", name: "Reutlingen", population: 117166 },
    ],
  },
  {
    slug: "bayern",
    name: "Bayern",
    cities: [
      { slug: "muenchen", name: "Munchen", population: 1488202 },
      { slug: "nuernberg", name: "Nurnberg", population: 523026 },
      { slug: "augsburg", name: "Augsburg", population: 299637 },
      { slug: "regensburg", name: "Regensburg", population: 153094 },
      { slug: "ingolstadt", name: "Ingolstadt", population: 139130 },
      { slug: "wuerzburg", name: "Wurzburg", population: 129000 },
      { slug: "fuerth", name: "Furth", population: 128497 },
      { slug: "erlangen", name: "Erlangen", population: 113292 },
    ],
  },
  {
    slug: "berlin",
    name: "Berlin",
    cities: [],
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    cities: [
      { slug: "potsdam", name: "Potsdam", population: 183154 },
      { slug: "cottbus", name: "Cottbus", population: 99678 },
      { slug: "frankfurt-oder", name: "Frankfurt (Oder)", population: 57015 },
    ],
  },
  {
    slug: "bremen",
    name: "Bremen",
    cities: [
      { slug: "bremen-stadt", name: "Bremen", population: 569352 },
      { slug: "bremerhaven", name: "Bremerhaven", population: 114024 },
    ],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    cities: [],
  },
  {
    slug: "hessen",
    name: "Hessen",
    cities: [
      { slug: "frankfurt", name: "Frankfurt am Main", population: 764104 },
      { slug: "wiesbaden", name: "Wiesbaden", population: 283083 },
      { slug: "kassel", name: "Kassel", population: 202137 },
      { slug: "darmstadt", name: "Darmstadt", population: 162643 },
      { slug: "offenbach", name: "Offenbach", population: 132045 },
    ],
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    cities: [
      { slug: "rostock", name: "Rostock", population: 209191 },
      { slug: "schwerin", name: "Schwerin", population: 99609 },
    ],
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    cities: [
      { slug: "hannover", name: "Hannover", population: 545061 },
      { slug: "braunschweig", name: "Braunschweig", population: 252738 },
      { slug: "osnabrueck", name: "Osnabruck", population: 170880 },
      { slug: "oldenburg", name: "Oldenburg", population: 172747 },
      { slug: "wolfsburg", name: "Wolfsburg", population: 128227 },
      { slug: "goettingen", name: "Gottingen", population: 117665 },
    ],
  },
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    cities: [
      { slug: "koeln", name: "Koln", population: 1087863 },
      { slug: "duesseldorf", name: "Dusseldorf", population: 621877 },
      { slug: "dortmund", name: "Dortmund", population: 588250 },
      { slug: "essen", name: "Essen", population: 583084 },
      { slug: "duisburg", name: "Duisburg", population: 502634 },
      { slug: "bochum", name: "Bochum", population: 365529 },
      { slug: "wuppertal", name: "Wuppertal", population: 359012 },
      { slug: "bielefeld", name: "Bielefeld", population: 334195 },
      { slug: "bonn", name: "Bonn", population: 333243 },
      { slug: "muenster", name: "Munster", population: 317713 },
    ],
  },
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    cities: [
      { slug: "mainz", name: "Mainz", population: 220552 },
      { slug: "ludwigshafen", name: "Ludwigshafen", population: 172557 },
      { slug: "koblenz", name: "Koblenz", population: 114052 },
      { slug: "trier", name: "Trier", population: 111528 },
      { slug: "kaiserslautern", name: "Kaiserslautern", population: 99845 },
    ],
  },
  {
    slug: "saarland",
    name: "Saarland",
    cities: [
      { slug: "saarbruecken", name: "Saarbrucken", population: 181959 },
    ],
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    cities: [
      { slug: "leipzig", name: "Leipzig", population: 616093 },
      { slug: "dresden", name: "Dresden", population: 563011 },
      { slug: "chemnitz", name: "Chemnitz", population: 249922 },
    ],
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    cities: [
      { slug: "halle", name: "Halle (Saale)", population: 242083 },
      { slug: "magdeburg", name: "Magdeburg", population: 239364 },
    ],
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    cities: [
      { slug: "kiel", name: "Kiel", population: 249023 },
      { slug: "luebeck", name: "Lubeck", population: 217198 },
      { slug: "flensburg", name: "Flensburg", population: 91113 },
    ],
  },
  {
    slug: "thueringen",
    name: "Thuringen",
    cities: [
      { slug: "erfurt", name: "Erfurt", population: 214969 },
      { slug: "jena", name: "Jena", population: 111407 },
      { slug: "gera", name: "Gera", population: 93125 },
    ],
  },
];

export function getAllLocations() {
  const locations: { slug: string; name: string; type: "state" | "city"; stateSlug?: string }[] = [];
  
  for (const state of germanStates) {
    locations.push({ slug: state.slug, name: state.name, type: "state" });
    for (const city of state.cities) {
      locations.push({ slug: city.slug, name: city.name, type: "city", stateSlug: state.slug });
    }
  }
  
  return locations;
}

export function getStateBySlug(slug: string) {
  return germanStates.find((s) => s.slug === slug);
}

export function getCityBySlug(stateSlug: string, citySlug: string) {
  const state = getStateBySlug(stateSlug);
  if (!state) return null;
  return state.cities.find((c) => c.slug === citySlug);
}
