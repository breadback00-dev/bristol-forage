import { species } from "@/data/species";
import { locations } from "@/data/locations";
import { notFound } from "next/navigation";
import Link from "next/link";
import { seasonLabel, prepLabel, isInSeasonMonth } from "@/lib/seasons";
import { MONTHS } from "@/lib/types";
import type { Category } from "@/lib/types";

export function generateStaticParams() {
  return species.map((sp) => ({ slug: sp.id }));
}

// ── Category colours & SVG icons ─────────────────────────────────────────────
const CATEGORY_COLOUR: Record<Category, string> = {
  Hedgerow: "#7a6248",
  Fungi:    "#557278",
  Greens:   "#4a7c5f",
  Herbs:    "#6a4878",
  Fruits:   "#8a5c3a",
};

function BotanicalIcon({ category }: { category: Category }) {
  switch (category) {
    case "Fungi":
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 opacity-30">
          <ellipse cx="40" cy="32" rx="28" ry="16" fill="white" />
          <rect x="34" y="32" width="12" height="26" rx="6" fill="white" />
          <ellipse cx="40" cy="58" rx="10" ry="3" fill="white" opacity="0.5" />
        </svg>
      );
    case "Greens":
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 opacity-30">
          <path d="M40 70 C40 70 10 50 12 25 C25 15 55 15 68 25 C70 50 40 70 40 70Z" fill="white" />
          <line x1="40" y1="70" x2="40" y2="30" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="40" y1="50" x2="28" y2="40" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <line x1="40" y1="44" x2="52" y2="34" stroke="white" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );
    case "Herbs":
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 opacity-30">
          <circle cx="40" cy="28" r="10" fill="white" />
          <circle cx="24" cy="38" r="8" fill="white" />
          <circle cx="56" cy="38" r="8" fill="white" />
          <circle cx="32" cy="52" r="8" fill="white" />
          <circle cx="48" cy="52" r="8" fill="white" />
          <circle cx="40" cy="42" r="6" fill="white" opacity="0.8" />
        </svg>
      );
    default: // Hedgerow & Fruits — berry cluster
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 opacity-30">
          <circle cx="28" cy="42" r="10" fill="white" />
          <circle cx="52" cy="42" r="10" fill="white" />
          <circle cx="40" cy="28" r="10" fill="white" />
          <circle cx="40" cy="56" r="10" fill="white" />
          <line x1="40" y1="18" x2="40" y2="12" stroke="white" strokeWidth="2" />
          <path d="M40 12 C40 12 48 8 52 12" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      );
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SpeciesPage({ params }: { params: { slug: string } }) {
  const idx = species.findIndex((s) => s.id === params.slug);
  if (idx === -1) return notFound();

  const sp = species[idx];
  const prevSp = idx > 0 ? species[idx - 1] : null;
  const nextSp = idx < species.length - 1 ? species[idx + 1] : null;

  const curMonth = new Date().getMonth();
  const inSeason = isInSeasonMonth(sp, curMonth);
  const foundAt = locations.filter((loc) => loc.speciesIds.includes(sp.id));
  const bgColour = CATEGORY_COLOUR[sp.category];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: sp.name,
    alternateName: sp.latinName,
    description: `${sp.name} (${sp.latinName}) foraging guide for Bristol, UK. Season: ${seasonLabel(sp)}. Habitat: ${sp.habitat}.`,
    keywords: `foraging, ${sp.name}, ${sp.latinName}, ${sp.category}, Bristol, wild food`,
    articleSection: sp.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-5 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-sans text-xs text-forage-muted mb-6">
          <Link href="/" className="hover:text-forage-green transition-colors">Map</Link>
          <span>›</span>
          <Link href="/guide" className="hover:text-forage-green transition-colors">Field Guide</Link>
          <span>›</span>
          <span className="text-forage-ink">{sp.name}</span>
        </nav>

        {/* Botanical placeholder image */}
        <div
          className="w-full h-44 rounded-2xl mb-6 flex flex-col items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${bgColour}dd, ${bgColour})` }}
        >
          <BotanicalIcon category={sp.category} />
          <p className="font-serif text-white text-xl font-semibold mt-2 z-10 drop-shadow">
            {sp.name}
          </p>
          <p className="font-sans text-white/70 text-xs italic z-10">
            {sp.latinName}
          </p>
          <span className="absolute top-3 right-3 font-sans text-[9px] text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
            {sp.category}
          </span>
          {inSeason && (
            <span className="absolute top-3 left-3 font-sans text-[9px] text-white bg-forage-green px-2 py-0.5 rounded-full">
              IN SEASON
            </span>
          )}
        </div>

        {/* Header */}
        <h1 className="font-serif text-2xl text-forage-green-dark mb-1">{sp.name}</h1>
        <p className="italic font-sans text-sm text-forage-muted mb-4">{sp.latinName}</p>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`font-sans text-[10px] px-3 py-1 rounded-full ${
            sp.prep === "raw"
              ? "bg-forage-green-light text-forage-green-dark"
              : sp.prep === "cook"
              ? "bg-forage-brown-light text-forage-brown"
              : "bg-purple-50 text-purple-800"
          }`}>
            {prepLabel(sp.prep)}
          </span>
          <span className="font-sans text-[10px] px-3 py-1 rounded-full bg-forage-brown-light text-forage-brown">
            {seasonLabel(sp)}
          </span>
          <span className="font-sans text-[10px] px-3 py-1 rounded-full bg-forage-bg text-forage-muted">
            {sp.category}
          </span>
        </div>

        <p className="text-sm text-forage-ink mb-5">{sp.habitat}</p>

        {/* Season bar */}
        <div className="flex gap-0.5 mb-8">
          {MONTHS.map((m, i) => (
            <div key={m} className="flex-1 text-center">
              <div className={`h-2 rounded-sm mb-1 ${
                isInSeasonMonth(sp, i)
                  ? i === curMonth ? "bg-forage-green-dark" : "bg-forage-green"
                  : "bg-forage-border"
              }`} />
              <span className={`font-sans text-[8px] ${
                i === curMonth ? "text-forage-green-dark font-bold" : "text-forage-muted"
              }`}>
                {m.charAt(0)}
              </span>
            </div>
          ))}
        </div>

        {/* Find on Map button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-forage-green-light text-forage-green-dark rounded-lg font-sans text-xs hover:bg-forage-green hover:text-white transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 1a5 5 0 100 10A5 5 0 008 1zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM8 6a.5.5 0 00-.5.5v3a.5.5 0 001 0v-3A.5.5 0 008 6zm0-2a.75.75 0 100 1.5A.75.75 0 008 4z"/>
            </svg>
            Find on Map
          </Link>
        </div>

        <div className="border-t border-forage-border mb-8" />

        {/* Sections */}
        <Section title="All Identification Points">
          {sp.full.idPoints.map((pt, i) => (
            <BulletPoint key={i}>{pt}</BulletPoint>
          ))}
        </Section>

        <Section title="Harvest Notes">
          <p className="text-[13px] leading-relaxed">{sp.full.harvest}</p>
        </Section>

        <Section title="Uses">
          <p className="text-[13px] leading-relaxed">{sp.full.uses}</p>
        </Section>

        <Section title="Equipment Needed">
          <p className="text-[13px] leading-relaxed">{sp.full.equipment}</p>
        </Section>

        <Section title="Storage">
          <p className="text-[13px] leading-relaxed">{sp.full.storage}</p>
        </Section>

        <Section title="Lookalikes">
          <div className="bg-forage-red-light border border-forage-red/20 rounded-lg p-3">
            <p className="text-[13px] text-forage-red leading-relaxed">
              {sp.full.lookalikeFull}
            </p>
          </div>
        </Section>

        {sp.full.sporePrint && (
          <Section title="Spore Print">
            <p className="text-[13px]">{sp.full.sporePrint}</p>
          </Section>
        )}

        <Section title="Relative Nutrition">
          <div className="max-w-xs">
            {([
              ["Protein", sp.nutrition.protein],
              ["Vitamin C", sp.nutrition.vitaminC],
              ["Iron", sp.nutrition.iron],
            ] as const).map(([label, val]) => (
              <div key={label} className="flex items-center gap-3 mb-2">
                <span className="font-sans text-[11px] text-forage-muted w-16 shrink-0">
                  {label}
                </span>
                <div className="flex-1 h-2 bg-forage-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forage-green rounded-full"
                    style={{ width: `${val * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {foundAt.length > 0 && (
          <Section title="Where to Find It">
            <p className="text-[13px] italic text-forage-muted mb-3">{sp.locationHint}</p>
            <div className="flex flex-wrap gap-2">
              {foundAt.map((loc) => (
                <span
                  key={loc.id}
                  className="font-sans text-[11px] px-2.5 py-1 rounded-full border border-forage-border"
                >
                  {loc.name}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Legal */}
        <div className="font-sans text-[10px] text-forage-muted bg-forage-green-light rounded-lg p-3 mt-2 mb-8 leading-relaxed">
          Personal foraging permitted under the Theft Act 1968. Never uproot plants without
          landowner permission. Always use multiple identification methods before consuming
          any wild food.
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-forage-border pt-6 flex justify-between gap-4">
          {prevSp ? (
            <Link
              href={`/guide/${prevSp.id}`}
              className="flex-1 flex flex-col items-start p-3 rounded-lg border border-forage-border hover:border-forage-green hover:bg-forage-green-light transition-all group"
            >
              <span className="font-sans text-[9px] text-forage-muted uppercase tracking-widest mb-1 group-hover:text-forage-green">
                ← Previous
              </span>
              <span className="font-serif text-sm text-forage-ink">{prevSp.name}</span>
            </Link>
          ) : <div className="flex-1" />}

          {nextSp ? (
            <Link
              href={`/guide/${nextSp.id}`}
              className="flex-1 flex flex-col items-end p-3 rounded-lg border border-forage-border hover:border-forage-green hover:bg-forage-green-light transition-all group"
            >
              <span className="font-sans text-[9px] text-forage-muted uppercase tracking-widest mb-1 group-hover:text-forage-green">
                Next →
              </span>
              <span className="font-serif text-sm text-forage-ink">{nextSp.name}</span>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 pb-6 border-b border-forage-border last:border-0 last:pb-0">
      <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-2">
        {title}
      </p>
      {children}
    </div>
  );
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] mb-1.5 pl-4 relative leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-forage-green">
      {children}
    </p>
  );
}
