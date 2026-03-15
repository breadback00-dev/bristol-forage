import { Species } from "@/lib/types";

export const species: Species[] = [
  {
    id: "blackberry",
    name: "Blackberry",
    latinName: "Rubus fruticosus agg.",
    category: "Hedgerow",
    prep: "raw",
    seasonStart: 5,
    seasonEnd: 9,
    habitat: "Hedgerow, scrub, woodland edge",
    keyId: [
      "Thorny arching canes with compound leaves of 3\u20135 leaflets",
      "Distinctive black segmented drupes when fully ripe",
    ],
    lookalike: null,
    nutrition: { protein: 0.3, vitaminC: 0.9, iron: 0.4 },
    locationHint:
      "Ashton Court and Dundry Hill hedgerows are reliable late-summer blackberry spots.",
    full: {
      idPoints: [
        "Thorny arching canes, leaves 3\u20135 leaflets",
        "Black segmented drupes when ripe; red when unripe",
        "White to pink five-petalled flowers in summer",
        "Biennial canes: primocanes year one, floricanes year two",
        "No dangerous lookalikes in UK",
      ],
      harvest:
        "Pick from late July. Best after a dry spell. Avoid berries below waist height on roadsides.",
      uses: "Fresh eating, jam, crumble, wine, cordial, leaf tea.",
      equipment: "Container, gloves optional.",
      storage: "Refrigerate up to 3 days or freeze immediately.",
      lookalikeFull: "No dangerous lookalikes in UK.",
    },
  },
  {
    id: "sloe",
    name: "Sloe / Blackthorn",
    latinName: "Prunus spinosa",
    category: "Hedgerow",
    prep: "process",
    seasonStart: 8,
    seasonEnd: 10,
    habitat: "Hedgerow, scrub, woodland edge",
    keyId: [
      "Dense thorny shrub with small oval blue-black berries with waxy bloom",
      "Flowers appear on bare stems before leaves in early spring",
    ],
    lookalike:
      "Cherry Laurel (Prunus laurocerasus) \u2014 larger leaves, larger fruit. Berries mildly toxic.",
    nutrition: { protein: 0.2, vitaminC: 0.6, iron: 0.3 },
    locationHint:
      "Failand and Dundry Hill ancient hedgerows have excellent blackthorn stands.",
    full: {
      idPoints: [
        "Dense spiny shrub, thorns sharp and sturdy",
        "Small oval blue-black berries with waxy blue-grey bloom",
        "Very astringent \u2014 not palatable raw",
        "White flowers in March before leaves emerge",
        "Flowers paired or solitary directly on dark stems",
      ],
      harvest:
        "Best after first frost which breaks down astringency. October onwards. Wear gloves.",
      uses: "Sloe gin, sloe vodka, jam, chutney, wine.",
      equipment: "Thick gloves, sturdy container.",
      storage:
        "Freeze before use to replicate frost action. Lasts months in gin.",
      lookalikeFull:
        "Cherry Laurel \u2014 much larger shrub with big glossy leaves. Berries mildly toxic in quantity.",
    },
  },
  {
    id: "elder",
    name: "Elder",
    latinName: "Sambucus nigra",
    category: "Hedgerow",
    prep: "cook",
    seasonStart: 3,
    seasonEnd: 9,
    habitat: "Hedgerow, woodland edge, disturbed ground",
    keyId: [
      "Compound leaves 5\u20137 leaflets, strong smell when crushed",
      "Flat-topped cream flower clusters (June) or drooping black berry clusters (August+)",
    ],
    lookalike:
      "Dwarf Elder (Sambucus ebulus) \u2014 TOXIC. Water Hemlock (Cicuta virosa) \u2014 DEADLY. Always check compound leaves and smell.",
    nutrition: { protein: 0.2, vitaminC: 0.85, iron: 0.4 },
    locationHint:
      "Blaise Castle estate boundaries and Avon Gorge footpath margins have mature elder.",
    full: {
      idPoints: [
        "Compound leaves 5\u20137 leaflets, serrated, strong unpleasant smell",
        "Flat-topped corymb of tiny cream flowers in June",
        "Heavy drooping clusters of small black berries from August",
        "Grey-brown warty bark on older stems",
        "Pithy hollow stems \u2014 do not confuse with other hollow-stemmed plants",
      ],
      harvest:
        "Flowers: pick on dry sunny mornings. Berries: must cook \u2014 raw berries cause nausea. Never eat any other part.",
      uses: "Elderflower cordial, fritters, champagne; elderberry syrup, wine, jam.",
      equipment: "Scissors, bags, kitchen strainer.",
      storage:
        "Flowers: use same day or dry. Berries: freeze or process within 2 days.",
      lookalikeFull:
        "Dwarf Elder (Sambucus ebulus) \u2014 toxic, grows from ground, leaves smell fouler. Water Hemlock (Cicuta virosa) \u2014 DEADLY, in wetlands, hollow ribbed stems \u2014 always double-check hollow-stemmed plants near water.",
    },
  },
  {
    id: "hawthorn",
    name: "Hawthorn",
    latinName: "Crataegus monogyna",
    category: "Hedgerow",
    prep: "process",
    seasonStart: 7,
    seasonEnd: 9,
    habitat: "Hedgerow, scrub, woodland edge",
    keyId: [
      "Deeply lobed leaves with sturdy sharp thorns",
      "Dense clusters of deep red oval berries (haws) from September",
    ],
    lookalike: null,
    nutrition: { protein: 0.15, vitaminC: 0.5, iron: 0.3 },
    locationHint:
      "Dundry Hill and Stockwood Open Space offer excellent hawthorn hedgerows.",
    full: {
      idPoints: [
        "Deeply lobed dark green leaves, 3\u20137 lobes",
        "Sturdy sharp thorns on twigs",
        "Dense clusters of deep red oval berries from September",
        "White five-petalled blossom (May) in spring",
        "Single stone inside each berry \u2014 do not eat seeds",
      ],
      harvest:
        "Pick haws from September. Avoid eating the seeds which contain cyanogenic compounds.",
      uses: "Haw ketchup, jelly, fruit leather, herbal tea from flowers and leaves, wine.",
      equipment: "Container, strainer, muslin for jelly-making.",
      storage: "Refrigerate up to a week. Cook and strain for preserves.",
      lookalikeFull:
        "No dangerous lookalikes. Holly berries (Ilex aquifolium) are toxic but easily distinguished by glossy spiny leaves.",
    },
  },
  {
    id: "crab-apple",
    name: "Crab Apple",
    latinName: "Malus sylvestris",
    category: "Hedgerow",
    prep: "process",
    seasonStart: 7,
    seasonEnd: 9,
    habitat: "Hedgerow, woodland edge, old orchards",
    keyId: [
      "Small apple-like fruit 2\u20134cm, yellow-green to red-blushed",
      "Spiny branches and oval toothed leaves",
    ],
    lookalike: null,
    nutrition: { protein: 0.1, vitaminC: 0.6, iron: 0.2 },
    locationHint:
      "Ashton Court estate and Failand farmland footpaths have old crab apple trees.",
    full: {
      idPoints: [
        "Small apple-like fruit 2\u20134cm, yellow-green often with red flush",
        "Spiny or semi-spiny branches",
        "Oval toothed leaves, slightly hairy beneath",
        "Pink-white apple blossom in April\u2013May",
        "Hard, very sour flesh \u2014 not palatable raw",
      ],
      harvest:
        "Harvest September\u2013October after first cold nights. Best for cooking not eating raw.",
      uses: "Crab apple jelly, verjuice, cider blending, pectin source for other jams.",
      equipment: "Container, jelly bag.",
      storage: "Keep cool up to 2 weeks. Process into jelly or freeze.",
      lookalikeFull:
        "No dangerous lookalikes. Distinguish from cultivated apple escapes by smaller size and spiny branches.",
    },
  },
  {
    id: "chanterelle",
    name: "Chanterelle",
    latinName: "Cantharellus cibarius",
    category: "Fungi",
    prep: "cook",
    seasonStart: 5,
    seasonEnd: 9,
    habitat: "Deciduous and mixed woodland, often near oak and beech",
    keyId: [
      "Egg-yolk yellow, wavy-edged cap with forking false gills (ridges, not true blade gills)",
      "Faint fruity apricot scent",
    ],
    lookalike:
      "False Chanterelle (Hygrophoropsis aurantiaca) \u2014 toxic, true crowded gills, more orange. Jack-o-lantern (Omphalotus illudens) \u2014 TOXIC, true gills, grows in clusters on wood.",
    nutrition: { protein: 0.6, vitaminC: 0.4, iron: 0.5 },
    locationHint:
      "Leigh Woods mixed woodland is Bristol\u2019s best chanterelle habitat \u2014 search near old oaks in July.",
    full: {
      idPoints: [
        "Egg-yolk to golden yellow throughout including stem",
        "Wavy irregular cap margin, convex then funnel-shaped",
        "False gills: forking ridges running down stem, not true blade gills",
        "Faint fruity apricot scent",
        "Firm white flesh does not change colour when cut",
        "Grows singly or scattered, never in dense clusters",
      ],
      harvest:
        "Cut at base with a knife. Brush clean in the field. Do not wash until cooking.",
      uses: "Pan-fried in butter, risotto, pasta, omelette, preserved in oil.",
      equipment: "Knife, paper bag (not plastic), soft brush.",
      storage:
        "Use within 3 days. Refrigerate loosely wrapped. Dries well.",
      lookalikeFull:
        "False Chanterelle (Hygrophoropsis aurantiaca) \u2014 more orange, true crowded gills, grows near conifers or on wood. Jack-o-lantern \u2014 true gills, dense clusters on wood or buried roots, may glow faintly in dark.",
      sporePrint: "Pale yellow",
    },
  },
  {
    id: "hedgehog-mushroom",
    name: "Hedgehog Mushroom",
    latinName: "Hydnum repandum",
    category: "Fungi",
    prep: "cook",
    seasonStart: 7,
    seasonEnd: 10,
    habitat: "Deciduous woodland, especially beech and oak",
    keyId: [
      "Cream to pale buff cap with hanging spines (teeth) beneath instead of gills",
      "Solid pale stem, firm flesh",
    ],
    lookalike:
      "No dangerous lookalikes \u2014 the only British mushroom with pale spines beneath a pale cap.",
    nutrition: { protein: 0.55, vitaminC: 0.2, iron: 0.4 },
    locationHint:
      "Leigh Woods and Goblin Combe beech woodland in autumn \u2014 look under beech leaf litter.",
    full: {
      idPoints: [
        "Cream to pale salmon-buff irregular cap, often wavy",
        "Distinctive cream spines (teeth) hanging beneath cap instead of gills",
        "Solid pale cream stem, sometimes off-centre",
        "Mild pleasant smell, firm white flesh",
        "Often grows in troops or rings",
      ],
      harvest:
        "One of the safest fungi for beginners due to unique ID. Cut at base. Scrape off spines if bitter.",
      uses: "Pan-fried, soup, pasta. Older specimens can be bitter \u2014 blanch first.",
      equipment: "Knife, brush, basket.",
      storage: "Use within 4 days. Dries or pickles well.",
      lookalikeFull:
        "No dangerous lookalikes in UK. The distinctive spines make this mushroom unique.",
      sporePrint: "White",
    },
  },
  {
    id: "giant-puffball",
    name: "Giant Puffball",
    latinName: "Calvatia gigantea",
    category: "Fungi",
    prep: "cook",
    seasonStart: 6,
    seasonEnd: 9,
    habitat: "Grassland, parkland, woodland edge",
    keyId: [
      "Football-sized pure white sphere with no visible cap, gills or stem",
      "Flesh must be pure white throughout when sliced \u2014 discard if otherwise",
    ],
    lookalike:
      "Common Earthball (Scleroderma citrinum) \u2014 TOXIC, smaller, patterned skin, purple-black inside. Amanita egg \u2014 DEADLY: always slice every puffball to check interior.",
    nutrition: { protein: 0.65, vitaminC: 0.15, iron: 0.35 },
    locationHint:
      "Ashton Court deer park and Stockwood Open Space grassland in August\u2013September.",
    full: {
      idPoints: [
        "Large white to cream sphere, 10\u201380cm across",
        "No cap, gills, or stem visible externally",
        "Flesh must be pure white throughout when sliced",
        "Outer skin smooth and slightly felty",
        "You must slice every single specimen before eating to verify white interior",
      ],
      harvest:
        "ONLY eat when flesh is pure white throughout. Yellow or purple interior means inedible or dangerous.",
      uses: "Sliced thickly and pan-fried in butter, battered, dried as powder seasoning.",
      equipment: "Sharp knife, large basket.",
      storage: "Use within 2 days. Slice and freeze.",
      lookalikeFull:
        "Common Earthball \u2014 much smaller, yellow-brown patterned skin, purple-black inside. Amanita egg (DEADLY) \u2014 slicing reveals mushroom silhouette inside. You must slice every puffball.",
      sporePrint: "Olive-brown at maturity",
    },
  },
  {
    id: "chicken-of-the-woods",
    name: "Chicken of the Woods",
    latinName: "Laetiporus sulphureus",
    category: "Fungi",
    prep: "cook",
    seasonStart: 4,
    seasonEnd: 9,
    habitat: "On living or dead wood, especially oak, cherry, sweet chestnut",
    keyId: [
      "Vivid yellow-orange overlapping shelf brackets growing directly from wood",
      "Pale yellow-white juicy flesh when young",
    ],
    lookalike:
      "No close dangerous lookalikes. Avoid specimens growing on yew or robinia which may absorb host toxins.",
    nutrition: { protein: 0.7, vitaminC: 0.2, iron: 0.4 },
    locationHint:
      "Leigh Woods and Warmley Forest Park oak trees \u2014 look for vivid orange brackets from June.",
    full: {
      idPoints: [
        "Vivid bright yellow-orange overlapping bracket shelves",
        "Growing directly from living or dead wood",
        "Pores beneath (not gills or teeth)",
        "Soft juicy chicken-like flesh when young and fresh",
        "Fades to dull ochre with age \u2014 only harvest bright young specimens",
      ],
      harvest:
        "Only harvest young, bright, moist specimens from the outer edge. Avoid old pale dried brackets. Must cook thoroughly.",
      uses: "Vegan chicken substitute, stir-fry, curries, pies.",
      equipment: "Knife, large bag.",
      storage: "Use within 3 days. Freezes well when cooked.",
      lookalikeFull:
        "No dangerous lookalikes. IMPORTANT: avoid specimens growing on yew (Taxus baccata) or robinia \u2014 these may absorb toxins from the host tree.",
    },
  },
  {
    id: "wild-garlic",
    name: "Wild Garlic",
    latinName: "Allium ursinum",
    category: "Greens",
    prep: "raw",
    seasonStart: 1,
    seasonEnd: 4,
    habitat: "Damp deciduous woodland, especially near streams",
    keyId: [
      "Broad bright green oval leaves with unmistakable garlic smell when crushed",
      "White star-shaped flowers in April\u2013May",
    ],
    lookalike:
      "Lily of the Valley (Convallaria majalis) \u2014 TOXIC, no garlic smell. Lords and Ladies (Arum maculatum) \u2014 TOXIC, arrow-shaped leaves. CRITICAL: always smell-test every leaf.",
    nutrition: { protein: 0.4, vitaminC: 0.85, iron: 0.6 },
    locationHint:
      "Leigh Woods valley floor and Snuff Mills riverbanks carpet with wild garlic in April.",
    full: {
      idPoints: [
        "Broad bright green oval leaves with pointed tip",
        "Strong unmistakable garlic smell when crushed \u2014 the critical test",
        "White star-shaped flowers in April\u2013May",
        "Single leaf per stem",
        "Small white bulb in damp soil",
      ],
      harvest:
        "March\u2013May before flowers fully open for best flavour. Always smell-test each leaf individually.",
      uses: "Pesto, soup, salad, compound butter, pickled buds, dried powder.",
      equipment: "Scissors or knife, bag.",
      storage:
        "Use within 3 days. Wilts quickly. Make pesto to extend shelf life.",
      lookalikeFull:
        "Lily of the Valley \u2014 TOXIC, no garlic smell, parallel-veined leaves, grows in drier spots. Lords and Ladies \u2014 TOXIC, arrow or spear-shaped leaves, no garlic smell. The smell test is definitive \u2014 always crush and smell before picking.",
    },
  },
  {
    id: "stinging-nettle",
    name: "Stinging Nettle",
    latinName: "Urtica dioica",
    category: "Greens",
    prep: "cook",
    seasonStart: 0,
    seasonEnd: 4,
    habitat: "Disturbed ground, hedgerows, woodland edge, near water",
    keyId: [
      "Heart-shaped serrated leaves covered in hollow stinging hairs",
      "Opposite paired leaves up erect square stems",
    ],
    lookalike: null,
    nutrition: { protein: 0.75, vitaminC: 0.8, iron: 0.85 },
    locationHint:
      "Leigh Woods woodland edge and Snuff Mills riverbanks. Always wear thick gloves when picking.",
    full: {
      idPoints: [
        "Heart-shaped strongly serrated leaves with hollow stinging hairs",
        "Leaves in opposite pairs up erect square stems",
        "Green-grey drooping flower catkins in summer",
        "Fibrous stems \u2014 historically used for cordage",
        "Pick young top four leaves only in spring",
      ],
      harvest:
        "Pick young top four leaves before flowering. Thick gloves essential \u2014 stings penetrate thin gloves.",
      uses: "Nettle soup, pasta, pesto, tea, beer \u2014 wilted like spinach.",
      equipment: "Thick gloves, scissors, bag.",
      storage:
        "Use within 2 days. Blanch and freeze for longer storage.",
      lookalikeFull:
        "Dead-nettles (Lamium spp.) \u2014 similar leaf shape but no sting, have tubular flowers. Completely harmless.",
    },
  },
  {
    id: "three-cornered-leek",
    name: "Three-Cornered Leek",
    latinName: "Allium triquetrum",
    category: "Greens",
    prep: "raw",
    seasonStart: 0,
    seasonEnd: 3,
    habitat: "Hedgerow base, roadside, damp shaded spots",
    keyId: [
      "Distinctly triangular stem \u2014 run your fingers down the stem to feel three corners",
      "White bell flowers with green stripe in drooping clusters",
    ],
    lookalike:
      "Snowdrop (Galanthus nivalis) \u2014 mildly toxic, no garlic smell, broader leaves. Always smell-test.",
    nutrition: { protein: 0.35, vitaminC: 0.55, iron: 0.3 },
    locationHint:
      "Avon Gorge footpath margins and Snuff Mills hedgerow bases. Invasive species \u2014 foraging actively encouraged.",
    full: {
      idPoints: [
        "Triangular three-cornered stem \u2014 distinctive to the touch",
        "Flat strap-like leaves",
        "White bell-shaped flowers with green mid-stripe in drooping umbel",
        "Strong garlic-onion smell when crushed",
        "Invasive non-native: widespread across Bristol",
      ],
      harvest:
        "February\u2013April before flowering is best. Run a finger along the stem \u2014 the three corners are the key test.",
      uses: "Raw in salads, pesto, garlic bread substitute, pickled in vinegar.",
      equipment: "Scissors, bag.",
      storage: "Use within 3 days. Makes excellent pesto.",
      lookalikeFull:
        "Snowdrop \u2014 no garlic smell, broader glaucous leaves, rounded stem. The triangular stem and garlic scent together confirm ID.",
    },
  },
  {
    id: "wood-sorrel",
    name: "Wood Sorrel",
    latinName: "Oxalis acetosella",
    category: "Greens",
    prep: "raw",
    seasonStart: 2,
    seasonEnd: 6,
    habitat: "Shaded woodland floor, often on mossy logs and banks",
    keyId: [
      "Trefoil clover-like leaves that fold down at night and in bright sun",
      "Delicate white flowers with pink veins",
    ],
    lookalike: null,
    nutrition: { protein: 0.1, vitaminC: 0.6, iron: 0.2 },
    locationHint:
      "Leigh Woods and Goblin Combe woodland floor \u2014 often carpets mossy banks in deep shade.",
    full: {
      idPoints: [
        "Three heart-shaped leaflets like a shamrock \u2014 folds closed at night",
        "Bright green, often slightly yellow-green",
        "Delicate white flowers with lilac-pink veins in spring",
        "Grows in dense carpets on shaded woodland floor",
        "Pleasant sharp lemony taste from oxalic acid",
      ],
      harvest:
        "Pick small amounts only \u2014 contains oxalic acid. Do not eat in large quantities or daily.",
      uses: "Garnish, salads, lemony freshness added to fish or soup.",
      equipment: "Fingers, small container.",
      storage: "Use same day \u2014 very delicate and wilts quickly.",
      lookalikeFull:
        "Clover (Trifolium) \u2014 rounded leaflets, does not fold, no sour taste. Completely harmless.",
    },
  },
  {
    id: "jack-by-the-hedge",
    name: "Jack-by-the-Hedge",
    latinName: "Alliaria petiolata",
    category: "Herbs",
    prep: "raw",
    seasonStart: 0,
    seasonEnd: 4,
    habitat: "Hedgerow base, woodland edge, shaded paths",
    keyId: [
      "Heart-shaped toothed leaves with mild garlic-mustard smell when crushed",
      "White four-petalled flowers appearing from April",
    ],
    lookalike: null,
    nutrition: { protein: 0.3, vitaminC: 0.7, iron: 0.4 },
    locationHint:
      "Avon Gorge footpath edges and Snuff Mills hedgerow bases are reliable spots from February.",
    full: {
      idPoints: [
        "Heart-shaped to kidney-shaped toothed leaves",
        "Mild garlic-mustard scent when crushed",
        "White four-petalled crucifer flowers in April\u2013May",
        "First-year rosette of rounded leaves; second-year stem grows tall",
        "Long thin seed pods (siliques) follow the flowers",
      ],
      harvest:
        "Young leaves best in spring before flowering. Older leaves become progressively more bitter.",
      uses: "Fresh in salads and sandwiches, pesto, sauce for lamb, stuffing.",
      equipment: "Scissors, bag.",
      storage: "Use within 2 days. Does not keep well.",
      lookalikeFull:
        "No dangerous lookalikes. The garlic-mustard scent and four-petalled white flowers are distinctive.",
    },
  },
  {
    id: "yarrow",
    name: "Yarrow",
    latinName: "Achillea millefolium",
    category: "Herbs",
    prep: "raw",
    seasonStart: 4,
    seasonEnd: 8,
    habitat: "Grassland, roadsides, sunny meadows",
    keyId: [
      "Feathery, finely divided fern-like leaves with aromatic medicinal scent",
      "Flat-topped clusters of tiny white or pale pink flowers",
    ],
    lookalike:
      "Poison Hemlock (Conium maculatum) \u2014 DEADLY. Hemlock has purple-blotched hollow stem and unpleasant mousy smell. Yarrow stem is SOLID. Always check the stem.",
    nutrition: { protein: 0.25, vitaminC: 0.5, iron: 0.45 },
    locationHint:
      "Stockwood Open Space and Dundry Hill grassland. Excellent from June in open sunny spots.",
    full: {
      idPoints: [
        "Finely divided feathery leaves, multi-pinnate, fern-like in texture",
        "Aromatic slightly medicinal scent when crushed",
        "Flat-topped corymb of tiny white or pale pink flowers",
        "Solid stem \u2014 critical distinction from hollow-stemmed lookalikes",
        "Leaves alternate up stem",
      ],
      harvest:
        "Pick leaves and flowers from June. Use sparingly as a herb \u2014 strong flavour.",
      uses: "Herbal tea, flavouring for beer and spirits, traditional wound herb, salad garnish.",
      equipment: "Scissors, paper bag for drying.",
      storage:
        "Fresh use within 3 days. Dries excellently \u2014 hang in bunches.",
      lookalikeFull:
        "Poison Hemlock (Conium maculatum) \u2014 DEADLY. Purple-blotched hollow stem with unpleasant mousy smell. KEY TEST: yarrow has a solid stem and aromatic (pleasant) smell. Always check these two points together.",
    },
  },
  {
    id: "rose-hip",
    name: "Rose Hip",
    latinName: "Rosa canina",
    category: "Fruits",
    prep: "process",
    seasonStart: 7,
    seasonEnd: 10,
    habitat: "Hedgerow, scrub, woodland edge",
    keyId: [
      "Oval to elongated red-orange berries on thorny rose stems",
      "Five pointed sepals visible at the tip of each hip",
    ],
    lookalike: null,
    nutrition: { protein: 0.1, vitaminC: 0.95, iron: 0.3 },
    locationHint:
      "Dundry Hill and Failand hedgerows have extensive dog rose with excellent autumn hip crops.",
    full: {
      idPoints: [
        "Oval to elongated red-orange berries, 1\u20132cm",
        "Growing on thorny arching rose stems",
        "Five sepals visible at tip (sometimes dropped)",
        "Multiple small hairy seeds inside \u2014 must strain",
        "Pinnate leaves with 5\u20137 toothed leaflets",
      ],
      harvest:
        "Harvest after first frost if possible. Must use a fine strainer \u2014 the hairy seeds cause severe internal irritation.",
      uses: "Rose hip syrup, jelly, tea, wine. Exceptionally high in vitamin C.",
      equipment:
        "Container, fine strainer or jelly bag \u2014 ESSENTIAL for removing seeds.",
      storage:
        "Process within a week. Syrup keeps refrigerated for a month.",
      lookalikeFull:
        "No dangerous lookalikes. All other wild roses also produce edible hips.",
    },
  },
  {
    id: "hazel",
    name: "Hazel / Cobnut",
    latinName: "Corylus avellana",
    category: "Fruits",
    prep: "raw",
    seasonStart: 6,
    seasonEnd: 8,
    habitat: "Woodland edge, hedgerow, coppiced woodland",
    keyId: [
      "Round to oval nuts in ragged green leafy husks in clusters of 2\u20135",
      "Multi-stemmed or coppiced shrub with round toothed leaves",
    ],
    lookalike: null,
    nutrition: { protein: 0.8, vitaminC: 0.1, iron: 0.5 },
    locationHint:
      "Leigh Woods and Goblin Combe have natural hazel coppice. Nuts are ready from August.",
    full: {
      idPoints: [
        "Round-oval nuts in ragged green involucre husk",
        "Husks in clusters of 2\u20135 at branch tips",
        "Round toothed alternate leaves with pointed tip",
        "Male catkins (lamb\u2019s tails) appear in late winter",
        "Multi-stemmed coppiced habit typical in managed woodland",
      ],
      harvest:
        "August\u2013September when husks still green for fresh cobnuts. October for fully dried hazelnuts.",
      uses: "Raw as a snack, roasted, hazelnut butter, praline, baking, hazelnut oil.",
      equipment: "Container.",
      storage:
        "Fresh cobnuts last 2 weeks refrigerated. Dry fully for several months storage.",
      lookalikeFull: "No dangerous lookalikes.",
    },
  },
  {
    id: "alexanders",
    name: "Alexanders",
    latinName: "Smyrnium olusatrum",
    category: "Greens",
    prep: "cook",
    seasonStart: 0,
    seasonEnd: 4,
    habitat: "Coastal paths, hedgerows, roadsides, waste ground",
    keyId: [
      "Celery-like glossy dark green leaves and yellowish-green flowers",
      "Robust, hollow, grooved stems that smell like celery when crushed",
    ],
    lookalike: "Hemlock (Conium maculatum) \u2014 DEADLY. Hemlock has purple-spotted stems and mousy smell. Alexanders has glossy leaves and celery scent.",
    nutrition: { protein: 0.2, vitaminC: 0.4, iron: 0.3 },
    locationHint: "Avon Gorge and coastal paths near Clevedon often have abundant Alexanders in early spring.",
    full: {
      idPoints: [
        "Glossy dark green leaves, divided into 3 segments",
        "Yellow-green umbel flower clusters in early spring",
        "Robust grooved hollow stems",
        "Smells like celery or parsley when crushed",
        "Seeds turn black when ripe",
      ],
      harvest: "Young stems and leaf stalks in late winter and early spring. Roots can be harvested in autumn.",
      uses: "Stems can be candied, steamed like asparagus, or added to soups and stews.",
      equipment: "Knife, container.",
      storage: "Use within 3 days. Stems keep better if kept upright in water.",
      lookalikeFull: "Hemlock (Conium maculatum) \u2014 DEADLY. Hemlock stems have purple spots and a mousy smell. Alexanders leaves are much glossier and smell like celery.",
    },
  },
  {
    id: "dandelion",
    name: "Dandelion",
    latinName: "Taraxacum officinale",
    category: "Greens",
    prep: "raw",
    seasonStart: 1,
    seasonEnd: 9,
    habitat: "Grassland, lawns, roadsides, disturbed ground",
    keyId: [
      "Deeply toothed rosette leaves with hollow stems producing milky white sap when broken",
      "Bright yellow composite flower, single per hollow stem; spherical clock seedhead",
    ],
    lookalike: null,
    nutrition: { protein: 0.35, vitaminC: 0.65, iron: 0.55 },
    locationHint:
      "Ubiquitous across Bristol parks and verges. Young spring leaves before flowering are least bitter.",
    full: {
      idPoints: [
        "Deeply lobed toothed leaves in a flat ground-level rosette",
        "Hollow stems and leaf midribs exude milky white latex when cut",
        "Single bright yellow composite flower per hollow stem",
        "Spherical white clock seedhead of parachute seeds",
        "Thick taproot with dark brown skin and white interior",
      ],
      harvest:
        "Pick young leaves before flowering in spring for least bitterness. Flowers and roots also edible.",
      uses: "Leaves in salads or sautéed like spinach; flowers in wine or fritters; roots roasted as coffee substitute.",
      equipment: "Bag or small container.",
      storage: "Use within 2 days. Blanch and freeze for longer storage.",
      lookalikeFull:
        "No dangerous lookalikes. Cat's ear (Hypochaeris radicata) and hawkweeds are all edible. The hollow stem with milky latex is definitive.",
    },
  },
  {
    id: "cleavers",
    name: "Cleavers",
    latinName: "Galium aparine",
    category: "Greens",
    prep: "cook",
    seasonStart: 1,
    seasonEnd: 5,
    habitat: "Hedgerow, woodland edge, disturbed ground",
    keyId: [
      "Whorls of 6–8 narrow sticky leaves up clinging stems — adheres to clothing instantly",
      "Tiny bristly round fruits and minute white four-petalled flowers",
    ],
    lookalike: null,
    nutrition: { protein: 0.2, vitaminC: 0.4, iron: 0.25 },
    locationHint:
      "Hedgerow bases throughout Bristol. Young spring growth before May is most palatable — later growth is too tough.",
    full: {
      idPoints: [
        "Whorls of 6–8 narrow lance-shaped leaves with tiny backward-pointing bristles",
        "Square stem with fine bristles — sticks instantly to clothing on contact",
        "Tiny round hooked fruits that cling to animal fur and clothing",
        "Minute white four-petalled flowers in small axillary clusters",
        "Bright green young growth in spring — darker and tougher later",
      ],
      harvest:
        "Pick young growing tips in spring only. Older plants become too fibrous. Do not eat raw in quantity.",
      uses: "Juice pressed from young growth as a spring tonic; cooked and strained like a vegetable; seeds roasted as a coffee substitute.",
      equipment: "Scissors, bag.",
      storage: "Use within 2 days.",
      lookalikeFull:
        "All other bedstraws (Galium spp.) are edible. The whorled sticky leaves on a square stem are entirely distinctive.",
    },
  },
  {
    id: "ground-elder",
    name: "Ground Elder",
    latinName: "Aegopodium podagraria",
    category: "Greens",
    prep: "cook",
    seasonStart: 1,
    seasonEnd: 4,
    habitat: "Shaded gardens, woodland edge, damp disturbed ground",
    keyId: [
      "Compound leaves in threes-of-threes — three main divisions each split into three toothed leaflets",
      "Ridged solid stem with pleasant celery-like smell when crushed",
    ],
    lookalike:
      "Hemlock (Conium maculatum) — DEADLY. Hemlock has purple-blotched HOLLOW stem with mousy smell. Ground elder stem is SOLID and smells of celery. Always check stem and smell all umbellifers.",
    nutrition: { protein: 0.3, vitaminC: 0.55, iron: 0.4 },
    locationHint:
      "Common in shaded gardens and woodland edges throughout Bristol. A persistent garden weed — foraging actively helps control it.",
    full: {
      idPoints: [
        "Compound leaves: three main leaflets each divided into three toothed sub-leaflets",
        "Bright fresh green in spring, smooth leaf surface",
        "Ridged stem, solid throughout — critical distinction from hollow-stemmed lookalikes",
        "Pleasant celery-parsley smell when crushed",
        "Flat-topped white umbel flowers in May–June",
      ],
      harvest:
        "Harvest young spring leaves before flowering — late February to April. Older leaves become rank and unpleasant.",
      uses: "Cooked like spinach, in soups, risotto, pasta. Flavour similar to mild parsley or angelica.",
      equipment: "Scissors, bag.",
      storage: "Use within 2 days. Blanch and freeze.",
      lookalikeFull:
        "Hemlock (DEADLY) — hollow purple-blotched stem, mousy unpleasant smell. Cow parsley (edible, but ID carefully). Ground elder's divided compound leaves and SOLID ridged stem are the key tests. Never eat any umbellifer without checking stem and smell.",
    },
  },
  {
    id: "sweet-chestnut",
    name: "Sweet Chestnut",
    latinName: "Castanea sativa",
    category: "Fruits",
    prep: "cook",
    seasonStart: 8,
    seasonEnd: 9,
    habitat: "Woodland, parkland, planted estate trees",
    keyId: [
      "Long (15–25cm) glossy toothed leaves; very spiny husks — spines dense and hair-like",
      "Husks split to reveal 2–3 shiny brown flattened nuts with a pointed tip",
    ],
    lookalike:
      "Horse Chestnut (Aesculus hippocastanum) — NOT edible. Horse chestnuts have palmate compound leaves and much smoother, fewer-spined conker shells. Sweet chestnut has simple elongated serrated leaves.",
    nutrition: { protein: 0.5, vitaminC: 0.25, iron: 0.4 },
    locationHint:
      "Ashton Court estate and Leigh Woods have mature sweet chestnut trees producing reliable autumn crops. Look for split husks on the ground from October.",
    full: {
      idPoints: [
        "Simple (not compound) long glossy toothed leaves, 15–25cm",
        "Very dense spiny green husks — spines hair-like, 2–3cm long",
        "2–3 shiny brown flattened nuts per husk with a pale pointed tip",
        "Bark on older trees has distinctive spiral fissures",
        "Quite different from horse chestnut: simple leaves, much spinier husk",
      ],
      harvest:
        "Collect from September when husks split and nuts fall. Wear thick gloves — spines are sharp.",
      uses: "Roasted over fire, boiled, puréed, stuffing, gluten-free flour, marrons glacés.",
      equipment: "Thick gloves, bag.",
      storage:
        "Keep cool and dry up to 2 weeks. Freeze after peeling. Dries well as flour.",
      lookalikeFull:
        "Horse chestnut (inedible, toxic raw) has palmate compound leaves (like an open hand) and smoother shells with fewer thick spines. Sweet chestnut has simple, long, serrated single leaves and very densely spiny husks.",
    },
  },
  {
    id: "raspberry",
    name: "Wild Raspberry",
    latinName: "Rubus idaeus",
    category: "Fruits",
    prep: "raw",
    seasonStart: 6,
    seasonEnd: 8,
    habitat: "Woodland clearings, scrub, hedgerow edge",
    keyId: [
      "Soft red berry that leaves a hollow core when picked — the defining field characteristic",
      "Erect canes with fine pale thorns; compound leaves of 3–5 leaflets, white-downy beneath",
    ],
    lookalike: null,
    nutrition: { protein: 0.3, vitaminC: 0.85, iron: 0.45 },
    locationHint:
      "Leigh Woods clearings and Oldbury Court estate have wild raspberry patches in sunny woodland gaps.",
    full: {
      idPoints: [
        "Erect biennial canes with fine pale downward-curved thorns",
        "Compound leaves 3–5 leaflets, bright green above, conspicuously white-downy beneath",
        "Small five-petalled drooping white flowers",
        "Soft red aggregated drupes — leaves a distinct hollow core on the stem when picked",
        "Stems light greenish-white with white waxy bloom in first year",
      ],
      harvest:
        "Pick fully red and soft from July. Early morning harvesting best. Handle gently — crush easily.",
      uses: "Fresh eating, jam, cordial, wine, vinegar, baking, as a fresh garnish.",
      equipment: "Small container to avoid crushing.",
      storage:
        "Use within 1–2 days. Freeze immediately for longer storage.",
      lookalikeFull:
        "No dangerous lookalikes. All wild Rubus species produce edible berries. The hollow core when picked is unmistakable.",
    },
  },
  {
    id: "meadowsweet",
    name: "Meadowsweet",
    latinName: "Filipendula ulmaria",
    category: "Herbs",
    prep: "process",
    seasonStart: 5,
    seasonEnd: 7,
    habitat: "Riverbanks, wet meadows, damp woodland edge",
    keyId: [
      "Dense frothy clusters of tiny cream flowers with an intense sweet almond fragrance",
      "Pinnate leaves with a large terminal leaflet and smaller lateral pairs, white-felted beneath",
    ],
    lookalike: null,
    nutrition: { protein: 0.1, vitaminC: 0.35, iron: 0.2 },
    locationHint:
      "Snuff Mills and the Avon Valley riverbanks have abundant meadowsweet throughout July. The scent announces it from metres away.",
    full: {
      idPoints: [
        "Dense frothy panicle of tiny cream flowers, each with five petals",
        "Intensely sweet almond-like fragrance — distinctive and unmissable",
        "Pinnate leaves: large terminal leaflet, smaller side leaflets, white-felted below",
        "Erect stems, often reddish, 60–120cm tall",
        "Grows in large colonies on damp or wet ground",
      ],
      harvest:
        "Collect flower heads when fully open and fragrant. Use same day or dry immediately at low heat.",
      uses: "Cordial, wine, ice cream flavouring, herbal tea. Contains salicylates (aspirin precursor) — avoid if aspirin-sensitive.",
      equipment: "Scissors, paper bag.",
      storage:
        "Use fresh within 24 hours or dry in bunches at low heat. Dried flowers keep for months.",
      lookalikeFull:
        "No dangerous lookalikes. Elder flowers are flat-topped corymbs on woody stems. Meadowsweet is herbaceous with the distinctive sweet almond scent.",
    },
  },
  {
    id: "penny-bun",
    name: "Penny Bun / Cep",
    latinName: "Boletus edulis",
    category: "Fungi",
    prep: "cook",
    seasonStart: 7,
    seasonEnd: 9,
    habitat: "Deciduous and coniferous woodland, under oak and beech",
    keyId: [
      "Bun-shaped tan-brown cap with fine white network (reticulation) on the upper stem",
      "White to pale cream pores beneath cap — do not bruise blue when pressed",
    ],
    lookalike:
      "Satan's Bolete (Rubroboletus satanas) — TOXIC, red pores, blue-staining flesh. RULE: any bolete with red pores OR that stains blue strongly when cut — do not eat.",
    nutrition: { protein: 0.8, vitaminC: 0.1, iron: 0.6 },
    locationHint:
      "Leigh Woods near old oaks and Goblin Combe beech woodland from August. One of Britain's finest edible fungi.",
    full: {
      idPoints: [
        "Smooth bun-shaped cap, tan to mid-brown, often paler at margin",
        "White to cream pores beneath — do not discolour significantly when pressed",
        "Pale bulbous stem with fine white net reticulation on upper portion",
        "Solid dense white flesh does not change colour when cut or bruised",
        "Pleasant nutty mushroom smell",
      ],
      harvest:
        "Cut at base. Check for maggot tunnels. Older specimens often holed. Brush clean — do not wash.",
      uses: "The king of edible fungi. Pan-fried in butter, risotto, pasta, dried for intense flavour.",
      equipment: "Knife, paper bag, soft brush.",
      storage:
        "Use within 3 days. Slice and dry for exceptional shelf life — flavour intensifies dramatically when dried.",
      lookalikeFull:
        "Satan's Bolete — red/orange pores, strong blue-staining flesh, under lime trees. Bay Bolete (edible) stains faintly blue. RULE: avoid all boletes with red pores or strong blue staining on cutting.",
      sporePrint: "Olive-brown",
    },
  },
  {
    id: "oyster-mushroom",
    name: "Oyster Mushroom",
    latinName: "Pleurotus ostreatus",
    category: "Fungi",
    prep: "cook",
    seasonStart: 9,
    seasonEnd: 1,
    habitat: "Dead standing or fallen deciduous wood, especially beech and elm",
    keyId: [
      "Fan to oyster-shaped grey to blue-grey caps in overlapping tiers from dead wood",
      "White gills running down a very short stubby off-centre stem; no ring",
    ],
    lookalike:
      "Angel Wings (Pleurocybella porrigens) — TOXIC, pure white, grows on conifer wood only. Oyster mushrooms are grey-brown and grow exclusively on deciduous trees.",
    nutrition: { protein: 0.65, vitaminC: 0.2, iron: 0.45 },
    locationHint:
      "Dead beech and elm throughout Leigh Woods and Blaise Castle estate. One of the few good edible fungi available in mild winters.",
    full: {
      idPoints: [
        "Fan to oyster-shaped cap, grey to blue-grey to grey-brown",
        "Growing in overlapping tiers or clusters on dead deciduous wood",
        "Crowded white gills running down a very short stubby lateral stem",
        "Mild pleasant anise-mushroom scent",
        "No ring; cap margin inrolled when young",
      ],
      harvest:
        "Harvest young, firm, fresh specimens. Twist off cleanly. Older specimens toughen and lose flavour quickly.",
      uses: "Pan-fried, stir-fry, soups, pasta. Strong flavour pairs well with garlic and butter.",
      equipment: "Knife or hands, bag.",
      storage: "Use within 3–4 days. Sauté and freeze for longer storage.",
      lookalikeFull:
        "Angel Wings (Pleurocybella porrigens) — pure white, grows only on conifer wood, reported toxic. Oyster mushrooms are grey-brown on deciduous trees exclusively. Confirm wood species if uncertain.",
      sporePrint: "Lilac-white",
    },
  },
];

/** Look up a single species by ID */
export function getSpeciesById(id: string): Species | undefined {
  return species.find((s) => s.id === id);
}

/** Get all species in a given category */
export function getSpeciesByCategory(cat: string): Species[] {
  if (cat === "all") return species;
  return species.filter((s) => s.category === cat);
}
