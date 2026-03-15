import { Sighting } from "@/lib/types";
import { species as allSpecies } from "@/data/species";
import { isInSeason } from "@/lib/seasons";

const CATEGORY_COLOURS: Record<string, string> = {
  Hedgerow: "#7a6248",
  Fungi: "#8a5a3a",
  Greens: "#4a7c5f",
  Herbs: "#557258",
  Fruits: "#8a3a5a",
};

const CAT_LABEL: Record<string, string> = {
  Fungi: "Mushrooms",
  Fruits: "Berries",
};

export default function SightingCard({
  sighting,
  onApprove,
}: {
  sighting: Sighting;
  onApprove?: () => void;
}) {
  const sp = allSpecies.find(s => s.name === sighting.species);
  const catColour = sp ? (CATEGORY_COLOURS[sp.category] ?? "#4a7c5f") : "#4a7c5f";
  const catLabel = sp ? (CAT_LABEL[sp.category] ?? sp.category) : null;
  const inSeason = sp ? isInSeason(sp) : false;

  const formattedDate = sighting.date
    ? new Date(sighting.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-forage-border shadow-sm overflow-hidden">
      {/* Category colour bar */}
      <div className="h-1 w-full" style={{ background: catColour }} />

      <div className="p-4">
        {/* Species + badges */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="font-serif text-base text-forage-green-dark leading-tight">{sighting.species}</p>
            {sp && <p className="font-sans text-[10px] italic text-forage-muted mt-0.5">{sp.latinName}</p>}
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {catLabel && (
              <span
                className="font-sans text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                style={{ background: catColour }}
              >
                {catLabel}
              </span>
            )}
            {inSeason && (
              <span className="font-sans text-[9px] text-forage-green bg-forage-green-light px-2 py-0.5 rounded-full">
                In season
              </span>
            )}
          </div>
        </div>

        {/* Location + date */}
        <div className="flex items-center gap-1 flex-wrap mb-2">
          {(sighting.location || sighting.gridRef) && (
            <span className="font-sans text-[11px] text-forage-muted">
              📍 {sighting.location || sighting.gridRef}
            </span>
          )}
          {formattedDate && (
            <span className="font-sans text-[11px] text-forage-muted">· {formattedDate}</span>
          )}
        </div>

        {/* Notes */}
        {sighting.notes && (
          <p className="font-sans text-xs text-forage-ink leading-relaxed mb-2 line-clamp-2">
            {sighting.notes}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-forage-border">
          <p className="font-sans text-[10px] text-forage-muted">
            by {sighting.name || "Anonymous"}
            {sighting.hasPhoto && <span className="ml-2 text-forage-green">· 📷 photo</span>}
          </p>
          {onApprove && (
            <button
              onClick={onApprove}
              className="font-sans text-[11px] bg-forage-green text-white rounded-full px-3 py-1 hover:bg-forage-green-dark transition-colors"
            >
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
