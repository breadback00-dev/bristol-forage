import { species } from "@/data/species";
import { locations } from "@/data/locations";
import { notFound } from "next/navigation";
import Link from "next/link";
import { seasonLabel, prepLabel, isInSeasonMonth } from "@/lib/seasons";
import { MONTHS } from "@/lib/types";

// Generate static params for all species
export function generateStaticParams() {
  return species.map((sp) => ({ slug: sp.id }));
}

export default function SpeciesPage({ params }: { params: { slug: string } }) {
  const sp = species.find((s) => s.id === params.slug);
  if (!sp) return notFound();

  const curMonth = new Date().getMonth();
  const inSeason = isInSeasonMonth(sp, curMonth);

  // Find locations where this species appears
  const foundAt = locations.filter((loc) => loc.speciesIds.includes(sp.id));

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      {/* Back link */}
      <Link
        href="/guide"
        className="font-sans text-sm text-forage-green hover:underline mb-6 inline-block"
      >
        ← Back to Field Guide
      </Link>

      {/* Header */}
      <h1 className="font-serif text-2xl text-forage-green-dark mb-1">
        {sp.name}
        {inSeason && (
          <span className="ml-2 bg-forage-green text-white rounded-full font-sans text-[10px] px-2 py-0.5 align-middle">
            IN SEASON
          </span>
        )}
      </h1>
      <p className="italic font-sans text-sm text-forage-muted mb-4">
        {sp.latinName}
      </p>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span
          className={`font-sans text-[10px] px-3 py-1 rounded-full ${
            sp.prep === "raw"
              ? "bg-forage-green-light text-forage-green-dark"
              : sp.prep === "cook"
              ? "bg-forage-brown-light text-forage-brown"
              : "bg-purple-50 text-purple-800"
          }`}
        >
          {prepLabel(sp.prep)}
        </span>
        <span className="font-sans text-[10px] px-3 py-1 rounded-full bg-forage-brown-light text-forage-brown">
          {seasonLabel(sp)}
        </span>
        <span className="font-sans text-[10px] px-3 py-1 rounded-full bg-forage-bg text-forage-muted">
          {sp.category}
        </span>
      </div>

      {/* Habitat */}
      <p className="text-sm text-forage-ink mb-6">{sp.habitat}</p>

      {/* Mini season bar */}
      <div className="flex gap-0.5 mb-8">
        {MONTHS.map((m, i) => (
          <div key={m} className="flex-1 text-center">
            <div
              className={`h-2 rounded-sm mb-1 ${
                isInSeasonMonth(sp, i)
                  ? i === curMonth
                    ? "bg-forage-green-dark"
                    : "bg-forage-green"
                  : "bg-forage-border"
              }`}
            />
            <span
              className={`font-sans text-[8px] ${
                i === curMonth
                  ? "text-forage-green-dark font-bold"
                  : "text-forage-muted"
              }`}
            >
              {m.charAt(0)}
            </span>
          </div>
        ))}
      </div>

      {/* All Identification Points */}
      <Section title="All Identification Points">
        {sp.full.idPoints.map((pt, i) => (
          <BulletPoint key={i}>{pt}</BulletPoint>
        ))}
      </Section>

      {/* Harvest Notes */}
      <Section title="Harvest Notes">
        <p className="text-[13px] leading-relaxed">{sp.full.harvest}</p>
      </Section>

      {/* Uses */}
      <Section title="Uses">
        <p className="text-[13px] leading-relaxed">{sp.full.uses}</p>
      </Section>

      {/* Equipment */}
      <Section title="Equipment Needed">
        <p className="text-[13px] leading-relaxed">{sp.full.equipment}</p>
      </Section>

      {/* Storage */}
      <Section title="Storage">
        <p className="text-[13px] leading-relaxed">{sp.full.storage}</p>
      </Section>

      {/* Lookalikes */}
      <Section title="Lookalikes">
        <div className="bg-forage-red-light border border-forage-red/20 rounded-lg p-3">
          <p className="text-[13px] text-forage-red leading-relaxed">
            {sp.full.lookalikeFull}
          </p>
        </div>
      </Section>

      {/* Spore print (fungi only) */}
      {sp.full.sporePrint && (
        <Section title="Spore Print">
          <p className="text-[13px]">{sp.full.sporePrint}</p>
        </Section>
      )}

      {/* Nutrition */}
      <Section title="Relative Nutrition">
        <div className="max-w-xs">
          {(
            [
              ["Protein", sp.nutrition.protein],
              ["Vitamin C", sp.nutrition.vitaminC],
              ["Iron", sp.nutrition.iron],
            ] as const
          ).map(([label, val]) => (
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

      {/* Where to find it */}
      {foundAt.length > 0 && (
        <Section title="Where to Find It">
          <p className="text-[13px] italic text-forage-muted mb-3">
            {sp.locationHint}
          </p>
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
      <div className="font-sans text-[10px] text-forage-muted bg-forage-green-light rounded-lg p-3 mt-8 leading-relaxed">
        Personal foraging permitted under the Theft Act 1968. Never uproot
        plants without landowner permission. Always use multiple identification
        methods before consuming any wild food.
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
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
