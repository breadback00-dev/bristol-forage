import { Location } from "@/lib/types";

export const locations: Location[] = [
  {
    id: "leigh-woods",
    name: "Leigh Woods",
    gridRef: "ST5573",
    habitat: "Woodland",
    colour: "#4a7c5f",
    lat: 51.462,
    lng: -2.645,
    access: "National Trust. Free pedestrian access. Car park off B3129.",
    description:
      "Ancient semi-natural woodland on the Avon Gorge slopes, rich in fungi, wild garlic and spring greens.",
    speciesIds: [
      "chanterelle",
      "wild-garlic",
      "wood-sorrel",
      "hazel",
      "stinging-nettle",
      "hedgehog-mushroom",
    ],
  },
  {
    id: "blaise-castle",
    name: "Blaise Castle",
    gridRef: "ST5578",
    habitat: "Woodland",
    colour: "#4a7c5f",
    lat: 51.51,
    lng: -2.634,
    access:
      "Bristol City Council. Open access. Car park on Kings Weston Road.",
    description:
      "Wooded gorge and meadow estate in north Bristol. Good for hedgerow fruits and spring greens.",
    speciesIds: [
      "blackberry",
      "elder",
      "hawthorn",
      "wild-garlic",
      "jack-by-the-hedge",
      "stinging-nettle",
    ],
  },
  {
    id: "goblin-combe",
    name: "Goblin Combe",
    gridRef: "ST4665",
    habitat: "Woodland",
    colour: "#4a7c5f",
    lat: 51.392,
    lng: -2.765,
    access: "Avon Wildlife Trust reserve. Open access on marked paths.",
    description:
      "Limestone woodland combe with diverse flora. Notable for autumn fungi and spring woodland herbs.",
    speciesIds: [
      "chanterelle",
      "giant-puffball",
      "wood-sorrel",
      "yarrow",
      "hazel",
      "wild-garlic",
    ],
  },
  {
    id: "warmley-forest",
    name: "Warmley Forest Park",
    gridRef: "ST6672",
    habitat: "Woodland",
    colour: "#4a7c5f",
    lat: 51.477,
    lng: -2.463,
    access:
      "South Gloucestershire Council. Free access. Car park off Tower Road North.",
    description:
      "Former industrial site replanted as mixed woodland. Emerging foraging spot with fungi and hedgerow fruits.",
    speciesIds: [
      "blackberry",
      "chanterelle",
      "hedgehog-mushroom",
      "hazel",
      "elder",
      "chicken-of-the-woods",
    ],
  },
  {
    id: "ashton-court",
    name: "Ashton Court Estate",
    gridRef: "ST5572",
    habitat: "Hedgerow",
    colour: "#7a6248",
    lat: 51.452,
    lng: -2.652,
    access:
      "Bristol City Council. Open access. Car park on Long Ashton Road.",
    description:
      "Vast deer park and woodland estate with excellent hedgerows and mature trees.",
    speciesIds: [
      "blackberry",
      "hawthorn",
      "sloe",
      "elder",
      "giant-puffball",
      "crab-apple",
    ],
  },
  {
    id: "avon-gorge",
    name: "Avon Gorge",
    gridRef: "ST5673",
    habitat: "Hedgerow",
    colour: "#7a6248",
    lat: 51.458,
    lng: -2.628,
    access:
      "National Trust / Natural England SSSI. Keep strictly to paths. Clifton Suspension Bridge area.",
    description:
      "Dramatic limestone gorge with rare flora. Forage only common species on footpath margins.",
    speciesIds: [
      "three-cornered-leek",
      "wild-garlic",
      "yarrow",
      "jack-by-the-hedge",
      "rose-hip",
    ],
  },
  {
    id: "dundry-hill",
    name: "Dundry Hill",
    gridRef: "ST5566",
    habitat: "Hedgerow",
    colour: "#7a6248",
    lat: 51.394,
    lng: -2.608,
    access:
      "Mix of farmland and public footpaths. Stick to rights of way.",
    description:
      "High ground south of Bristol with panoramic views. Superb hedgerow species and grassland herbs.",
    speciesIds: [
      "blackberry",
      "sloe",
      "hawthorn",
      "yarrow",
      "rose-hip",
      "crab-apple",
    ],
  },
  {
    id: "failand",
    name: "Failand",
    gridRef: "ST5170",
    habitat: "Hedgerow",
    colour: "#7a6248",
    lat: 51.434,
    lng: -2.713,
    access:
      "Public footpaths through farmland. OS Explorer 154 recommended.",
    description:
      "Rolling farmland west of Bristol with ancient hedgerows rich in sloe, hawthorn and rose hip.",
    speciesIds: [
      "sloe",
      "hawthorn",
      "blackberry",
      "rose-hip",
      "elder",
      "crab-apple",
    ],
  },
  {
    id: "snuff-mills",
    name: "Snuff Mills",
    gridRef: "ST6276",
    habitat: "Wetland",
    colour: "#557278",
    lat: 51.486,
    lng: -2.528,
    access:
      "Bristol City Council. Open access along River Frome. Car park off Frenchay Park Road.",
    description:
      "River valley with wet woodland and streamside vegetation. Good for spring greens.",
    speciesIds: [
      "wild-garlic",
      "stinging-nettle",
      "three-cornered-leek",
      "wood-sorrel",
      "jack-by-the-hedge",
    ],
  },
  {
    id: "stockwood",
    name: "Stockwood Open Space",
    gridRef: "ST6268",
    habitat: "Grassland",
    colour: "#6a4878",
    lat: 51.404,
    lng: -2.534,
    access:
      "Bristol City Council. Open access. Car park off Stockwood Road.",
    description:
      "Unimproved grassland in south Bristol. Excellent for yarrow, hawthorn and late summer fungi.",
    speciesIds: [
      "yarrow",
      "hawthorn",
      "giant-puffball",
      "blackberry",
      "rose-hip",
      "sloe",
    ],
  },
];

/** Look up a single location by ID */
export function getLocationById(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}
