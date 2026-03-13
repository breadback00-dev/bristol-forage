import { Species, MONTHS } from "./types";

/** Current month (0-indexed) */
export function currentMonth(): number {
  return new Date().getMonth();
}

/** Is this species in season right now? Handles year wrap-around. */
export function isInSeason(species: Species): boolean {
  return isInSeasonMonth(species, currentMonth());
}

/** Is this species in season during a given month? Handles wrap-around (e.g. Nov–Feb). */
export function isInSeasonMonth(species: Species, month: number): boolean {
  const { seasonStart, seasonEnd } = species;
  if (seasonEnd >= seasonStart) {
    return month >= seasonStart && month <= seasonEnd;
  }
  // Wraps around year boundary (e.g. Nov–Feb = 10–1)
  return month >= seasonStart || month <= seasonEnd;
}

/** Human-readable season range, e.g. "Mar–Jun" */
export function seasonLabel(species: Species): string {
  return `${MONTHS[species.seasonStart]}–${MONTHS[species.seasonEnd]}`;
}

/** Prep type as display label */
export function prepLabel(prep: Species["prep"]): string {
  switch (prep) {
    case "raw": return "Raw-safe";
    case "cook": return "Must cook";
    case "process": return "Process first";
  }
}

/** Count how many species from a list are currently in season */
export function inSeasonCount(speciesList: Species[]): number {
  return speciesList.filter(isInSeason).length;
}
