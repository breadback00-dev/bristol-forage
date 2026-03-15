"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { species } from "@/data/species";
import { inSeasonCount } from "@/lib/seasons";

// ── Accent types ───────────────────────────────────────────────────────────────

type Accent = "green" | "amber" | "red" | "teal" | "blue" | "brown";

const ACCENT: Record<Accent, { icon: string; text: string; bg: string; border: string }> = {
  green:  { icon: "text-forage-green",    text: "text-forage-green-dark", bg: "bg-forage-green-light",   border: "border-forage-green/40" },
  amber:  { icon: "text-amber-600",       text: "text-amber-800",         bg: "bg-amber-50",             border: "border-amber-300" },
  red:    { icon: "text-forage-red",      text: "text-forage-red",        bg: "bg-forage-red-light",     border: "border-red-200" },
  teal:   { icon: "text-teal-600",        text: "text-teal-800",          bg: "bg-teal-50",              border: "border-teal-200" },
  blue:   { icon: "text-blue-600",        text: "text-blue-800",          bg: "bg-blue-50",              border: "border-blue-200" },
  brown:  { icon: "text-forage-brown",    text: "text-forage-ink",        bg: "bg-forage-brown-light",   border: "border-forage-border" },
};

// ── Accordion ─────────────────────────────────────────────────────────────────

