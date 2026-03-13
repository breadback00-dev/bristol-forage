"use client";

import { useState, useEffect } from "react";
import { species } from "@/data/species";
import { locations } from "@/data/locations";
import { Sighting } from "@/lib/types";
import {
  getApprovedSightings,
  getPendingSightings,
  addSighting,
  approveSighting,
  clearAllSightings,
} from "@/lib/sightings";

export default function CommunityPage() {
  const [approved, setApproved] = useState<Sighting[]>([]);
  const [pending, setPending] = useState<Sighting[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Form state
  const [formSpecies, setFormSpecies] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formGridRef, setFormGridRef] = useState("");
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formWeather, setFormWeather] = useState("");
  const [formConditions, setFormConditions] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formName, setFormName] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function reload() {
    setApproved(getApprovedSightings());
    setPending(getPendingSightings());
  }

  useEffect(() => { reload(); }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleApprove(id: string) {
    approveSighting(id);
    reload();
    window.dispatchEvent(new Event("forage:sighting-changed"));
  }

  function handleSubmit() {
    const errors: Record<string, string> = {};
    if (!formSpecies) errors.species = "Please select a species.";
    if (!formLocation && !formGridRef) errors.location = "Select a location or enter a grid ref.";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    addSighting({
      species: formSpecies,
      location: formLocation,
      gridRef: formGridRef,
      date: formDate,
      weather: formWeather,
      conditions: formConditions,
      notes: formNotes,
      name: formName || "Anonymous",
      hasPhoto,
    });

    // Reset
    setFormSpecies("");
    setFormLocation("");
    setFormGridRef("");
    setFormWeather("");
    setFormConditions("");
    setFormNotes("");
    setFormName("");
    setPhotoPreview(null);
    setHasPhoto(false);
    setFieldErrors({});

    reload();
    window.dispatchEvent(new Event("forage:sighting-changed"));
    showToast("Sighting submitted! It will appear after review.");
  }

  function handleClearAll() {
    clearAllSightings();
    reload();
    window.dispatchEvent(new Event("forage:sighting-changed"));
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">

      {/* Toast */}
      {toast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[2000] bg-forage-green text-white font-sans text-sm px-5 py-2.5 rounded-full shadow-lg animate-fade-in">
          ✓ {toast}
        </div>
      )}

      <h1 className="font-serif text-xl text-forage-green-dark mb-6">
        Community Sightings
      </h1>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-8">
          <p className="font-sans text-[13px] uppercase tracking-widests text-forage-brown font-bold mb-3">
            ● Pending Review
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pending.map((s) => (
              <SightingCard key={s.id} sighting={s} onApprove={() => handleApprove(s.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <p className="font-sans text-[13px] uppercase tracking-widest text-forage-muted mb-3">
        Approved Sightings
      </p>
      {approved.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {approved.map((s) => (
            <SightingCard key={s.id} sighting={s} />
          ))}
        </div>
      ) : (
        <p className="text-forage-muted font-sans text-sm text-center py-5 mb-10">
          No approved sightings yet. Be the first to submit one below!
        </p>
      )}

      {/* Submit Form */}
      <div className="bg-white rounded-xl p-5 border border-forage-border max-w-xl">
        <h2 className="font-serif text-base text-forage-green-dark mb-4">
          Submit a Sighting
        </h2>

        <FormField label="Species *" error={fieldErrors.species}>
          <select
            value={formSpecies}
            onChange={(e) => { setFormSpecies(e.target.value); setFieldErrors((p) => ({ ...p, species: "" })); }}
            className={`w-full px-3 py-2 border rounded-lg font-serif text-[13px] bg-white focus:outline-none focus:border-forage-green ${fieldErrors.species ? "border-forage-red" : "border-forage-border"}`}
          >
            <option value="">-- Select species --</option>
            {species.map((sp) => (
              <option key={sp.id} value={sp.name}>{sp.name}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Bristol Location" error={fieldErrors.location}>
          <select
            value={formLocation}
            onChange={(e) => { setFormLocation(e.target.value); setFieldErrors((p) => ({ ...p, location: "" })); }}
            className={`w-full px-3 py-2 border rounded-lg font-serif text-[13px] bg-white focus:outline-none focus:border-forage-green ${fieldErrors.location ? "border-forage-red" : "border-forage-border"}`}
          >
            <option value="">-- Select location --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </FormField>

        <p className="font-sans text-[11px] text-forage-muted text-center my-1.5">
          or enter OS grid ref manually
        </p>

        <FormField label="OS Grid Ref">
          <input
            type="text"
            value={formGridRef}
            onChange={(e) => { setFormGridRef(e.target.value); setFieldErrors((p) => ({ ...p, location: "" })); }}
            placeholder="e.g. ST5573"
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] focus:outline-none focus:border-forage-green"
          />
        </FormField>

        <FormField label="Date">
          <input
            type="date"
            value={formDate}
            onChange={(e) => setFormDate(e.target.value)}
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] focus:outline-none focus:border-forage-green"
          />
        </FormField>

        <FormField label="Weather">
          <input
            type="text"
            value={formWeather}
            onChange={(e) => setFormWeather(e.target.value)}
            placeholder="e.g. Overcast, 12°C"
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] focus:outline-none focus:border-forage-green"
          />
        </FormField>

        <FormField label="Ground Conditions">
          <input
            type="text"
            value={formConditions}
            onChange={(e) => setFormConditions(e.target.value)}
            placeholder="e.g. Damp leaf litter"
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] focus:outline-none focus:border-forage-green"
          />
        </FormField>

        <FormField label="Tips / Notes">
          <textarea
            value={formNotes}
            onChange={(e) => setFormNotes(e.target.value)}
            placeholder="Share your experience…"
            rows={3}
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] focus:outline-none focus:border-forage-green resize-y"
          />
        </FormField>

        <FormField label="Photo (optional)">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPhotoPreview(URL.createObjectURL(file));
                setHasPhoto(true);
              }
            }}
            className="w-full font-sans text-xs text-forage-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-sans file:bg-forage-green-light file:text-forage-green-dark hover:file:bg-forage-green hover:file:text-white file:cursor-pointer"
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              className="mt-2 w-full max-h-36 object-cover rounded-lg border border-forage-border"
            />
          )}
        </FormField>

        <FormField label="Your Name (optional)">
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Anonymous"
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] focus:outline-none focus:border-forage-green"
          />
        </FormField>

        <button
          onClick={handleSubmit}
          className="bg-forage-green text-white border-none rounded-lg px-6 py-2.5 font-serif text-sm cursor-pointer hover:bg-forage-green-dark transition-colors"
        >
          Submit Sighting
        </button>

        <div className="font-sans text-[10px] text-forage-muted bg-forage-green-light rounded-lg p-3 mt-4 leading-relaxed">
          Personal foraging permitted under the Theft Act 1968. Never uproot plants without
          landowner permission. Always use multiple identification methods before consuming
          any wild food.
        </div>
      </div>

      {/* Dev reset */}
      <div className="mt-12 pt-6 border-t border-forage-border">
        <p className="font-sans text-[10px] text-forage-muted mb-2">Dev tools</p>
        <button
          onClick={handleClearAll}
          className="font-sans text-[11px] text-forage-muted border border-forage-border rounded px-3 py-1.5 hover:border-forage-red hover:text-forage-red transition-colors"
        >
          Clear all sightings
        </button>
      </div>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label className="block font-sans text-[10px] uppercase tracking-widest text-forage-muted mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-sans text-[10px] text-forage-red mt-0.5">{error}</p>
      )}
    </div>
  );
}

function SightingCard({
  sighting,
  onApprove,
}: {
  sighting: Sighting;
  onApprove?: () => void;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-forage-border shadow-sm">
      <p className="font-serif text-sm text-forage-green-dark mb-1">{sighting.species}</p>
      <p className="font-sans text-[11px] text-forage-muted leading-relaxed mb-2">
        {sighting.location || sighting.gridRef || "Location unknown"}
        {sighting.date && ` · ${sighting.date}`}
        <br />
        {sighting.weather && `${sighting.weather} · `}
        {sighting.conditions}
      </p>
      {sighting.notes && (
        <p className="text-xs leading-relaxed mb-2">{sighting.notes}</p>
      )}
      {sighting.hasPhoto && (
        <p className="font-sans text-[10px] text-forage-green mt-1">📷 Photo attached</p>
      )}
      <p className="font-sans text-[10px] text-forage-muted mt-1.5">
        Submitted by {sighting.name}
      </p>
      {onApprove && (
        <button
          onClick={onApprove}
          className="mt-2 font-sans text-[11px] bg-forage-green text-white border-none rounded-md px-2.5 py-1 cursor-pointer hover:bg-forage-green-dark transition-colors"
        >
          Approve
        </button>
      )}
    </div>
  );
}
