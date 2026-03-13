"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { species } from "@/data/species";
import { Category, CATEGORY_LIST, MONTHS } from "@/lib/types";
import {
  isInSeason,
  isInSeasonMonth,
  seasonLabel,
  prepLabel,
  currentMonth,
} from "@/lib/seasons";
import type { Species } from "@/lib/types";

const LEGAL =
  "Personal foraging permitted under the Theft Act 1968. Never uproot plants without landowner permission. Always use multiple identification methods before consuming any wild food.";

// ── Nutrition bar with scroll-triggered animation ────────────────────────────
function NutritionBar({ label, value }: { label: string; value: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(value * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex items-center gap-2 mb-1">
      <span className="font-sans text-[9px] text-forage-muted w-14 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-forage-border rounded-full overflow-hidden">
        <div
          className="h-full bg-forage-green rounded-full transition-all duration-700"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

// ── Export function ──────────────────────────────────────────────────────────
function exportGuide(selectedSpecies: Species[]) {
  const speciesHtml = selectedSpecies
    .map(
      (sp) => `
    <div class="species">
      <h2>${sp.name} <span class="latin">${sp.latinName}</span></h2>
      <div class="meta">
        <span>Season: ${MONTHS[sp.seasonStart]}–${MONTHS[sp.seasonEnd]}</span>
        <span>Prep: ${prepLabel(sp.prep)}</span>
        <span>Habitat: ${sp.habitat}</span>
      </div>
      <h3>Identification</h3>
      <ul>${sp.full.idPoints.map((p) => `<li>${p}</li>`).join("")}</ul>
      <h3>Harvest Notes</h3><p>${sp.full.harvest}</p>
      <h3>Uses</h3><p>${sp.full.uses}</p>
      <h3>Equipment</h3><p>${sp.full.equipment}</p>
      <h3>Storage</h3><p>${sp.full.storage}</p>
      ${sp.full.lookalikeFull ? `<h3 class="warn">⚠ Lookalike Warning</h3><p class="warn">${sp.full.lookalikeFull}</p>` : ""}
    </div>`
    )
    .join("<hr>");

  const html = `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="utf-8">
  <title>Bristol Foraging Field Guide</title>
  <style>
    body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #2a2520; background: #f7f5f2; }
    h1 { color: #2d5a3d; border-bottom: 3px solid #4a7c5f; padding-bottom: 10px; }
    h2 { color: #2d5a3d; margin-top: 0; }
    h3 { color: #4a7c5f; font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
    h3.warn, p.warn { color: #8a3a2a; }
    .latin { font-style: italic; font-size: 0.8em; color: #7a6248; }
    .meta { display: flex; gap: 16px; font-size: 0.8em; color: #9a9690; margin-bottom: 12px; }
    .species { background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #e8e4de; }
    .legal { background: #fdf0ed; border: 1px solid #8a3a2a40; border-radius: 6px; padding: 12px; font-size: 0.8em; color: #8a3a2a; }
    hr { border: none; border-top: 2px solid #e8e4de; margin: 0; }
    ul { padding-left: 18px; }
    li { margin-bottom: 4px; font-size: 0.9em; }
    p { font-size: 0.9em; line-height: 1.6; }
  </style>
</head><body>
  <h1>Bristol Foraging Field Guide</h1>
  <div class="legal">${LEGAL}</div>
  <br>
  ${speciesHtml}
  <br>
  <div class="legal">${LEGAL}</div>
</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bristol-foraging-guide.html";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function GuidePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(species.map((s) => s.id))
  );
  const [mobileListOpen, setMobileListOpen] = useState(false);

  const curMonth = currentMonth();

  const filteredList = useMemo(() => {
    return species.filter((sp) => {
      if (category !== "all" && sp.category !== category) return false;
      if (
        search &&
        !sp.name.toLowerCase().includes(search.toLowerCase()) &&
        !sp.latinName.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [search, category]);

  const selectedSpecies = useMemo(
    () => species.filter((s) => selected.has(s.id)),
    [selected]
  );

  const allFilteredSelected = filteredList.every((sp) => selected.has(sp.id));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (allFilteredSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        filteredList.forEach((sp) => next.delete(sp.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        filteredList.forEach((sp) => next.add(sp.id));
        return next;
      });
    }
  }

  // Shared species list rows (used in both desktop sidebar and mobile panel)
  const speciesListRows = (
    <>
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-forage-border bg-forage-bg shrink-0">
        <span className="font-sans text-[10px] text-forage-muted">
          {selected.size} selected
        </span>
        <button
          onClick={toggleSelectAll}
          className="font-sans text-[10px] text-forage-green underline"
        >
          {allFilteredSelected ? "Deselect All" : "Select All"}
        </button>
      </div>
      {filteredList.map((sp) => (
        <div
          key={sp.id}
          onClick={() => toggle(sp.id)}
          className="flex items-center px-3 py-2 border-b border-forage-border cursor-pointer hover:bg-forage-bg gap-2"
        >
          <input
            type="checkbox"
            checked={selected.has(sp.id)}
            onChange={() => toggle(sp.id)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 accent-forage-green shrink-0"
          />
          <span className="flex-1 text-[13px] font-serif">{sp.name}</span>
          {isInSeason(sp) ? (
            <span className="bg-forage-green text-white rounded-full font-sans text-[9px] px-1.5 py-0.5">
              NOW
            </span>
          ) : (
            <span className="font-sans text-[10px] text-forage-muted whitespace-nowrap">
              {seasonLabel(sp)}
            </span>
          )}
        </div>
      ))}
    </>
  );

  return (
    <div className="fixed inset-0 top-12 flex flex-col md:flex-row">

      {/* ── DESKTOP SIDEBAR ── */}
      <div className="hidden md:flex w-64 min-w-[200px] bg-white border-r border-forage-border flex-col overflow-hidden">
        <div className="p-3 border-b border-forage-border bg-forage-green-light">
          <p className="font-serif text-[13px] text-forage-green-dark font-bold mb-2">
            Species Filter
          </p>
          <input
            type="text"
            placeholder="Search species…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-forage-border rounded-full font-serif text-xs bg-white focus:outline-none focus:border-forage-green"
          />
        </div>
        <div className="flex border-b border-forage-border shrink-0">
          {["all", ...CATEGORY_LIST].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as "all" | Category)}
              className={`flex-1 py-1.5 font-sans text-[10px] text-center border-b-2 transition-all ${
                category === cat
                  ? "text-forage-green-dark border-forage-green"
                  : "text-forage-muted border-transparent"
              }`}
            >
              {cat === "all" ? "All" : cat.slice(0, 5)}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col">
          {speciesListRows}
        </div>
      </div>

      {/* ── MOBILE TOP BAR ── */}
      <div className="md:hidden bg-white border-b border-forage-border shrink-0">
        {/* Search + toggle */}
        <div className="flex items-center gap-2 px-3 pt-2 pb-1">
          <input
            type="text"
            placeholder="Search species…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-forage-border rounded-full font-sans text-xs bg-white focus:outline-none focus:border-forage-green"
          />
          <button
            onClick={() => setMobileListOpen((o) => !o)}
            className="shrink-0 px-3 py-1.5 rounded-full border border-forage-border font-sans text-xs bg-white text-forage-ink"
          >
            Species {mobileListOpen ? "▲" : "▼"}
          </button>
        </div>
        {/* Category chips */}
        <div className="flex gap-1.5 overflow-x-auto px-3 pb-2">
          {["all", ...CATEGORY_LIST].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as "all" | Category)}
              className={`px-3 py-1 rounded-full text-xs font-sans shrink-0 transition-all ${
                category === cat
                  ? "bg-forage-green text-white"
                  : "bg-forage-bg text-forage-ink border border-forage-border"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
        {/* Collapsible species list */}
        {mobileListOpen && (
          <div className="max-h-[40vh] overflow-y-auto border-t border-forage-border flex flex-col">
            {speciesListRows}
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 overflow-y-auto p-5">

        {/* Export button */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-[17px] text-forage-green-dark border-b-2 border-forage-border pb-2 flex-1">
            Seasonal Calendar
          </h3>
          <button
            onClick={() => exportGuide(selectedSpecies)}
            disabled={selectedSpecies.length === 0}
            className="ml-4 mb-2 px-3 py-1.5 bg-forage-green text-white rounded-lg font-sans text-xs hover:bg-forage-green-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            Export Guide ↓
          </button>
        </div>

        {selectedSpecies.length > 0 ? (
          <div className="overflow-x-auto mb-8">
            <table className="border-collapse text-[11px] font-sans min-w-[500px]">
              <thead>
                <tr>
                  <th className="text-left px-2 py-1 min-w-[130px]" />
                  {MONTHS.map((m, i) => (
                    <th
                      key={m}
                      className={`text-center px-0.5 py-1 min-w-[22px] ${
                        i === curMonth
                          ? "text-forage-green-dark font-bold"
                          : "text-forage-muted font-normal"
                      }`}
                    >
                      {m.charAt(0)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedSpecies.map((sp) => (
                  <tr key={sp.id}>
                    <td className="text-left px-2 py-1 font-serif text-xs whitespace-nowrap max-w-[130px] overflow-hidden text-ellipsis">
                      {sp.name}
                    </td>
                    {MONTHS.map((_, i) => {
                      const active = isInSeasonMonth(sp, i);
                      const isCur = i === curMonth;
                      return (
                        <td key={i} className="text-center px-0.5 py-0.5">
                          <div
                            className={`w-[18px] h-[14px] rounded-sm mx-auto ${
                              active
                                ? isCur
                                  ? "bg-forage-green-dark"
                                  : "bg-forage-green"
                                : "bg-forage-border"
                            }`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-forage-muted font-sans text-sm mb-8 text-center py-5">
            Select species to see the calendar
          </p>
        )}

        {/* Species Cards */}
        <h3 className="font-serif text-[17px] text-forage-green-dark mb-3 border-b-2 border-forage-border pb-2">
          Species Cards
        </h3>
        {selectedSpecies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedSpecies.map((sp) => (
              <div
                key={sp.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-forage-border"
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div>
                    <p className="text-[15px] font-serif leading-tight">
                      {sp.name}
                      {isInSeason(sp) && (
                        <span className="ml-1.5 bg-forage-green text-white rounded-full font-sans text-[9px] px-1.5 py-0.5 align-middle">
                          NOW
                        </span>
                      )}
                    </p>
                    <p className="italic font-sans text-[11px] text-forage-muted">
                      {sp.latinName}
                    </p>
                  </div>
                  <span
                    className={`font-sans text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                      sp.prep === "raw"
                        ? "bg-forage-green-light text-forage-green-dark"
                        : sp.prep === "cook"
                        ? "bg-forage-brown-light text-forage-brown"
                        : "bg-purple-50 text-purple-800"
                    }`}
                  >
                    {prepLabel(sp.prep)}
                  </span>
                </div>

                <p className="font-sans text-[10px] text-forage-muted mb-2.5">
                  {seasonLabel(sp)} · {sp.habitat}
                </p>

                <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-1">
                  Key ID Points
                </p>
                {sp.keyId.map((pt, i) => (
                  <p
                    key={i}
                    className="text-xs mb-1 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-forage-green"
                  >
                    {pt}
                  </p>
                ))}

                {sp.lookalike && (
                  <div className="bg-forage-red-light border border-forage-red/20 rounded-md p-2 mt-2 mb-2">
                    <p className="font-sans text-[9px] uppercase text-forage-red tracking-wide mb-0.5">
                      ⚠ Lookalike Warning
                    </p>
                    <p className="text-[11px] text-forage-red leading-relaxed">
                      {sp.lookalike}
                    </p>
                  </div>
                )}

                <div className="mt-2 mb-2">
                  <p className="font-sans text-[9px] uppercase tracking-widests text-forage-muted mb-1">
                    Relative Nutrition
                  </p>
                  <NutritionBar label="Protein" value={sp.nutrition.protein} />
                  <NutritionBar label="Vitamin C" value={sp.nutrition.vitaminC} />
                  <NutritionBar label="Iron" value={sp.nutrition.iron} />
                </div>

                <p className="text-[11px] text-forage-muted italic mb-2 leading-relaxed">
                  {sp.locationHint}
                </p>

                <Link
                  href={`/guide/${sp.id}`}
                  className="font-sans text-[11px] text-forage-green underline"
                >
                  Full details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-forage-muted font-sans text-sm text-center py-5">
            Select species from the sidebar to display cards
          </p>
        )}
      </div>
    </div>
  );
}
