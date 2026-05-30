export interface CarMakeData {
  id: string;
  slug: string;
  name: string;
  models: string[];
}

/** Sentinel value used in the UI to let users type a custom model name. */
export const OTHER_MODEL_SENTINEL = "__OTHER__";

export const carMakes: CarMakeData[] = [
  {
    id: "audi",
    slug: "audi",
    name: "Audi",
    models: [
      "A1", "A2", "A3", "A4", "A4 allroad", "A5", "A6", "A6 allroad",
      "A7", "A8", "Q2", "Q3", "Q4 e-tron", "Q5", "Q5 Sportback",
      "Q6 e-tron", "Q7", "Q8", "Q8 e-tron",
      "S1", "S3", "S4", "S5", "S6", "S7", "S8",
      "SQ2", "SQ5", "SQ7", "SQ8",
      "RS3", "RS4", "RS5", "RS6", "RS7", "RS Q3", "RS Q8",
      "TT", "TTS", "TT RS", "R8",
      "e-tron", "e-tron S", "e-tron GT", "RS e-tron GT",
      "80", "90", "100", "200", "Cabriolet", "Coupé",
      "Sonstiges",
    ],
  },
  {
    id: "bmw",
    slug: "bmw",
    name: "BMW",
    models: [
      "1er", "2er", "2er Active Tourer", "2er Gran Coupé", "3er", "4er",
      "4er Gran Coupé", "5er", "6er", "6er Gran Turismo", "7er", "8er",
      "X1", "X2", "X3", "X4", "X5", "X6", "X7", "XM",
      "Z1", "Z3", "Z4", "Z8",
      "i3", "i4", "i5", "i7", "iX", "iX1", "iX2", "iX3",
      "M2", "M3", "M4", "M5", "M6", "M8",
      "X3 M", "X4 M", "X5 M", "X6 M",
      "i8",
      "Sonstiges",
    ],
  },
  {
    id: "mercedes-benz",
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    models: [
      "A-Klasse", "B-Klasse", "C-Klasse", "CL", "CLA", "CLC", "CLK", "CLS",
      "E-Klasse", "EQA", "EQB", "EQC", "EQE", "EQE SUV", "EQS", "EQS SUV",
      "EQV", "G-Klasse", "GL", "GLA", "GLB", "GLC", "GLC Coupé",
      "GLE", "GLE Coupé", "GLK", "GLS", "Marco Polo",
      "M-Klasse", "R-Klasse", "S-Klasse", "SL", "SLC", "SLK", "SLR", "SLS AMG",
      "AMG GT", "AMG GT 4-Türer", "AMG ONE",
      "Citan", "Sprinter", "T-Klasse", "V-Klasse", "Viano", "Vito",
      "Sonstiges",
    ],
  },
  {
    id: "volkswagen",
    slug: "volkswagen",
    name: "Volkswagen",
    models: [
      "Amarok", "Arteon", "Atlas", "Beetle", "Bora", "Caddy", "California",
      "Caravelle", "CC", "Crafter", "Cross Golf", "Cross Polo", "Cross Touran",
      "Eos", "Fox", "Golf", "Golf Plus", "Golf Sportsvan", "ID.3", "ID.4",
      "ID.5", "ID.7", "ID. Buzz", "Jetta", "Käfer", "Lupo", "Multivan",
      "New Beetle", "Passat", "Passat CC", "Phaeton", "Polo", "Scirocco",
      "Sharan", "T-Cross", "T-Roc", "T5", "T6", "T6.1", "T7", "Taigo",
      "Tiguan", "Tiguan Allspace", "Touareg", "Touran", "Transporter", "Up!",
      "Sonstiges",
    ],
  },
  {
    id: "opel",
    slug: "opel",
    name: "Opel",
    models: [
      "Adam", "Agila", "Ampera", "Ampera-e", "Antara", "Astra",
      "Calibra", "Cascada", "Combo", "Corsa", "Crossland", "Crossland X",
      "Frontera", "Grandland", "Grandland X", "GT", "Insignia",
      "Karl", "Meriva", "Mokka", "Mokka-e", "Mokka X", "Movano",
      "Omega", "Signum", "Speedster", "Tigra", "Vectra", "Vivaro",
      "Zafira", "Zafira Tourer", "Zafira Life", "Zafira-e Life",
      "Sonstiges",
    ],
  },
  {
    id: "ford",
    slug: "ford",
    name: "Ford",
    models: [
      "B-Max", "Bronco", "C-Max", "Capri", "Cougar", "EcoSport", "Edge",
      "Escape", "Escort", "Explorer", "F-150", "Fiesta", "Focus",
      "Fusion", "Galaxy", "Grand C-Max", "Ka", "Ka+", "Kuga",
      "Maverick", "Mondeo", "Mustang", "Mustang Mach-E", "Probe", "Puma",
      "Ranger", "S-Max", "Scorpio", "Tourneo Connect", "Tourneo Courier",
      "Tourneo Custom", "Transit", "Transit Connect", "Transit Courier",
      "Transit Custom",
      "Sonstiges",
    ],
  },
  {
    id: "toyota",
    slug: "toyota",
    name: "Toyota",
    models: [
      "Auris", "Avensis", "Aygo", "Aygo X", "bZ4X", "Camry", "C-HR",
      "Celica", "Corolla", "Corolla Cross", "GR86", "GR Supra",
      "GT86", "Highlander", "Hilux", "IQ", "Land Cruiser",
      "MR2", "Mirai", "Prius", "Prius+", "Proace", "Proace City",
      "Proace Verso", "RAV4", "Sequoia", "Supra", "Tundra",
      "Urban Cruiser", "Verso", "Yaris", "Yaris Cross",
      "Sonstiges",
    ],
  },
  {
    id: "honda",
    slug: "honda",
    name: "Honda",
    models: [
      "Accord", "Civic", "CR-V", "CR-Z", "e", "e:Ny1",
      "FR-V", "HR-V", "Insight", "Jazz", "Legend", "NSX",
      "Prelude", "S2000", "Shuttle", "Stream", "ZR-V",
      "Sonstiges",
    ],
  },
  {
    id: "hyundai",
    slug: "hyundai",
    name: "Hyundai",
    models: [
      "Accent", "Atos", "Bayon", "Coupé", "Elantra", "Getz", "Galloper",
      "Genesis", "Grand Santa Fe", "i10", "i20", "i30", "i40", "i50",
      "IONIQ", "IONIQ 5", "IONIQ 5 N", "IONIQ 6", "ix20", "ix35", "ix55",
      "Kona", "Kona Elektro", "Matrix", "Nexo", "Santa Fe",
      "Staria", "Terracan", "Trajet", "Tucson", "Veloster",
      "Sonstiges",
    ],
  },
  {
    id: "kia",
    slug: "kia",
    name: "Kia",
    models: [
      "Carens", "Carnival", "Ceed", "Cerato", "EV3", "EV6", "EV9",
      "Magentis", "Niro", "Opirus", "Optima", "Picanto", "ProCeed",
      "Rio", "Sorento", "Soul", "Sportage", "Stinger", "Stonic",
      "Venga", "XCeed",
      "Sonstiges",
    ],
  },
  {
    id: "skoda",
    slug: "skoda",
    name: "Skoda",
    models: [
      "Citigo", "Elroq", "Enyaq", "Enyaq Coupé", "Fabia", "Favorit",
      "Felicia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Rapid",
      "Roomster", "Scala", "Superb", "Yeti",
      "Sonstiges",
    ],
  },
  {
    id: "seat",
    slug: "seat",
    name: "SEAT",
    models: [
      "Alhambra", "Altea", "Arona", "Arosa", "Ateca", "Cordoba",
      "Exeo", "Ibiza", "Leon", "Mii", "Tarraco", "Toledo",
      "Sonstiges",
    ],
  },
  {
    id: "cupra",
    slug: "cupra",
    name: "CUPRA",
    models: [
      "Ateca", "Born", "Formentor", "Leon", "Tavascan", "Terramar",
      "Sonstiges",
    ],
  },
  {
    id: "renault",
    slug: "renault",
    name: "Renault",
    models: [
      "Alaskan", "Arkana", "Austral", "Avantime", "Captur", "Clio",
      "Espace", "Express", "Fluence", "Grand Scenic", "Kadjar",
      "Kangoo", "Koleos", "Laguna", "Latitude", "Master",
      "Megane", "Megane E-Tech", "Modus", "Rafale",
      "Scenic", "Scenic E-Tech", "Symbioz", "Talisman",
      "Trafic", "Twingo", "Twizy", "Vel Satis", "Wind", "Zoe",
      "Sonstiges",
    ],
  },
  {
    id: "peugeot",
    slug: "peugeot",
    name: "Peugeot",
    models: [
      "1007", "107", "108", "2008", "206", "207", "208", "3008",
      "301", "306", "307", "308", "4007", "4008", "405", "406",
      "407", "5008", "508", "607", "806", "807",
      "Bipper", "Boxer", "e-208", "e-2008", "e-3008", "Expert",
      "iOn", "Partner", "RCZ", "Rifter", "Traveller",
      "Sonstiges",
    ],
  },
  {
    id: "citroen",
    slug: "citroen",
    name: "Citroën",
    models: [
      "Berlingo", "C-Crosser", "C-Elysée", "C-Zero", "C1", "C2",
      "C3", "C3 Aircross", "C3 Picasso", "C4", "C4 Aircross",
      "C4 Cactus", "C4 Picasso", "C4 X", "C5", "C5 Aircross",
      "C5 X", "C6", "C8", "DS3", "DS4", "DS5",
      "Grand C4 Picasso", "Grand C4 SpaceTourer", "Jumper", "Jumpy",
      "Nemo", "Saxo", "SpaceTourer", "Xsara", "Xsara Picasso",
      "ë-C4",
      "Sonstiges",
    ],
  },
  {
    id: "ds",
    slug: "ds",
    name: "DS Automobiles",
    models: [
      "DS 3", "DS 3 Crossback", "DS 4", "DS 5", "DS 7", "DS 9",
      "Sonstiges",
    ],
  },
  {
    id: "fiat",
    slug: "fiat",
    name: "Fiat",
    models: [
      "124 Spider", "500", "500C", "500e", "500L", "500X",
      "Bravo", "Croma", "Doblò", "Ducato", "Fiorino", "Freemont",
      "Grande Punto", "Idea", "Linea", "Marea", "Multipla",
      "Panda", "Punto", "Punto Evo", "Qubo", "Sedici",
      "Stilo", "Strada", "Talento", "Tipo", "Ulysse",
      "Sonstiges",
    ],
  },
  {
    id: "mazda",
    slug: "mazda",
    name: "Mazda",
    models: [
      "2", "3", "5", "6", "CX-3", "CX-30", "CX-5", "CX-60",
      "CX-7", "CX-80", "CX-9", "MX-30", "MX-5", "RX-7", "RX-8",
      "Sonstiges",
    ],
  },
  {
    id: "nissan",
    slug: "nissan",
    name: "Nissan",
    models: [
      "350Z", "370Z", "Almera", "Ariya", "Cabstar", "e-NV200",
      "GT-R", "Interstar", "Juke", "Leaf", "Micra", "Murano",
      "Navara", "Note", "NP300", "NV200", "NV300", "Pathfinder",
      "Pixo", "Primastar", "Primera", "Pulsar", "Qashqai",
      "Qashqai+2", "Terrano", "Tiida", "Townstar", "X-Trail", "Z",
      "Sonstiges",
    ],
  },
  {
    id: "volvo",
    slug: "volvo",
    name: "Volvo",
    models: [
      "C30", "C40", "C70", "EX30", "EX40", "EX90",
      "S40", "S60", "S80", "S90",
      "V40", "V40 Cross Country", "V50", "V60", "V60 Cross Country",
      "V70", "V90", "V90 Cross Country",
      "XC40", "XC60", "XC70", "XC90",
      "Sonstiges",
    ],
  },
  {
    id: "porsche",
    slug: "porsche",
    name: "Porsche",
    models: [
      "356", "718 Boxster", "718 Cayman", "718 Spyder",
      "911", "918 Spyder", "924", "928", "944", "968",
      "Boxster", "Cayenne", "Cayenne Coupé", "Cayman",
      "Macan", "Panamera", "Taycan", "Taycan Cross Turismo",
      "Sonstiges",
    ],
  },
  {
    id: "tesla",
    slug: "tesla",
    name: "Tesla",
    models: [
      "Model 3", "Model S", "Model X", "Model Y", "Cybertruck", "Roadster",
      "Sonstiges",
    ],
  },
  {
    id: "mini",
    slug: "mini",
    name: "MINI",
    models: [
      "Clubman", "Convertible", "Cooper", "Cooper S", "Countryman",
      "Coupé", "John Cooper Works", "One", "Paceman", "Roadster",
      "Sonstiges",
    ],
  },
  {
    id: "smart",
    slug: "smart",
    name: "smart",
    models: [
      "#1", "#3", "forfour", "fortwo", "Roadster",
      "Sonstiges",
    ],
  },
  {
    id: "suzuki",
    slug: "suzuki",
    name: "Suzuki",
    models: [
      "Alto", "Baleno", "Celerio", "Grand Vitara", "Ignis", "Jimny",
      "Kizashi", "Liana", "S-Cross", "Splash", "Swift", "SX4",
      "SX4 S-Cross", "Vitara", "Wagon R+", "Across", "Swace",
      "Sonstiges",
    ],
  },
  {
    id: "mitsubishi",
    slug: "mitsubishi",
    name: "Mitsubishi",
    models: [
      "ASX", "Carisma", "Colt", "Eclipse Cross", "Galant", "Grandis",
      "i-MiEV", "L200", "Lancer", "Outlander", "Pajero", "Space Star",
      "Sonstiges",
    ],
  },
  {
    id: "dacia",
    slug: "dacia",
    name: "Dacia",
    models: [
      "Dokker", "Duster", "Jogger", "Lodgy", "Logan", "Logan MCV",
      "Sandero", "Sandero Stepway", "Spring",
      "Sonstiges",
    ],
  },
  {
    id: "jeep",
    slug: "jeep",
    name: "Jeep",
    models: [
      "Avenger", "Cherokee", "Commander", "Compass", "Gladiator",
      "Grand Cherokee", "Patriot", "Renegade", "Wrangler",
      "Sonstiges",
    ],
  },
  {
    id: "land-rover",
    slug: "land-rover",
    name: "Land Rover",
    models: [
      "Defender", "Discovery", "Discovery Sport", "Freelander",
      "Range Rover", "Range Rover Evoque", "Range Rover Sport",
      "Range Rover Velar",
      "Sonstiges",
    ],
  },
  {
    id: "jaguar",
    slug: "jaguar",
    name: "Jaguar",
    models: [
      "E-Pace", "F-Pace", "F-Type", "I-Pace", "S-Type",
      "X-Type", "XE", "XF", "XJ", "XK",
      "Sonstiges",
    ],
  },
  {
    id: "alfa-romeo",
    slug: "alfa-romeo",
    name: "Alfa Romeo",
    models: [
      "145", "146", "147", "155", "156", "159", "164", "166",
      "4C", "Brera", "Giulia", "Giulietta", "GT", "GTV",
      "Junior", "MiTo", "Spider", "Stelvio", "Tonale",
      "Sonstiges",
    ],
  },
  {
    id: "abarth",
    slug: "abarth",
    name: "Abarth",
    models: [
      "124 Spider", "500", "500C", "500e", "595", "695",
      "Grande Punto", "Punto",
      "Sonstiges",
    ],
  },
  {
    id: "maserati",
    slug: "maserati",
    name: "Maserati",
    models: [
      "Ghibli", "GranCabrio", "GranSport", "GranTurismo",
      "Grecale", "Levante", "MC20", "Quattroporte",
      "Sonstiges",
    ],
  },
  {
    id: "lamborghini",
    slug: "lamborghini",
    name: "Lamborghini",
    models: [
      "Aventador", "Countach", "Diablo", "Gallardo",
      "Huracán", "Murciélago", "Revuelto", "Urus",
      "Sonstiges",
    ],
  },
  {
    id: "ferrari",
    slug: "ferrari",
    name: "Ferrari",
    models: [
      "296 GTB", "296 GTS", "360", "458", "488",
      "California", "F12", "F40", "F430", "F8",
      "FF", "GTC4Lusso", "LaFerrari", "Portofino",
      "Purosangue", "Roma", "SF90", "812",
      "Sonstiges",
    ],
  },
  {
    id: "bentley",
    slug: "bentley",
    name: "Bentley",
    models: [
      "Bentayga", "Continental GT", "Continental GTC",
      "Flying Spur", "Mulsanne",
      "Sonstiges",
    ],
  },
  {
    id: "rolls-royce",
    slug: "rolls-royce",
    name: "Rolls-Royce",
    models: [
      "Cullinan", "Dawn", "Ghost", "Phantom", "Spectre", "Wraith",
      "Sonstiges",
    ],
  },
  {
    id: "aston-martin",
    slug: "aston-martin",
    name: "Aston Martin",
    models: [
      "DB11", "DB12", "DB9", "DBS", "DBX", "Rapide",
      "V8 Vantage", "V12 Vantage", "Valhalla", "Vanquish", "Vantage",
      "Sonstiges",
    ],
  },
  {
    id: "mclaren",
    slug: "mclaren",
    name: "McLaren",
    models: [
      "540C", "570S", "600LT", "620R", "650S", "675LT",
      "720S", "750S", "765LT", "Artura", "GT", "P1", "Senna",
      "Sonstiges",
    ],
  },
  {
    id: "lotus",
    slug: "lotus",
    name: "Lotus",
    models: [
      "Eletre", "Elise", "Emira", "Europa", "Evija",
      "Evora", "Exige",
      "Sonstiges",
    ],
  },
  {
    id: "subaru",
    slug: "subaru",
    name: "Subaru",
    models: [
      "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy",
      "Levorg", "Outback", "Solterra", "Trezia", "WRX", "XV",
      "Sonstiges",
    ],
  },
  {
    id: "lexus",
    slug: "lexus",
    name: "Lexus",
    models: [
      "CT", "ES", "GS", "IS", "LC", "LFA", "LS",
      "LX", "NX", "RC", "RX", "RZ", "SC", "UX",
      "Sonstiges",
    ],
  },
  {
    id: "infiniti",
    slug: "infiniti",
    name: "Infiniti",
    models: [
      "EX", "FX", "G", "M", "Q30", "Q50", "Q60", "Q70",
      "QX30", "QX50", "QX60", "QX70", "QX80",
      "Sonstiges",
    ],
  },
  {
    id: "chrysler",
    slug: "chrysler",
    name: "Chrysler",
    models: [
      "300", "300C", "Crossfire", "Grand Voyager", "Neon",
      "Pacifica", "PT Cruiser", "Sebring", "Town & Country", "Voyager",
      "Sonstiges",
    ],
  },
  {
    id: "dodge",
    slug: "dodge",
    name: "Dodge",
    models: [
      "Avenger", "Caliber", "Challenger", "Charger", "Durango",
      "Journey", "Nitro", "RAM", "Viper",
      "Sonstiges",
    ],
  },
  {
    id: "chevrolet",
    slug: "chevrolet",
    name: "Chevrolet",
    models: [
      "Aveo", "Camaro", "Captiva", "Colorado", "Corvette", "Cruze",
      "Epica", "Equinox", "Lacetti", "Malibu", "Matiz",
      "Orlando", "Spark", "Suburban", "Tahoe", "Trailblazer",
      "Trax",
      "Sonstiges",
    ],
  },
  {
    id: "cadillac",
    slug: "cadillac",
    name: "Cadillac",
    models: [
      "ATS", "BLS", "CT4", "CT5", "CTS", "Escalade",
      "Lyriq", "SRX", "STS", "XT4", "XT5", "XT6",
      "Sonstiges",
    ],
  },
  {
    id: "ssangyong",
    slug: "ssangyong",
    name: "SsangYong",
    models: [
      "Actyon", "Korando", "Kyron", "Musso", "Rexton",
      "Rodius", "Tivoli", "Torres", "XLV",
      "Sonstiges",
    ],
  },
  {
    id: "polestar",
    slug: "polestar",
    name: "Polestar",
    models: [
      "1", "2", "3", "4",
      "Sonstiges",
    ],
  },
  {
    id: "genesis",
    slug: "genesis",
    name: "Genesis",
    models: [
      "G70", "G80", "G90", "GV60", "GV70", "GV80",
      "Sonstiges",
    ],
  },
  {
    id: "mg",
    slug: "mg",
    name: "MG",
    models: [
      "3", "4", "5", "EHS", "HS", "Marvel R",
      "MG4", "MG5", "ZS", "ZS EV", "Cyberster",
      "Sonstiges",
    ],
  },
  {
    id: "byd",
    slug: "byd",
    name: "BYD",
    models: [
      "Atto 3", "Dolphin", "Han", "Seal", "Seal U",
      "Tang",
      "Sonstiges",
    ],
  },
  {
    id: "lancia",
    slug: "lancia",
    name: "Lancia",
    models: [
      "Delta", "Musa", "Phedra", "Thema", "Ypsilon",
      "Sonstiges",
    ],
  },
  {
    id: "saab",
    slug: "saab",
    name: "Saab",
    models: [
      "9-3", "9-5", "900", "9000",
      "Sonstiges",
    ],
  },
  {
    id: "rover",
    slug: "rover",
    name: "Rover",
    models: [
      "25", "45", "75", "200", "400", "600",
      "Sonstiges",
    ],
  },
  {
    id: "andere",
    slug: "andere",
    name: "Andere Marke",
    models: [
      "Sonstiges",
    ],
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
