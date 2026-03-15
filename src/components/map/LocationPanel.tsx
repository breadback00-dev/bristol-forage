"use client";

import Link from "next/link";
import { Location } from "@/lib/types";
import { species as allSpecies } from "@/data/species";
import { isInSeason, seasonLabel } from "@/lib/seasons";

interface Props {
  location: Location;
  onClose: () => void;
}

export default function LocationPanel({ location, onClose }: Props) {
  const locSpecies = location.speciesIds
    .map((sid) => allSpecies.find((s) => s.id === sid))
    .filter(Boolean);

  const inSeasonSpecies = locSpecies.filter((s) => s && isInSeason(s));

  return (
    <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-[360px] bg-white rounded-2xl shadow-2xl z-[700] overflow-hidden border border-forage-border animate-slide-in-up flex flex-col max-h-[75vh]">

      {/* Habitat colour bar */}
      <div className="h-1.5 w-full flex-shrink-0" style={{ background: location.colour }} />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3 flex-shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: location.colour }}
            >
              {location.habitat}
            </span>
          </div>
          <h2 className="font-serif text-lg font-bold text-forage-ink leading-tight truncate">
            {location.name}
          </h2>
          <p className="font-sans text-[11px] text-forage-muted mt-0.5">{location.gridRef}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-forage-bg hover:bg-forage-border flex items-center justify-center text-forage-muted hover:text-forage-ink transition-colors mt-0.5"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Stats row */}
      <div className="mx-5 mb-3 flex gap-3 flex-shrink-0">
        <div className="flex-1 bg-forage-bg rounded-xl px-3 py-2 text-center">
          <p className="font-sans font-bold text-forage-ink text-lg leading-none">{locSpecies.length}</p>
          <p className="font-sans text-[10px] text-forage-muted mt-0.5">species</p>
        </div>
        <div className="flex-1 bg-forage-green-light rounded-xl px-3 py-2 text-center">
          <p className="font-sans font-bold text-forage-green text-lg leading-none">{inSeasonSpecies.length}</p>
          <p className="font-sans text-[10px] text-forage-muted mt-0.5">in season</p>
        </div>
        <div className="flex-1 bg-forage-bg rounded-xl px-3 py-2 text-center">
          <p className="font-sans font-bold text-forage-ink text-[11px] leading-tight">{location.access}</p>
          <p className="font-sans text-[10px] text-forage-muted mt-0.5">access</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mb-3 flex-shrink-0">
        <p className="font-sans text-[13px] text-forage-muted leading-relaxed">{location.description}</p>
      </div>

      {/* Species list */}
      <div className="px-5 pb-3 overflow-y-auto flex-1 min-h-0">
        <p className="font-sans text-[10px] uppercase tracking-widest text-forage-muted mb-2">
          Species here
        </p>
        <div className="flex flex-col gap-1.5">
          {locSpecies.map(
            (sp) =>
              sp && (
                <Link
                  key={sp.id}
                  href={`/guide/${sp.id}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-forage-border bg-white hover:bg-forage-green-light hover:border-forage-green transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {isInSeason(sp) && (
                      <span className="w-2 h-2 rounded-full bg-forage-green flex-shrink-0" />
                    )}
                    {!isInSeason(sp) && (
                      <span className="w-2 h-2 rounded-full bg-forage-border flex-shrink-0" />
                    )}
                    <span className="font-sans text-[12px] font-semibold text-forage-ink group-hover:text-forage-green truncate transition-colors">
                      {sp.name}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] text-forage-muted flex-shrink-0 ml-2">
                    {seasonLabel(sp)}
                  </span>
                </Link>
              )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-forage-border flex-shrink-0">
        <Link
          href="/guide"
          className="block w-full py-2.5 bg-forage-green text-white text-center rounded-xl font-sans font-bold text-sm hover:bg-forage-green-dark transition-colors"
        >
          Open Field Guide
        </Link>
      </div>
    </div>
  );
}
