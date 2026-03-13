"use client";

import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { locations } from "@/data/locations";
import { species } from "@/data/species";
import { isInSeason, inSeasonCount } from "@/lib/seasons";
import { Category, CATEGORY_LIST } from "@/lib/types";
import LocationPanel from "./LocationPanel";

function makeIcon(colour: string) {
  return L.divIcon({
    className: "",
    html: `<div class="forage-pin" style="width:18px;height:18px;background:${colour};"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export default function MapView() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<"all" | Category>("all");
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const seasonCount = useMemo(() => inSeasonCount(species), []);

  // Filter locations: show location if it has any species matching the category filter
  const visibleLocations = useMemo(() => {
    return locations.filter((loc) => {
      if (catFilter === "all" && !search) return true;

      const locSpecies = loc.speciesIds
        .map((sid) => species.find((s) => s.id === sid))
        .filter(Boolean);

      const matchesCat =
        catFilter === "all" ||
        locSpecies.some((s) => s!.category === catFilter);

      const matchesSearch =
        !search ||
        locSpecies.some(
          (s) =>
            s!.name.toLowerCase().includes(search.toLowerCase()) ||
            s!.latinName.toLowerCase().includes(search.toLowerCase())
        );

      return matchesCat && matchesSearch;
    });
  }, [catFilter, search]);

  const activeLocData = activeLocation
    ? locations.find((l) => l.id === activeLocation)
    : null;

  return (
    <div className="fixed inset-0 top-12">
      {/* Search bar */}
      <div className="absolute top-4 left-4 right-4 z-[500] flex flex-col gap-2 pointer-events-none max-w-md">
        <input
          type="text"
          placeholder="Search plants…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pointer-events-auto w-full px-4 py-2.5 rounded-full border border-forage-border bg-white font-sans text-sm shadow-lg focus:outline-none focus:border-forage-green"
        />

        {/* Category chips */}
        <div className="pointer-events-auto flex flex-wrap gap-1.5">
          {["all", ...CATEGORY_LIST].map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat as "all" | Category)}
              className={`px-3 py-1 rounded-full text-xs font-sans transition-all shadow-sm ${
                catFilter === cat
                  ? "bg-forage-green text-white"
                  : "bg-white text-forage-ink border border-forage-border hover:border-forage-green"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Season indicator */}
      <div className="absolute bottom-4 left-4 z-[500] bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md font-sans text-xs text-forage-green-dark">
        🌿 {seasonCount} species in season this month
      </div>

      {/* Map */}
      <MapContainer
        center={[51.454, -2.594]}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visibleLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={makeIcon(loc.colour)}
          >
            <Popup>
              <div className="min-w-[210px]">
                <p className="font-serif font-bold text-sm text-forage-green-dark">
                  {loc.name}
                </p>
                <p className="font-sans text-[10px] text-forage-muted mb-2">
                  {loc.gridRef} · {loc.habitat}
                </p>
                <p className="text-xs leading-relaxed mb-2">
                  {loc.description}
                </p>
                <p className="font-sans text-[11px] text-forage-green mb-2.5">
                  {loc.speciesIds.length} species recorded here
                </p>
                <button
                  onClick={() => setActiveLocation(loc.id)}
                  className="bg-forage-green text-white border-none rounded-md px-3.5 py-1.5 font-serif text-xs cursor-pointer hover:bg-forage-green-dark transition-colors"
                >
                  Explore this location
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Side panel */}
      {activeLocData && (
        <LocationPanel
          location={activeLocData}
          onClose={() => setActiveLocation(null)}
        />
      )}
    </div>
  );
}
