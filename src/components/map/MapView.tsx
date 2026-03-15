"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { locations } from "@/data/locations";
import { species } from "@/data/species";
import { isInSeason } from "@/lib/seasons";
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

// ── Main component ─────────────────────────────────────────────────────────────

export default function MapView() {
  const [search, setSearch] = useState("");

  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState<"standard" | "satellite">("standard");
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const [mapTarget, setMapTarget] = useState<MapTarget | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState(false);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gpsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        setMapTarget({ type: "fly", lat: loc.lat, lng: loc.lng, zoom: 15 });
        setActiveLocation(id);
      } else {
        const matching = locations.filter((l) => l.speciesIds.includes(id));
        if (!matching.length) return;
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

      return (
        !search ||
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        locSpecies.some(
          (s) =>
            s!.name.toLowerCase().includes(search.toLowerCase()) ||
            s!.habitat.toLowerCase().includes(search.toLowerCase())
        )
      );
    });
  }, [search]);

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

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden bg-forage-bg">

      <div className="flex-grow w-full relative h-[600px] mb-0 min-h-0">
        <MapContainer
          center={[51.454, -2.594]}
          zoom={12}
          className="w-full h-full z-0"
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
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
      </div>

      {/* ── Layer switcher ────────────────────────────────────────────────── */}
      <div className="absolute right-4 top-24 z-[500]">
        <div className="relative group/layers">
          <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-forage-bg transition-colors text-forage-ink border border-forage-border pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <div className="absolute right-12 top-0 bg-white rounded-xl shadow-2xl p-3 border border-forage-border hidden group-hover/layers:flex flex-col gap-1 w-44 animate-slide-in pointer-events-auto">
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

      {/* ── Near Me GPS ───────────────────────────────────────────────────── */}
      <button
        onClick={handleNearMe}
        title="Find my location"
        className="absolute bottom-24 right-4 z-[500] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-forage-border hover:bg-forage-bg transition-colors pointer-events-auto"
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
