"use client";

import Link from "next/link";
import { Location } from "@/lib/types";
import { species as allSpecies } from "@/data/species";
import { isInSeason, seasonLabel, prepLabel } from "@/lib/seasons";

interface Props {
  location: Location;
  onClose: () => void;
}

export default function LocationPanel({ location, onClose }: Props) {
  const locSpecies = location.speciesIds
    .map((sid) => allSpecies.find((s) => s.id === sid))
    .filter(Boolean);

  return (
    <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] rounded-t-2xl md:bottom-auto md:top-0 md:left-auto md:right-0 md:w-[340px] md:max-w-[92%] md:h-full md:max-h-full md:rounded-none bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.18)] md:shadow-[-4px_0_24px_rgba(0,0,0,0.18)] z-[500] overflow-y-auto flex flex-col animate-slide-in">
      {/* Drag handle (mobile only) */}
      <div className="flex justify-center pt-3 pb-1 md:hidden shrink-0">
        <div className="w-10 h-1 rounded-full bg-forage-border" />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3.5 text-forage-muted text-xl leading-none hover:text-forage-ink"
      >
        ✕
      </button>

      {/* Body */}
      <div className="p-5 flex-1">
        <h2 className="font-serif text-lg text-forage-green-dark mb-1">
          {location.name}
        </h2>
        <p className="font-sans text-[11px] text-forage-muted mb-3">
          {location.gridRef} · {location.habitat}
        </p>

        <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-1.5">
          Access
        </p>
        <p className="text-[13px] leading-relaxed mb-4">{location.access}</p>

        <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-1.5">
          Description
        </p>
        <p className="text-[13px] leading-relaxed mb-4">
          {location.description}
        </p>

        <p className="font-sans text-[9px] uppercase tracking-widest text-forage-muted mb-2">
          Species at this location
        </p>
        <div className="flex flex-wrap gap-1.5">
          {locSpecies.map(
            (sp) =>
              sp && (
                <Link
                  key={sp.id}
                  href={`/guide/${sp.id}`}
                  className="font-sans text-[11px] px-2.5 py-1 rounded-full border border-forage-border bg-white hover:bg-forage-green-light hover:border-forage-green transition-all"
                >
                  {sp.name}
                  {isInSeason(sp) && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-forage-green ml-1 align-middle" />
                  )}
                </Link>
              )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <Link
          href="/guide"
          className="block w-full py-2.5 bg-forage-green text-white text-center rounded-lg font-serif text-sm hover:bg-forage-green-dark transition-colors"
        >
          Open Field Guide →
        </Link>
      </div>
    </div>
  );
}
