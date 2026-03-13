// All shared types for Bristol Forage

export interface Species {
  id: string;
  name: string;
  latinName: string;
  category: Category;
  prep: PrepType;
  seasonStart: number; // 0-indexed month (0 = Jan)
  seasonEnd: number;
  habitat: string;
  keyId: [string, string]; // exactly 2 summary ID points
  lookalike: string | null;
  nutrition: {
    protein: number;  // 0–1 relative scale
    vitaminC: number;
    iron: number;
  };
  locationHint: string;
  full: {
    idPoints: string[];
    harvest: string;
    uses: string;
    equipment: string;
    storage: string;
    lookalikeFull: string;
    sporePrint?: string; // fungi only
  };
}

export type Category = "Hedgerow" | "Fungi" | "Greens" | "Herbs" | "Fruits";
export type PrepType = "raw" | "cook" | "process";

export type HabitatType = "Woodland" | "Hedgerow" | "Wetland" | "Grassland";

export interface Location {
  id: string;
  name: string;
  gridRef: string;
  habitat: HabitatType;
  colour: string;
  lat: number;
  lng: number;
  access: string;
  description: string;
  speciesIds: string[]; // references to Species.id
}

export interface Sighting {
  id: string;
  species: string;
  location: string;
  gridRef: string;
  date: string;
  weather: string;
  conditions: string;
  notes: string;
  name: string;
  hasPhoto: boolean;
  approved: boolean;
  createdAt: string;
}

export const HABITAT_COLOURS: Record<HabitatType, string> = {
  Woodland: "#4a7c5f",
  Hedgerow: "#7a6248",
  Wetland: "#557278",
  Grassland: "#6a4878",
};

export const CATEGORY_LIST: Category[] = [
  "Hedgerow",
  "Fungi",
  "Greens",
  "Herbs",
  "Fruits",
];

export const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
] as const;
