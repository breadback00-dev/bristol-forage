"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { locations } from "@/data/locations";
import { species } from "@/data/species";
import { isInSeason, isInSeasonMonth, inSeasonCount } from "@/lib/seasons";
import { Category, CATEGORY_LIST, HABITAT_COLOURS, HabitatType } from "@/lib/types";
import LocationPanel from "./LocationPanel";

// ── Types ─────────────────────────────────────────────────────────────────────

type MapTarget =
  | { type: "fly"; lat: number; lng: number; zoom: number }
  | { type: "bounds"; latlngs: [number, number][] };

// ── MapController: accesses the Leaflet map from inside MapContainer ──────────

function MapController({ target }: { target: MapTarget | null }) {
  const map = useMap();
  const prev = useRef<MapTarget | null>(null);

  useEffect(() => {
    if (!target || target === prev.current) return;
    prev.current = target;
    if (target.type === "fly") {
      map.flyTo([target.lat, target.lng], target.zoom, { animate: true, duration: 0.8 });
    } else if (target.latlngs.length === 1) {
      map.flyTo(target.latlngs[0], 14, { animate: true, duration: 0.8 });
    } else {
      map.fitBounds(L.latLngBounds(target.latlngs), { padding: [60, 60], maxZoom: 14 });
    }
  }, [target, map]);

  return null;
}

// ── Seasons ───────────────────────────────────────────────────────────────────

const SEASONS = [
  { key: "Spring", emoji: "🌱", months: [2, 3, 4] },
  { key: "Summer", emoji: "☀️",  months: [5, 6, 7] },
  { key: "Autumn", emoji: "🍂", months: [8, 9, 10] },
  { key: "Winter", emoji: "❄️", months: [11, 0, 1] },
] as const;
type SeasonKey = typeof SEASONS[number]["key"];

// ── Main component ─────────────────────────────────────────────────────────────

