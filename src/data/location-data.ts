import type { NationData, StateData as StateDataType, CityData } from "@/types";

// ─── Import JSON data ────────────────────────────────────────
import nationJson from "./locations/nation/germany.json";

// State JSONs
import badenWuerttembergJson from "./locations/states/baden-wuerttemberg.json";
import bayernJson from "./locations/states/bayern.json";
import berlinJson from "./locations/states/berlin.json";
import brandenburgJson from "./locations/states/brandenburg.json";
import bremenJson from "./locations/states/bremen.json";
import hamburgJson from "./locations/states/hamburg.json";
import hessenJson from "./locations/states/hessen.json";
import mecklenburgVorpommernJson from "./locations/states/mecklenburg-vorpommern.json";
import niedersachsenJson from "./locations/states/niedersachsen.json";
import nordrheinWestfalenJson from "./locations/states/nordrhein-westfalen.json";
import rheinlandPfalzJson from "./locations/states/rheinland-pfalz.json";
import saarlandJson from "./locations/states/saarland.json";
import sachsenJson from "./locations/states/sachsen.json";
import sachsenAnhaltJson from "./locations/states/sachsen-anhalt.json";
import schleswigHolsteinJson from "./locations/states/schleswig-holstein.json";
import thueringenJson from "./locations/states/thueringen.json";

// ─── State map ───────────────────────────────────────────────
const stateMap: Record<string, StateDataType> = {
  "baden-wuerttemberg": badenWuerttembergJson as StateDataType,
  "bayern": bayernJson as StateDataType,
  "berlin": berlinJson as StateDataType,
  "brandenburg": brandenburgJson as StateDataType,
  "bremen": bremenJson as StateDataType,
  "hamburg": hamburgJson as StateDataType,
  "hessen": hessenJson as StateDataType,
  "mecklenburg-vorpommern": mecklenburgVorpommernJson as StateDataType,
  "niedersachsen": niedersachsenJson as StateDataType,
  "nordrhein-westfalen": nordrheinWestfalenJson as StateDataType,
  "rheinland-pfalz": rheinlandPfalzJson as StateDataType,
  "saarland": saarlandJson as StateDataType,
  "sachsen": sachsenJson as StateDataType,
  "sachsen-anhalt": sachsenAnhaltJson as StateDataType,
  "schleswig-holstein": schleswigHolsteinJson as StateDataType,
  "thueringen": thueringenJson as StateDataType,
};

// ─── City imports (dynamic via require for JSON) ─────────────
// We import city JSON files lazily by slug to avoid massive imports
function loadCityJson(citySlug: string): CityData | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = require(`./locations/cities/${citySlug}.json`);
    return data as CityData;
  } catch {
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────

/** Get nation-level data */
export function getNationData(): NationData {
  return nationJson as NationData;
}

/** Get all states, ordered by the nation's stateOrder */
export function getAllStates(): StateDataType[] {
  const nation = getNationData();
  return nation.stateOrder
    .map((slug) => stateMap[slug])
    .filter((s): s is StateDataType => !!s);
}

/** Get a single state by slug */
export function getStateBySlug(slug: string): StateDataType | undefined {
  return stateMap[slug];
}

/** Get all city data objects for a given state */
export function getCitiesByState(stateSlug: string): CityData[] {
  const state = stateMap[stateSlug];
  if (!state) return [];
  return state.cities
    .map((citySlug) => loadCityJson(citySlug))
    .filter((c): c is CityData => !!c);
}

/** Get a single city by state slug + city slug */
export function getCityBySlug(stateSlug: string, citySlug: string): CityData | null {
  const state = stateMap[stateSlug];
  if (!state || !state.cities.includes(citySlug)) return null;
  return loadCityJson(citySlug);
}

/** Flattened list of all locations for sitemap generation */
export function getAllLocations(): { slug: string; name: string; type: "state" | "city"; stateSlug?: string }[] {
  const locations: { slug: string; name: string; type: "state" | "city"; stateSlug?: string }[] = [];

  for (const state of getAllStates()) {
    locations.push({ slug: state.slug, name: state.name, type: "state" });
    for (const citySlug of state.cities) {
      const city = loadCityJson(citySlug);
      if (city) {
        locations.push({ slug: city.slug, name: city.name, type: "city", stateSlug: state.slug });
      }
    }
  }

  return locations;
}
