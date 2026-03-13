import { Sighting } from "./types";

const STORAGE_KEY = "bristol-forage-sightings";

export function getAllSightings(): Sighting[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getApprovedSightings(): Sighting[] {
  return getAllSightings().filter((s) => s.approved);
}

export function getPendingSightings(): Sighting[] {
  return getAllSightings().filter((s) => !s.approved);
}

export function addSighting(
  data: Omit<Sighting, "id" | "approved" | "createdAt">
): Sighting {
  const sighting: Sighting = {
    ...data,
    id: `s_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    approved: false,
    createdAt: new Date().toISOString(),
  };
  const all = getAllSightings();
  all.push(sighting);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return sighting;
}

export function approveSighting(id: string): void {
  const all = getAllSightings();
  const idx = all.findIndex((s) => s.id === id);
  if (idx !== -1) {
    all[idx].approved = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

export function pendingCount(): number {
  return getPendingSightings().length;
}
