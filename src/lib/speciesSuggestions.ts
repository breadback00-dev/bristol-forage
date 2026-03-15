const KEY = "bristol-forage-species-suggestions";

export interface SpeciesSuggestion {
  id: string;
  name: string;
  latinName: string;
  category: string;       // Hedgerow | Greens | Herbs | Berries | Mushrooms
  prep: string;           // raw | cook | process
  season: string;         // free text, e.g. "March to June"
  whereToFind: string;    // Bristol locations / habitat description
  howToId: string;        // brief identification notes
  submittedBy: string;
  approved: boolean;
  createdAt: string;
}

function getAll(): SpeciesSuggestion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items: SpeciesSuggestion[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function getApprovedSuggestions(): SpeciesSuggestion[] {
  return getAll().filter(s => s.approved);
}

export function getPendingSuggestions(): SpeciesSuggestion[] {
  return getAll().filter(s => !s.approved);
}

export function addSuggestion(
  data: Omit<SpeciesSuggestion, "id" | "approved" | "createdAt">
): SpeciesSuggestion {
  const suggestion: SpeciesSuggestion = {
    ...data,
    id: `ss_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    approved: false,
    createdAt: new Date().toISOString(),
  };
  const all = getAll();
  all.push(suggestion);
  save(all);
  return suggestion;
}

export function approveSuggestion(id: string): void {
  const all = getAll();
  const idx = all.findIndex(s => s.id === id);
  if (idx !== -1) {
    all[idx].approved = true;
    save(all);
  }
}

export function clearAllSuggestions(): void {
  localStorage.removeItem(KEY);
}
