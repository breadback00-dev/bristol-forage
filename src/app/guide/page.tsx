"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { species } from "@/data/species";
import { Category, CATEGORY_LIST, PrepType, MONTHS, type Species } from "@/lib/types";

// ── Seasons ────────────────────────────────────────────────────────────────────

const SEASONS = [
  { key: "Spring", emoji: "🌱", months: [2, 3, 4]  as number[] },
  { key: "Summer", emoji: "☀️",  months: [5, 6, 7]  as number[] },
  { key: "Autumn", emoji: "🍂", months: [8, 9, 10] as number[] },
  { key: "Winter", emoji: "❄️", months: [11, 0, 1] as number[] },
] as const;

type SeasonKey = typeof SEASONS[number]["key"];
import { isInSeason, isInSeasonMonth, seasonLabel, prepLabel } from "@/lib/seasons";

// ── Styling maps ──────────────────────────────────────────────────────────────

const CAT_STYLE: Record<Category, string> = {
  Hedgerow: "bg-forage-brown-light text-forage-brown",
  Fungi:    "bg-amber-50 text-amber-700",
  Greens:   "bg-forage-green-light text-forage-green",
  Herbs:    "bg-teal-50 text-teal-700",
  Fruits:   "bg-pink-50 text-pink-700",
};

const CAT_COLOR: Record<Category, string> = {
  Hedgerow: "#7a6248",
  Fungi:    "#c4862a",
  Greens:   "#4a7c5f",
  Herbs:    "#2a7a78",
  Fruits:   "#b05080",
};

const CAT_LABEL: Record<string, string> = {
  all:      "All",
  Hedgerow: "Hedgerow",
  Fungi:    "Mushrooms",
  Greens:   "Greens",
  Herbs:    "Herbs",
  Fruits:   "Berries",
};

const PREP_STYLE: Record<PrepType, string> = {
  raw:     "bg-forage-green-light text-forage-green",
  cook:    "bg-forage-brown-light text-forage-brown",
  process: "bg-purple-50 text-purple-700",
};

// ── Season bar component ──────────────────────────────────────────────────────