function Accordion({
  title, summary, icon, accent, number, open, onToggle, children,
}: {
  title: string; summary: string; icon: string; accent: Accent;
  number: number; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  const a = ACCENT[accent];
  return (
    <div className={`bg-white rounded-2xl border border-forage-border overflow-hidden transition-all duration-200 ${open ? "shadow-md" : "shadow-sm"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-forage-bg transition-colors"
      >
        {/* Icon bubble */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl border ${a.bg} ${a.border}`}>
          <span>{icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-forage-ink text-base leading-tight">{title}</p>
          <p className="font-sans text-forage-muted text-xs mt-0.5">{summary}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-sans text-[10px] text-forage-muted font-bold tabular-nums">
            {String(number).padStart(2, "0")}
          </span>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-forage-green" : "bg-forage-bg border border-forage-border"}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke={open ? "white" : "#9a9690"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-5 pb-5 border-t border-forage-border pt-4 font-sans text-sm text-forage-ink leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Helper components ──────────────────────────────────────────────────────────

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-forage-red-light border-l-4 border-forage-red rounded-r-xl px-4 py-3 text-forage-red text-[13px] leading-snug">
      <span className="font-bold mr-1">⚠</span> {children}
    </div>
  );
}

function Rule({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="w-6 h-6 rounded-full bg-forage-green text-white font-sans font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
        {n}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <div className="w-5 h-5 rounded border-2 border-forage-green flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-forage-green text-[10px] font-bold leading-none">✓</span>
      </div>
      <span className="text-sm font-sans text-forage-ink leading-relaxed">{children}</span>
    </div>
  );
}

function PlantCard({ href, name, desc, emoji }: { href: string; name: string; desc: string; emoji: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 bg-forage-green-light hover:bg-forage-green group rounded-xl px-4 py-3 transition-colors">
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <div>
        <p className="font-serif font-bold text-sm text-forage-green-dark group-hover:text-white transition-colors leading-tight">{name}</p>
        <p className="font-sans text-xs text-forage-muted group-hover:text-white/80 transition-colors leading-snug mt-0.5">{desc}</p>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4 ml-auto flex-shrink-0 text-forage-green group-hover:text-white transition-colors">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    </Link>
  );
}

function GearItem({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex items-start gap-3 bg-forage-bg rounded-xl px-4 py-3">
      <span className="text-forage-green font-bold text-base leading-none mt-0.5 flex-shrink-0">·</span>
      <div>
        <span className="font-sans font-semibold text-sm text-forage-ink">{label}</span>
        <span className="font-sans text-forage-muted text-sm"> — {note}</span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function EssentialsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const seasonCount = useMemo(() => inSeasonCount(species), []);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  const sections: {
    title: string; summary: string; icon: string; accent: Accent; content: React.ReactNode;
  }[] = [
    {
      title: "Beginner's Guide to Foraging",
      summary: "How to start foraging safely in Bristol",
      icon: "🌱",
      accent: "green",
      content: (
        <>
          <p>
            Foraging means gathering wild plants, fungi, and berries from the landscape around you — for free, from nature. Bristol is one of the UK's most foraging-rich cities, surrounded by ancient woodland, hedgerows, riverbanks, and grassland.
          </p>
          <div className="bg-forage-green-light border border-forage-green/30 rounded-xl px-4 py-3 text-forage-green-dark text-[13px]">
            <strong>Start simple.</strong> Begin with species that are distinctive, abundant, and have no dangerous lookalikes — blackberries, stinging nettles, and wild garlic are perfect first plants.
          </div>
          <p>
            <strong>Always confirm using multiple sources</strong> — a printed field guide, an experienced forager, and this website. No single source should be your only check.
          </p>
          <p>
            Check what's in season before you head out. Use our{" "}
            <Link href="/guide" className="text-forage-green font-semibold hover:underline underline-offset-2">Field Guide →</Link>{" "}
            to see what's available right now.
          </p>
          <p className="text-forage-muted text-xs italic border-l-2 border-forage-border pl-3">
            The golden rule: if you're not absolutely certain, leave it. There will always be another opportunity — an incorrect identification can't be undone.
          </p>
        </>
      ),
    },
    {
      title: "UK Foraging Laws",
      summary: "What you can legally pick and where",
      icon: "⚖️",
      accent: "blue",
      content: (
        <>
          <p>
            Personal foraging — picking wild plants, fungi, and berries for your own use — is permitted under the{" "}
            <strong>Theft Act 1968</strong>. You may collect fruit, foliage, fungi, and flowers growing wild on public land without committing an offence.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-blue-800 text-[13px]">
            <strong>Never uproot any plant without landowner permission.</strong> Uprooting is a specific offence under the Theft Act, regardless of where you are.
          </div>
          <p>
            Some species are fully protected under the <strong>Wildlife and Countryside Act 1981</strong>. Always check the protected species list before foraging unfamiliar plants.
          </p>
          <p>
            The <strong>Avon Gorge</strong> — one of our mapped locations — is an SSSI. Stick strictly to public paths and only forage common, abundant species from the margins.
          </p>
          <p>
            On private land, always use public rights of way. Foraging from land you don't have permission to access is trespass, even if the plants themselves are common.
          </p>
        </>
      ),
    },
    {
      title: "Golden Rules of Safe Foraging",
      summary: "Six rules that keep you safe every time",
      icon: "🛡️",
      accent: "amber",
      content: (
        <div className="space-y-3">
          <Rule n={1}>Never eat a plant unless you are <strong>100% certain</strong> of its identity. Doubt means don't.</Rule>
          <Rule n={2}>Use <strong>multiple identification methods</strong> — sight, smell, habitat, season, and cross-reference at least two independent sources.</Rule>
          <Rule n={3}>Know your <strong>toxic lookalikes</strong> — especially with fungi, garlic-scented plants, and umbellifers (carrot-family plants with umbrella-shaped flower heads).</Rule>
          <Rule n={4}><strong>Avoid polluted areas</strong>: busy roadsides, industrial land, and sprayed farmland. Plants absorb what's in the soil and air around them.</Rule>
          <Rule n={5}><strong>Only take what you need.</strong> Leave at least 90% of any patch for wildlife, regrowth, and other foragers.</Rule>
          <Rule n={6}><strong>Wash all wild food thoroughly</strong> before preparing or eating — even if it looks clean.</Rule>
        </div>
      ),
    },
    {
      title: "Plant Identification Basics",
      summary: "How to observe and identify wild plants confidently",
      icon: "🔍",
      accent: "teal",
      content: (
        <>
          <p>Confident identification comes from observing multiple characteristics together, never a single feature in isolation.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              ["🍃", "Leaf shape", "Alternate, opposite, or whorled on the stem"],
              ["🌸", "Flower structure", "Colour, petal count, arrangement"],
              ["👃", "Smell", "Crush a leaf gently and note the scent"],
              ["🌿", "Stem", "Round, square, hollow or solid"],
              ["🌲", "Habitat", "Woodland, hedgerow, wetland, grassland"],
              ["📅", "Season", "Does timing match your expected species?"],
            ].map(([emoji, label, desc]) => (
              <div key={label} className="bg-teal-50 rounded-xl px-3 py-2.5 flex gap-2">
                <span className="text-lg flex-shrink-0">{emoji}</span>
                <div>
                  <p className="font-sans font-bold text-teal-800 text-xs">{label}</p>
                  <p className="font-sans text-teal-700 text-[11px] leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-forage-green-light border border-forage-green/30 rounded-xl px-4 py-3 text-forage-green-dark text-[13px]">
            <strong>The smell test:</strong> For garlic-family plants, the garlic scent when a leaf is crushed is the single most reliable identification method. It also distinguishes them from toxic lookalikes like lily of the valley, which has no garlic smell at all.
          </div>
          <p>
            <Link href="/guide" className="text-forage-green font-semibold hover:underline underline-offset-2">
              See the Field Guide →
            </Link>{" "}
            for detailed identification points on every species in our database.
          </p>
        </>
      ),
    },
    {
      title: "Seasonal Foraging Calendar",
      summary: "What to find in spring, summer, autumn and winter",
      icon: "📅",
      accent: "green",
      content: (
        <>
          {[
            { season: "Spring 🌱", range: "Mar – May", bg: "bg-green-50", border: "border-green-200", text: "text-green-800", plants: ["Wild garlic", "Stinging nettles", "Three-cornered leek", "Jack-by-the-hedge", "Wood sorrel", "Cleavers"] },
            { season: "Summer ☀️", range: "Jun – Aug", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", plants: ["Elderflower", "Chanterelles", "Chicken of the woods", "Yarrow", "Meadowsweet", "Raspberries"] },
            { season: "Autumn 🍂", range: "Sep – Nov", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", plants: ["Blackberries", "Sloes", "Hawthorn berries", "Hazelnuts", "Penny bun", "Sweet chestnut", "Rose hips"] },
            { season: "Winter ❄️", range: "Dec – Feb", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", plants: ["Oyster mushrooms", "Chickweed", "Hawthorn berries", "Velvet shank", "Stored autumn harvest"] },
          ].map(({ season, range, bg, border, text, plants }) => (
            <div key={season} className={`${bg} border ${border} rounded-xl px-4 py-3`}>
              <div className="flex items-baseline justify-between mb-2">
                <p className={`font-serif font-bold text-sm ${text}`}>{season}</p>
                <span className={`font-sans text-[11px] ${text} opacity-70`}>{range}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {plants.map(p => (
                  <span key={p} className={`font-sans text-[11px] ${text} bg-white/60 rounded-full px-2.5 py-0.5 border ${border}`}>{p}</span>
                ))}
              </div>
            </div>
          ))}
          <p>
            <Link href="/guide" className="text-forage-green font-semibold hover:underline underline-offset-2">
              Browse the full interactive guide →
            </Link>
          </p>
        </>
      ),
    },
    {
      title: "Dangerous Lookalikes",
      summary: "The toxic plants you must learn to avoid",
      icon: "⚠️",
      accent: "red",
      content: (
        <div className="space-y-3">
          <p className="text-forage-muted text-xs">Learning dangerous lookalikes is as important as learning the edible plants themselves. Memorise these before you forage.</p>
          <Warn>
            <strong>Wild Garlic ↔ Lily of the Valley (TOXIC) and Lords-and-Ladies (TOXIC).</strong> The garlic smell test is the key: if a crushed leaf does not smell strongly of garlic, do not pick it.
          </Warn>
          <Warn>
            <strong>Elder ↔ Dwarf Elder (TOXIC) and Water Hemlock (DEADLY).</strong> Dwarf elder grows from the ground (not a woody shrub). Water hemlock grows in wetlands with hollow, ribbed stems — it is one of the most toxic plants in Europe.
          </Warn>
          <Warn>
            <strong>Yarrow ↔ Poison Hemlock (DEADLY).</strong> Yarrow has a <em>solid</em> stem and pleasant aroma. Hemlock has a <em>hollow</em>, purple-blotched stem and a distinctly mousy, unpleasant odour.
          </Warn>
          <Warn>
            <strong>Chanterelle ↔ False Chanterelle (toxic).</strong> Real chanterelles have forking ridges — false gills — that run down the stem. False chanterelles have true crowded blade-like gills.
          </Warn>
          <Warn>
            <strong>Giant Puffball ↔ Amanita egg stage (DEADLY).</strong> Always slice every puffball open top to bottom. A true giant puffball is pure white throughout. Any internal structure = do not eat.
          </Warn>
        </div>
      ),
    },
    {
      title: "Sustainable Harvesting",
      summary: "How to forage without damaging the landscape",
      icon: "🌍",
      accent: "green",
      content: (
        <>
          <p>Foraging sustainably means leaving the landscape better than you found it — so that populations recover and others can benefit too.</p>
          <div className="space-y-2">
            {[
              ["Take a little from many spots", "rather than a lot from one — never strip a patch bare"],
              ["Leave roots intact", "never uproot plants. It damages future growth and is illegal without landowner permission"],
              ["Only harvest what you will use", "Waste is avoidable and disrespectful to the ecosystem"],
              ["Don't trample", "surrounding vegetation to reach your target plant"],
              ["Invasive species", "Three-cornered leek is invasive in the UK — foraging it actively helps native ecosystems recover"],
            ].map(([label, note]) => (
              <div key={label} className="flex gap-3 items-start bg-forage-green-light rounded-xl px-4 py-3">
                <span className="text-forage-green font-bold text-base leading-none mt-0.5 flex-shrink-0">·</span>
                <div>
                  <span className="font-sans font-semibold text-sm text-forage-green-dark">{label} </span>
                  <span className="font-sans text-forage-muted text-sm">— {note}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-forage-muted text-xs italic border-l-2 border-forage-border pl-3">
            A good rule of thumb: take no more than 10% of what you can see in any one location.
          </p>
        </>
      ),
    },
    {
      title: "What to Bring",
      summary: "Essential kit for a foraging trip",
      icon: "🎒",
      accent: "brown",
      content: (
        <div className="space-y-2">
          <GearItem label="Small sharp knife or scissors" note="For clean cuts that minimise damage to the plant" />
          <GearItem label="Basket or paper bags" note="Never plastic — it traps moisture and accelerates decay" />
          <GearItem label="Thick gloves" note="Essential for nettles, sloes, and blackthorn" />
          <GearItem label="A field guide" note="For on-the-spot identification confirmation alongside this app" />
          <GearItem label="Your phone" note="For photos (photograph before picking) and GPS location" />
          <GearItem label="Small notebook" note="Record what you find, where, and when — builds a personal foraging map" />
        </div>
      ),
    },
    {
      title: "Foraging Checklist",
      summary: "Run through this before every trip",
      icon: "✅",
      accent: "teal",
      content: (
        <div className="space-y-1 divide-y divide-forage-border">
          <CheckItem>Check what's in season — <Link href="/guide" className="text-forage-green font-semibold hover:underline underline-offset-2">Field Guide</Link></CheckItem>
          <CheckItem>Bring a basket, knife, and gloves</CheckItem>
          <CheckItem>Know your target species and their key identification points</CheckItem>
          <CheckItem>Know the dangerous lookalikes for each target species</CheckItem>
          <CheckItem>Check the weather and ground conditions</CheckItem>
          <CheckItem>Only harvest what you can positively identify</CheckItem>
          <CheckItem>Leave plenty behind for wildlife — take under 10%</CheckItem>
          <CheckItem>Wash everything thoroughly before eating</CheckItem>
        </div>
      ),
    },
    {
      title: "5 Plants Every Beginner Should Learn First",
      summary: "Start here — safe, abundant, and unmistakable",
      icon: "🌿",
      accent: "green",
      content: (
        <>
          <p className="text-forage-muted text-xs mb-3">
            Master these five before moving on to anything more complex. Each has been chosen for its abundance in Bristol, ease of identification, and low risk profile.
          </p>
          <div className="space-y-2">
            <PlantCard href="/guide/blackberry" emoji="🫐" name="Blackberry" desc="The safest starting point. No dangerous lookalikes exist in the UK." />
            <PlantCard href="/guide/stinging-nettle" emoji="🌿" name="Stinging Nettle" desc="Unmistakable once you've been stung. Incredibly nutritious and versatile." />
            <PlantCard href="/guide/wild-garlic" emoji="🧄" name="Wild Garlic" desc="The smell test makes it near-impossible to misidentify. Carpets Bristol's woodlands in spring." />
            <PlantCard href="/guide/elder" emoji="🌸" name="Elder" desc="Flowers in June, berries in August — two harvests per year." />
            <PlantCard href="/guide/hazel" emoji="🌰" name="Hazel" desc="An easy nut with no lookalikes. Deeply satisfying to collect in late summer." />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="bg-forage-bg min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="relative bg-forage-green-dark overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-16">
          <p className="font-sans font-bold text-xs uppercase tracking-widest text-white/50 mb-3">
            Education Hub
          </p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight mb-3">
            Foraging Essentials
          </h1>
          <p className="font-sans text-white/65 text-base mb-8 max-w-xl leading-relaxed">
            Everything you need to know before you step outside. Safety, law, identification, and sustainable practice — all in one place.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: species.length.toString(), label: "Species in the guide", icon: "🌿" },
              { value: "10",                       label: "Bristol locations",     icon: "📍" },
              { value: seasonCount.toString(),      label: "In season right now",  icon: "✓" },
            ].map(({ value, label, icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="font-serif text-2xl text-white font-bold leading-none">{value}</p>
                  <p className="font-sans text-white/55 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick topic pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["Safety", "Laws", "Identification", "Seasons", "Lookalikes", "Gear"].map(topic => (
              <span key={topic} className="font-sans text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Section label */}
        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-forage-muted mb-4">
          {sections.length} topics covered
        </p>

        {/* Accordions */}
        <div className="space-y-2 mb-10">
          {sections.map((section, i) => (
            <Accordion
              key={i}
              number={i + 1}
              title={section.title}
              summary={section.summary}
              icon={section.icon}
              accent={section.accent}
              open={openIndex === i}
              onToggle={() => toggle(i)}
            >
              {section.content}
            </Accordion>
          ))}
        </div>

        {/* ── Bottom CTAs ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/map" className="group bg-forage-green-dark text-white rounded-2xl p-5 hover:bg-forage-ink transition-colors">
            <span className="text-2xl mb-2 block">🗺️</span>
            <p className="font-serif font-bold text-base mb-1">Explore the Map</p>
            <p className="font-sans text-white/60 text-xs">Find foraging spots across Bristol</p>
          </Link>
          <Link href="/guide" className="group bg-white rounded-2xl p-5 border border-forage-border hover:border-forage-green hover:shadow-md transition-all">
            <span className="text-2xl mb-2 block">📖</span>
            <p className="font-serif font-bold text-base text-forage-ink mb-1 group-hover:text-forage-green transition-colors">Field Guide</p>
            <p className="font-sans text-forage-muted text-xs">Detailed profiles for all 25 species</p>
          </Link>
          <Link href="/community" className="group bg-white rounded-2xl p-5 border border-forage-border hover:border-forage-green hover:shadow-md transition-all">
            <span className="text-2xl mb-2 block">👥</span>
            <p className="font-serif font-bold text-base text-forage-ink mb-1 group-hover:text-forage-green transition-colors">Community</p>
            <p className="font-sans text-forage-muted text-xs">Share sightings with other foragers</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
