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
} from "@/lib/sightings";

export default function CommunityPage() {
  const [approved, setApproved] = useState<Sighting[]>([]);
  const [pending, setPending] = useState<Sighting[]>([]);

  // Form state
  const [formSpecies, setFormSpecies] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formGridRef, setFormGridRef] = useState("");
  const [formDate, setFormDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [formWeather, setFormWeather] = useState("");
  const [formConditions, setFormConditions] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formName, setFormName] = useState("");
  const [formError, setFormError] = useState("");

  function reload() {
    setApproved(getApprovedSightings());
    setPending(getPendingSightings());
  }

  useEffect(() => {
    reload();
  }, []);

  function handleApprove(id: string) {
    approveSighting(id);
    reload();
  }

  function handleSubmit() {
    setFormError("");
    if (!formSpecies) {
      setFormError("Please select a species.");
      return;
    }
    if (!formLocation && !formGridRef) {
      setFormError("Please select a location or enter an OS grid ref.");
      return;
    }

    addSighting({
      species: formSpecies,
      location: formLocation,
      gridRef: formGridRef,
      date: formDate,
      weather: formWeather,
      conditions: formConditions,
      notes: formNotes,
      name: formName || "Anonymous",
      hasPhoto: false,
    });

    // Reset form
    setFormSpecies("");
    setFormLocation("");
    setFormGridRef("");
    setFormWeather("");
    setFormConditions("");
    setFormNotes("");
    setFormName("");
    reload();
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <h1 className="font-serif text-xl text-forage-green-dark mb-6">
        Community Sightings
      </h1>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-8">
          <p className="font-sans text-[13px] uppercase tracking-widest text-forage-brown font-bold mb-3">
            ● Pending Review
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pending.map((s) => (
              <SightingCard
                key={s.id}
                sighting={s}
                onApprove={() => handleApprove(s.id)}
              />
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

        <FormField label="Species *">
          <select
            value={formSpecies}
            onChange={(e) => setFormSpecies(e.target.value)}
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] bg-white focus:outline-none focus:border-forage-green"
          >
            <option value="">-- Select species --</option>
            {species.map((sp) => (
              <option key={sp.id} value={sp.name}>
                {sp.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Bristol Location">
          <select
            value={formLocation}
            onChange={(e) => setFormLocation(e.target.value)}
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] bg-white focus:outline-none focus:border-forage-green"
          >
            <option value="">-- Select location --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
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
            onChange={(e) => setFormGridRef(e.target.value)}
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

        <FormField label="Your Name (optional)">
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Anonymous"
            className="w-full px-3 py-2 border border-forage-border rounded-lg font-serif text-[13px] focus:outline-none focus:border-forage-green"
          />
        </FormField>

        {formError && (
          <p className="text-forage-red font-sans text-[11px] mb-3">
            {formError}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-forage-green text-white border-none rounded-lg px-6 py-2.5 font-serif text-sm cursor-pointer hover:bg-forage-green-dark transition-colors"
        >
          Submit Sighting
        </button>

        <div className="font-sans text-[10px] text-forage-muted bg-forage-green-light rounded-lg p-3 mt-4 leading-relaxed">
          Personal foraging permitted under the Theft Act 1968. Never uproot
          plants without landowner permission. Always use multiple identification
          methods before consuming any wild food.
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label className="block font-sans text-[10px] uppercase tracking-widest text-forage-muted mb-1">
        {label}
      </label>
      {children}
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
      <p className="font-serif text-sm text-forage-green-dark mb-1">
        {sighting.species}
      </p>
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
        <p className="font-sans text-[10px] text-forage-green mt-1">
          📷 Photo attached
        </p>
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
