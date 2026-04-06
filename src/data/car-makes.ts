export interface CarMakeData {
  id: string;
  slug: string;
  name: string;
  models: string[];
}

export const carMakes: CarMakeData[] = [
  {
    id: "audi",
    slug: "audi",
    name: "Audi",
    models: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "e-tron", "TT", "R8"],
  },
  {
    id: "bmw",
    slug: "bmw",
    name: "BMW",
    models: ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX"],
  },
  {
    id: "mercedes-benz",
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    models: ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "AMG GT", "EQC", "EQS"],
  },
  {
    id: "volkswagen",
    slug: "volkswagen",
    name: "Volkswagen",
    models: ["Polo", "Golf", "Passat", "Arteon", "T-Roc", "T-Cross", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.5", "Touran", "Sharan"],
  },
  {
    id: "opel",
    slug: "opel",
    name: "Opel",
    models: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Combo", "Zafira"],
  },
  {
    id: "ford",
    slug: "ford",
    name: "Ford",
    models: ["Fiesta", "Focus", "Mondeo", "Puma", "Kuga", "Explorer", "Mustang", "Ranger"],
  },
  {
    id: "toyota",
    slug: "toyota",
    name: "Toyota",
    models: ["Yaris", "Corolla", "Camry", "C-HR", "RAV4", "Highlander", "Land Cruiser", "Supra", "Prius"],
  },
  {
    id: "honda",
    slug: "honda",
    name: "Honda",
    models: ["Jazz", "Civic", "Accord", "HR-V", "CR-V", "e"],
  },
  {
    id: "hyundai",
    slug: "hyundai",
    name: "Hyundai",
    models: ["i10", "i20", "i30", "Kona", "Tucson", "Santa Fe", "IONIQ 5", "IONIQ 6"],
  },
  {
    id: "kia",
    slug: "kia",
    name: "Kia",
    models: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "EV6", "Niro", "Stinger"],
  },
  {
    id: "skoda",
    slug: "skoda",
    name: "Skoda",
    models: ["Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq"],
  },
  {
    id: "seat",
    slug: "seat",
    name: "SEAT",
    models: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco"],
  },
  {
    id: "renault",
    slug: "renault",
    name: "Renault",
    models: ["Clio", "Megane", "Kadjar", "Captur", "Arkana", "Scenic", "Zoe"],
  },
  {
    id: "peugeot",
    slug: "peugeot",
    name: "Peugeot",
    models: ["208", "308", "508", "2008", "3008", "5008", "e-208"],
  },
  {
    id: "citroen",
    slug: "citroen",
    name: "Citroen",
    models: ["C1", "C3", "C4", "C5 Aircross", "Berlingo"],
  },
  {
    id: "fiat",
    slug: "fiat",
    name: "Fiat",
    models: ["500", "Panda", "Tipo", "500X", "500L"],
  },
  {
    id: "mazda",
    slug: "mazda",
    name: "Mazda",
    models: ["2", "3", "6", "CX-3", "CX-30", "CX-5", "MX-5", "MX-30"],
  },
  {
    id: "nissan",
    slug: "nissan",
    name: "Nissan",
    models: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya"],
  },
  {
    id: "volvo",
    slug: "volvo",
    name: "Volvo",
    models: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40"],
  },
  {
    id: "porsche",
    slug: "porsche",
    name: "Porsche",
    models: ["911", "718 Boxster", "718 Cayman", "Panamera", "Cayenne", "Macan", "Taycan"],
  },
  {
    id: "tesla",
    slug: "tesla",
    name: "Tesla",
    models: ["Model 3", "Model Y", "Model S", "Model X"],
  },
  {
    id: "mini",
    slug: "mini",
    name: "MINI",
    models: ["Cooper", "Countryman", "Clubman"],
  },
  {
    id: "smart",
    slug: "smart",
    name: "smart",
    models: ["fortwo", "forfour", "#1"],
  },
  {
    id: "suzuki",
    slug: "suzuki",
    name: "Suzuki",
    models: ["Swift", "Ignis", "Vitara", "S-Cross", "Jimny"],
  },
  {
    id: "mitsubishi",
    slug: "mitsubishi",
    name: "Mitsubishi",
    models: ["Space Star", "ASX", "Eclipse Cross", "Outlander"],
  },
  {
    id: "dacia",
    slug: "dacia",
    name: "Dacia",
    models: ["Sandero", "Duster", "Logan", "Spring", "Jogger"],
  },
  {
    id: "jeep",
    slug: "jeep",
    name: "Jeep",
    models: ["Renegade", "Compass", "Wrangler", "Grand Cherokee"],
  },
  {
    id: "land-rover",
    slug: "land-rover",
    name: "Land Rover",
    models: ["Defender", "Discovery", "Range Rover", "Range Rover Sport", "Evoque", "Velar"],
  },
  {
    id: "jaguar",
    slug: "jaguar",
    name: "Jaguar",
    models: ["XE", "XF", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  },
  {
    id: "alfa-romeo",
    slug: "alfa-romeo",
    name: "Alfa Romeo",
    models: ["Giulia", "Stelvio", "Tonale"],
  },
];

export function getMakeBySlug(slug: string): CarMakeData | undefined {
  return carMakes.find((m) => m.slug === slug);
}

export function getModelsByMake(makeId: string): string[] {
  const make = carMakes.find((m) => m.id === makeId);
  return make?.models ?? [];
}

export function getAllMakes() {
  return carMakes.map((m) => ({ id: m.id, slug: m.slug, name: m.name }));
}