function SeasonBar({ sp }: { sp: Species }) {
  const now = new Date().getMonth();
  const color = CAT_COLOR[sp.category];

  // Calculate progress through season (for species currently in season)
  let progressPct = 0;
  let inSeason = false;
  if (sp.seasonEnd >= sp.seasonStart) {
    inSeason = now >= sp.seasonStart && now <= sp.seasonEnd;
    if (inSeason) {
      const total = sp.seasonEnd - sp.seasonStart + 1;
      const elapsed = now - sp.seasonStart + 1;
      progressPct = elapsed / total;
    }
  } else {
    inSeason = now >= sp.seasonStart || now <= sp.seasonEnd;
    if (inSeason) {
      const total = (12 - sp.seasonStart) + sp.seasonEnd + 1;
      const elapsed = now >= sp.seasonStart ? now - sp.seasonStart + 1 : (12 - sp.seasonStart) + now + 1;
      progressPct = elapsed / total;
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-forage-border">
      {/* 12-month bar */}
      <div className="flex gap-[2px] mb-[5px]">
        {Array.from({ length: 12 }, (_, m) => {
          const active = isInSeasonMonth(sp, m);
          const isCurrent = m === now;
          return (
            <div
              key={m}
              className="relative flex-1 h-1 rounded-full"
              style={{ background: active ? (isCurrent ? color : `${color}55`) : "#e8e4de" }}
            >
              {isCurrent && (
                <div
                  className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-0.5 h-[9px] rounded-full"
                  style={{ background: inSeason ? color : "#c4bdb5" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Season label + progress */}
      <div className="flex items-center justify-between text-[10px] font-sans">
        <span className="text-forage-muted">{MONTHS[sp.seasonStart]}</span>
        {inSeason ? (
          <span className="font-bold" style={{ color }}>
            {Math.round(progressPct * 100)}% through season
          </span>
        ) : (
          <span className="text-forage-muted">out of season</span>
        )}
        <span className="text-forage-muted">{MONTHS[sp.seasonEnd]}</span>
      </div>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type CatFilter = "all" | Category;
type PrepFilter = "all" | PrepType;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GuidePage() {
  const today = new Date().getMonth();
  const [search, setSearch]             = useState("");
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey | null>(null);
  const [catFilter, setCatFilter]       = useState<CatFilter>("all");
  const [prepFilter, setPrepFilter]     = useState<PrepFilter>("all");

  const currentSeason = SEASONS.find(s => (s.months as number[]).includes(today))?.key ?? null;

  const filtered = useMemo(() => {
    return species.filter((sp) => {
      if (selectedSeason !== null) {
        const seasonMonths = SEASONS.find(s => s.key === selectedSeason)!.months as number[];
        if (!seasonMonths.some(m => isInSeasonMonth(sp, m))) return false;
      }
      if (catFilter !== "all" && sp.category !== catFilter) return false;
      if (prepFilter !== "all" && sp.prep !== prepFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!sp.name.toLowerCase().includes(q) && !sp.latinName.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedSeason, catFilter, prepFilter]);

  // In-season strip: current month's species when nothing selected; selected season's species when a season is active
  const inSeasonStrip = useMemo(() => {
    if (selectedSeason !== null) {
      const seasonMonths = SEASONS.find(s => s.key === selectedSeason)!.months as number[];
      const seen = new Set<string>();
      return species.filter(sp => {
        if (!seasonMonths.some(m => isInSeasonMonth(sp, m))) return false;
        if (seen.has(sp.id)) return false;
        seen.add(sp.id);
        return true;
      });
    }
    return species.filter(sp => isInSeasonMonth(sp, today));
  }, [selectedSeason, today]);

  const seasonCounts = useMemo(
    () => SEASONS.map(s => species.filter(sp => (s.months as number[]).some(m => isInSeasonMonth(sp, m))).length),
    []
  );

  const catFilters: Array<{ key: CatFilter; label: string }> = [
    { key: "all", label: "All" },
    ...CATEGORY_LIST.map((c) => ({ key: c as CatFilter, label: CAT_LABEL[c] })),
  ];

  const prepFilters: Array<{ key: PrepFilter; label: string }> = [
    { key: "all",     label: "Any prep" },
    { key: "raw",     label: "Raw-safe" },
    { key: "cook",    label: "Must cook" },
    { key: "process", label: "Process first" },
  ];

  const activeFilters = (selectedSeason !== null ? 1 : 0) + (catFilter !== "all" ? 1 : 0) + (prepFilter !== "all" ? 1 : 0) + (search ? 1 : 0);

  return (
    <div className="bg-forage-bg min-h-[calc(100vh-64px)]">

      {/* ── STICKY FILTER HEADER ─────────────────────────────────────── */}
      <div className="sticky top-16 z-[200] bg-white border-b border-forage-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6">

          {/* Row 1: Title + search */}
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-baseline gap-3">
              <h1 className="font-serif font-bold text-xl text-forage-ink">Field Guide</h1>
              <span className="font-sans text-sm text-forage-muted">
                {filtered.length} of {species.length} species
              </span>
            </div>
            <div className="relative flex-shrink-0 w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forage-muted/50 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search species…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-full bg-forage-bg border border-forage-border font-sans text-sm focus:outline-none focus:ring-2 focus:ring-forage-green/20 focus:border-forage-green transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Season buttons */}
          <div className="pb-3">
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-forage-muted mb-2">
              Filter by Season
            </p>
            <div className="flex gap-2">
              {SEASONS.map((season, i) => {
                const isSelected = selectedSeason === season.key;
                const isCurrent = season.key === currentSeason;
                return (
                  <button
                    key={season.key}
                    onClick={() => setSelectedSeason(isSelected ? null : season.key)}
                    className={`flex flex-col items-center flex-1 px-3 py-2.5 rounded-xl transition-all ${
                      isSelected
                        ? "bg-forage-green text-white shadow-sm"
                        : isCurrent
                        ? "bg-forage-green-light border border-forage-green/40 text-forage-green"
                        : "bg-forage-bg border border-forage-border text-forage-muted hover:border-forage-green/40 hover:text-forage-ink"
                    }`}
                  >
                    <span className="text-xl leading-none mb-1">{season.emoji}</span>
                    <span className="font-sans font-bold text-xs leading-tight">{season.key}</span>
                    <span className={`font-sans text-[10px] leading-tight mt-0.5 ${isSelected ? "text-white/70" : "text-forage-muted"}`}>
                      {seasonCounts[i]} sp.
                    </span>
                    {isCurrent && !isSelected && (
                      <span className="font-sans text-[8px] font-black text-forage-green leading-tight mt-0.5">NOW</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Category + prep chips */}
          <div className="flex items-center gap-6 pb-3 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {catFilters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCatFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all border whitespace-nowrap ${
                    catFilter === key
                      ? "text-white border-transparent"
                      : "bg-white text-forage-muted border-forage-border hover:text-forage-ink hover:border-forage-ink/30"
                  }`}
                  style={catFilter === key ? { background: key === "all" ? "#2a2520" : CAT_COLOR[key as Category], borderColor: "transparent" } : {}}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 flex-wrap border-l border-forage-border pl-4 ml-auto">
              {prepFilters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setPrepFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all border whitespace-nowrap ${
                    prepFilter === key
                      ? "bg-forage-ink text-white border-forage-ink"
                      : "bg-white text-forage-muted border-forage-border hover:text-forage-ink hover:border-forage-ink/30"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── IN SEASON STRIP ──────────────────────────────────────────── */}
      {inSeasonStrip.length > 0 && selectedSeason === null && (
        <div className="bg-forage-green-light border-b border-forage-border/60">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-forage-green animate-pulse" />
              <p className="font-sans font-bold text-sm text-forage-green">
                In Season Now
              </p>
              <span className="font-sans text-xs text-forage-muted">
                · {new Date().toLocaleString("en-GB", { month: "long" })} · {inSeasonStrip.length} species
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {inSeasonStrip.map((sp) => (
                <Link
                  key={sp.id}
                  href={`/guide/${sp.id}`}
                  className="flex-shrink-0 bg-white rounded-xl px-3.5 py-2.5 border border-forage-green/20 hover:border-forage-green hover:shadow-sm transition-all group"
                >
                  <p className="font-sans font-bold text-xs text-forage-ink group-hover:text-forage-green transition-colors whitespace-nowrap">
                    {sp.name}
                  </p>
                  <p className="font-sans text-[10px] text-forage-muted whitespace-nowrap">{CAT_LABEL[sp.category]}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Season-selected banner */}
      {selectedSeason !== null && (
        <div className="bg-forage-green border-b border-forage-green-dark/20">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <p className="font-sans font-bold text-sm text-white">
              {SEASONS.find(s => s.key === selectedSeason)!.emoji}{" "}
              <span className="font-black">{selectedSeason}</span>
              {" — "}{filtered.length} species in season
            </p>
            <button
              onClick={() => setSelectedSeason(null)}
              className="font-sans text-xs text-white/70 hover:text-white underline underline-offset-2"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN GRID ────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-6">

        {/* Active filter tags */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {catFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-forage-border rounded-full px-3 py-1 font-sans text-xs font-bold text-forage-ink">
                <span className="w-2 h-2 rounded-full" style={{ background: CAT_COLOR[catFilter as Category] }} />
                {CAT_LABEL[catFilter]}
                <button onClick={() => setCatFilter("all")} className="text-forage-muted hover:text-forage-ink ml-0.5">×</button>
              </span>
            )}
            {prepFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-forage-border rounded-full px-3 py-1 font-sans text-xs font-bold text-forage-ink">
                {prepLabel(prepFilter as PrepType)}
                <button onClick={() => setPrepFilter("all")} className="text-forage-muted hover:text-forage-ink ml-0.5">×</button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-forage-border rounded-full px-3 py-1 font-sans text-xs font-bold text-forage-ink">
                "{search}"
                <button onClick={() => setSearch("")} className="text-forage-muted hover:text-forage-ink ml-0.5">×</button>
              </span>
            )}
            <button
              onClick={() => { setCatFilter("all"); setPrepFilter("all"); setSearch(""); setSelectedSeason(null); }}
              className="font-sans text-xs text-forage-muted hover:text-forage-red underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-lg text-forage-muted mb-2">No species match your filters.</p>
            <button
              onClick={() => { setSearch(""); setCatFilter("all"); setPrepFilter("all"); setSelectedSeason(null); }}
              className="font-sans text-forage-green text-sm font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((sp) => (
              <Link
                key={sp.id}
                href={`/guide/${sp.id}`}
                className="group bg-white rounded-2xl border border-forage-border shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                {/* Category colour bar */}
                <div className="h-1 w-full flex-shrink-0" style={{ background: CAT_COLOR[sp.category] }} />

                <div className="p-4 flex flex-col flex-1">
                  {/* Name + in-season badge */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-serif font-bold text-forage-ink text-base leading-tight group-hover:text-forage-green transition-colors">
                      {sp.name}
                    </h3>
                    {isInSeason(sp) && (
                      <span className="flex-shrink-0 mt-0.5 bg-forage-green text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded-full">
                        Now
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-[11px] italic text-forage-muted mb-2">{sp.latinName}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full ${CAT_STYLE[sp.category]}`}>
                      {CAT_LABEL[sp.category]}
                    </span>
                    <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full ${PREP_STYLE[sp.prep]}`}>
                      {prepLabel(sp.prep)}
                    </span>
                  </div>

                  {/* Key ID */}
                  <p className="font-sans text-[12px] text-forage-muted leading-relaxed mb-2 flex-1">
                    {sp.keyId[0]}
                  </p>

                  {/* Lookalike */}
                  {sp.lookalike && (
                    <div className="flex items-start gap-1.5 bg-forage-red-light border border-red-100 rounded-lg px-2.5 py-1.5 mb-2">
                      <span className="text-forage-red text-xs flex-shrink-0">⚠</span>
                      <p className="font-sans text-[10px] text-forage-red leading-snug line-clamp-2">{sp.lookalike}</p>
                    </div>
                  )}

                  {/* ── Season progress bar ── */}
                  <SeasonBar sp={sp} />

                  {/* Link */}
                  <span className="inline-flex items-center gap-1 font-sans font-bold text-forage-green text-xs group-hover:underline underline-offset-4 mt-3">
                    Full guide
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Legal */}
        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 max-w-2xl">
          <p className="font-sans text-forage-ink text-xs leading-relaxed">
            <strong>Legal notice:</strong> Personal foraging is permitted under the Theft Act 1968. Never uproot plants without landowner permission. Always use multiple identification methods before consuming any wild food.
          </p>
        </div>
      </main>
    </div>
  );
}