export default function MapView() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<"all" | Category>("all");
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState<"standard" | "satellite">("standard");
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey | null>(null);
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const [mapTarget, setMapTarget] = useState<MapTarget | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState(false);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gpsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const seasonCount = useMemo(() => inSeasonCount(species), []);
  const today = new Date().getMonth();
  const currentSeason = SEASONS.find(s => (s.months as readonly number[]).includes(today))?.key ?? null;
  const seasonCounts = SEASONS.map(s =>
    species.filter(sp => (s.months as readonly number[]).some(m => isInSeasonMonth(sp, m))).length
  );

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setSearch(q);
  }, []);

  useEffect(() => {
    const handler = (e: any) => setSearch(e.detail || "");
    window.addEventListener("forage:search", handler);
    return () => window.removeEventListener("forage:search", handler);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      const { type, id } = e.detail as { type: "species" | "location"; id: string };
      if (type === "location") {
        const loc = locations.find((l) => l.id === id);
        if (!loc) return;
        setSelectedSeason(null);
        setMapTarget({ type: "fly", lat: loc.lat, lng: loc.lng, zoom: 15 });
        setActiveLocation(id);
      } else {
        const matching = locations.filter((l) => l.speciesIds.includes(id));
        if (!matching.length) return;
        setSelectedSeason(null);
        setMapTarget({ type: "bounds", latlngs: matching.map((l) => [l.lat, l.lng]) });
        const ids = new Set(matching.map((l) => l.id));
        setHighlightedIds(ids);
        if (highlightTimer.current) clearTimeout(highlightTimer.current);
        highlightTimer.current = setTimeout(() => setHighlightedIds(new Set()), 2500);
      }
    };
    window.addEventListener("forage:select", handler);
    return () => window.removeEventListener("forage:select", handler);
  }, []);

  useEffect(() => {
    return () => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
      if (gpsTimer.current) clearTimeout(gpsTimer.current);
    };
  }, []);

  const visibleLocations = useMemo(() => {
    return locations.filter((loc) => {
      const locSpecies = loc.speciesIds
        .map((sid) => species.find((s) => s.id === sid))
        .filter(Boolean);

      if (selectedSeason !== null) {
        const seasonMonths = SEASONS.find(s => s.key === selectedSeason)!.months;
        const hasSeasonSpecies = locSpecies.some(sp =>
          (seasonMonths as readonly number[]).some(m => isInSeasonMonth(sp!, m))
        );
        if (!hasSeasonSpecies) return false;
      }

      const matchesCat = catFilter === "all" || locSpecies.some((s) => s!.category === catFilter);
      const matchesSearch =
        !search ||
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        locSpecies.some(
          (s) =>
            s!.name.toLowerCase().includes(search.toLowerCase()) ||
            s!.habitat.toLowerCase().includes(search.toLowerCase())
        );

      return matchesCat && matchesSearch;
    });
  }, [catFilter, search, selectedSeason]);

  const activeLocData = activeLocation ? locations.find((l) => l.id === activeLocation) : null;

  function handleNearMe() {
    if (!navigator.geolocation) { triggerGpsError(); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        setUserLocation({ lat, lng });
        setMapTarget({ type: "fly", lat, lng, zoom: 14 });
      },
      () => triggerGpsError()
    );
  }

  function triggerGpsError() {
    setGpsError(true);
    if (gpsTimer.current) clearTimeout(gpsTimer.current);
    gpsTimer.current = setTimeout(() => setGpsError(false), 3000);
  }

  const cats: Array<"all" | Category> = ["all", ...CATEGORY_LIST];

  return (
    <div className="relative h-full w-full">

      {/* ── Category chips ────────────────────────────────────────────────── */}
      <div className="absolute top-4 left-4 z-[500] flex flex-col gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold shadow-sm border transition-all whitespace-nowrap ${
                catFilter === cat
                  ? "bg-forage-green text-white border-forage-green"
                  : "bg-white text-forage-ink border-forage-border hover:border-forage-green"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* Season tabs */}
        <div className="flex bg-white rounded-full shadow-sm border border-forage-border p-0.5 w-fit">
          {SEASONS.map((season) => {
            const isSelected = selectedSeason === season.key;
            const isCurrent = season.key === currentSeason;
            return (
              <button
                key={season.key}
                onClick={() => setSelectedSeason(isSelected ? null : season.key)}
                title={season.key}
                className={`px-3 py-1 rounded-full text-xs font-sans font-bold transition-all flex items-center gap-1 ${
                  isSelected
                    ? "bg-forage-green text-white"
                    : "text-forage-muted hover:text-forage-ink"
                }`}
              >
                <span>{season.emoji}</span>
                <span>{season.key}</span>
                {isCurrent && !isSelected && (
                  <span className="text-[8px] font-black text-forage-green leading-none">●</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <MapContainer
        center={[51.454, -2.594]}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <MapController target={mapTarget} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={
            mapLayer === "satellite"
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          }
        />

        {visibleLocations.map((loc) => {
          const highlighted = highlightedIds.has(loc.id);
          const size = highlighted ? 42 : 34;
          const bg = loc.colour;
          const border = highlighted ? "white" : "rgba(255,255,255,0.9)";
          const shadow = highlighted
            ? `0 0 0 4px ${bg}55, 0 4px 14px rgba(0,0,0,0.4)`
            : "0 2px 10px rgba(0,0,0,0.3)";
          const inSeasonHere = loc.speciesIds
            .map((sid) => species.find((s) => s.id === sid))
            .filter((s) => s && isInSeason(s)).length;
          return (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={L.divIcon({
                className: "",
                html: `<div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;background:${bg};border-radius:50%;border:2.5px solid ${border};box-shadow:${shadow};color:white;font-size:12px;font-weight:900;cursor:pointer;transition:all 0.2s ease;">${loc.speciesIds.length}</div>`,
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
              })}
              eventHandlers={{ click: () => setActiveLocation(loc.id) }}
            >
              <Tooltip direction="top" offset={[0, -(size / 2 + 4)]} opacity={1}>
                <span style={{ fontWeight: 700 }}>{loc.name}</span>
                {inSeasonHere > 0 && (
                  <span style={{ color: "#4a7c5f", marginLeft: 6 }}>· {inSeasonHere} in season</span>
                )}
              </Tooltip>
            </Marker>
          );
        })}

        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={10}
            pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.35, weight: 2.5 }}
          />
        )}
      </MapContainer>

      {/* ── Layer switcher ────────────────────────────────────────────────── */}
      <div className="absolute right-4 top-4 z-[500]">
        <div className="relative group/layers">
          <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-forage-bg transition-colors text-forage-ink border border-forage-border">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <div className="absolute right-12 top-0 bg-white rounded-xl shadow-2xl p-3 border border-forage-border hidden group-hover/layers:flex flex-col gap-1 w-44 animate-slide-in">
            {(["standard", "satellite"] as const).map((id) => (
              <button
                key={id}
                onClick={() => setMapLayer(id)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-sans font-bold hover:bg-forage-bg transition-colors ${
                  mapLayer === id ? "text-forage-green" : "text-forage-ink"
                }`}
              >
                {id === "standard" ? "Standard Map" : "Satellite View"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Season count pill ─────────────────────────────────────────────── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[500] pointer-events-none hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm border border-forage-border rounded-full px-4 py-1.5 shadow-sm">
          <p className="text-xs font-sans font-bold text-forage-ink">
            <span className="text-forage-green">{seasonCount}</span> species in season · {visibleLocations.length} locations shown
          </p>
        </div>
      </div>

      {/* ── Habitat legend ────────────────────────────────────────────────── */}
      <div className="absolute bottom-16 left-4 z-[500] pointer-events-none hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm border border-forage-border rounded-xl px-3 py-2.5 shadow-sm">
          <p className="text-[10px] font-sans font-bold text-forage-muted uppercase tracking-widest mb-2">Habitat</p>
          {(Object.entries(HABITAT_COLOURS) as [HabitatType, string][]).map(([label, colour]) => (
            <div key={label} className="flex items-center gap-2 mb-1 last:mb-0">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: colour }} />
              <span className="text-[11px] font-sans text-forage-ink font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Near Me GPS ───────────────────────────────────────────────────── */}
      <button
        onClick={handleNearMe}
        title="Find my location"
        className="absolute bottom-24 right-4 z-[500] w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-forage-border hover:bg-forage-bg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a7c5f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <line x1="12" y1="2" x2="12" y2="7"/>
          <line x1="12" y1="17" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="7" y2="12"/>
          <line x1="17" y1="12" x2="22" y2="12"/>
        </svg>
      </button>

      {gpsError && (
        <div className="absolute bottom-36 right-4 z-[500] bg-white text-forage-red text-xs font-sans font-semibold px-3 py-1.5 rounded-lg shadow-md border border-forage-border animate-fade-in whitespace-nowrap">
          Location access needed
        </div>
      )}

      {/* ── Location panel ────────────────────────────────────────────────── */}
      {activeLocData && (
        <LocationPanel
          location={activeLocData}
          onClose={() => setActiveLocation(null)}
        />
      )}
    </div>
  );
}
