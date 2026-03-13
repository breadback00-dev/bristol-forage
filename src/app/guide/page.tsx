"use client";

import { useState, useMemo } from "react";
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

export default function GuidePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(species.map((s) => s.id))
  );

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

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="fixed inset-0 top-12 flex">
      {/* Sidebar */}
      <div className="w-64 min-w-[200px] bg-white border-r border-forage-border flex flex-col overflow-hidden">
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

        {/* Category tabs */}
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

        {/* Species list */}
        <div className="flex-1 overflow-y-auto">
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
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Season Calendar */}
        <h3 className="font-serif text-[17px] text-forage-green-dark mb-3 border-b-2 border-forage-border pb-2">
          Seasonal Calendar
        </h3>
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
                {/* Header */}
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

                {/* Key ID */}
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

                {/* Lookalike warning */}
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

                {/* Nutrition bars */}
                <div className="mt-2 mb-2">
                  <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-1">
                    Relative Nutrition
                  </p>
                  {(
                    [
                      ["Protein", sp.nutrition.protein],
                      ["Vitamin C", sp.nutrition.vitaminC],
                      ["Iron", sp.nutrition.iron],
                    ] as const
                  ).map(([label, val]) => (
                    <div key={label} className="flex items-center gap-2 mb-1">
                      <span className="font-sans text-[9px] text-forage-muted w-14 shrink-0">
                        {label}
                      </span>
                      <div className="flex-1 h-1.5 bg-forage-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forage-green rounded-full transition-all duration-700"
                          style={{ width: `${val * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Location hint */}
                <p className="text-[11px] text-forage-muted italic mb-2 leading-relaxed">
                  {sp.locationHint}
                </p>

                {/* Detail link */}
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
