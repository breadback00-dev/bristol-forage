import { SpeciesSuggestion } from "@/lib/speciesSuggestions";

const CATEGORY_COLOURS: Record<string, string> = {
  Hedgerow: "#7a6248",
  Mushrooms: "#8a5a3a",
  Greens: "#4a7c5f",
  Herbs: "#557258",
  Berries: "#8a3a5a",
};

const PREP_LABEL: Record<string, string> = {
  raw: "Raw-safe",
  cook: "Must cook",
  process: "Process first",
};

export default function SpeciesSuggestionCard({
  suggestion,
  onApprove,
}: {
  suggestion: SpeciesSuggestion;
  onApprove?: () => void;
}) {
  const colour = CATEGORY_COLOURS[suggestion.category] ?? "#4a7c5f";

  return (
    <div className="bg-white rounded-2xl border border-forage-border shadow-sm overflow-hidden">
      {/* Category colour bar */}
      <div className="h-1 w-full" style={{ background: colour }} />

      <div className="p-4">
        {/* Name + badges */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="font-serif text-base text-forage-green-dark leading-tight">{suggestion.name}</p>
            {suggestion.latinName && (
              <p className="font-sans text-[10px] italic text-forage-muted mt-0.5">{suggestion.latinName}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span
              className="font-sans text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
              style={{ background: colour }}
            >
              {suggestion.category}
            </span>
            <span className="font-sans text-[9px] text-forage-muted bg-forage-bg px-2 py-0.5 rounded-full border border-forage-border">
              Community
            </span>
          </div>
        </div>

        {/* Season + prep */}
        <div className="flex gap-2 flex-wrap mb-3 mt-2">
          {suggestion.season && (
            <span className="font-sans text-[10px] text-forage-green bg-forage-green-light px-2 py-0.5 rounded-full">
              🌱 {suggestion.season}
            </span>
          )}
          {suggestion.prep && (
            <span className="font-sans text-[10px] text-forage-brown bg-forage-brown-light px-2 py-0.5 rounded-full">
              {PREP_LABEL[suggestion.prep] ?? suggestion.prep}
            </span>
          )}
        </div>

        {/* Where to find */}
        {suggestion.whereToFind && (
          <div className="mb-2">
            <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-0.5">Where to find</p>
            <p className="font-sans text-xs text-forage-ink leading-relaxed line-clamp-2">{suggestion.whereToFind}</p>
          </div>
        )}

        {/* How to ID */}
        {suggestion.howToId && (
          <div className="mb-3">
            <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-0.5">How to identify</p>
            <p className="font-sans text-xs text-forage-ink leading-relaxed line-clamp-2">{suggestion.howToId}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-forage-border">
          <p className="font-sans text-[10px] text-forage-muted">
            by {suggestion.submittedBy || "Anonymous"}
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
