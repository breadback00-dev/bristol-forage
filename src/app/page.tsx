"use client";

import dynamic from "next/dynamic";

// Leaflet requires window — must skip SSR
const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 top-12 flex items-center justify-center bg-forage-bg">
      <p className="font-sans text-forage-muted text-sm">Loading map…</p>
    </div>
  ),
});

export default function MapPage() {
  return <MapView />;
}
