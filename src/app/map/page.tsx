"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-forage-bg">
      <p className="font-sans text-forage-muted text-sm animate-pulse">Loading map…</p>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <MapView />
    </div>
  );
}
