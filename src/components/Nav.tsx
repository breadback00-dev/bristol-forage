"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { pendingCount } from "@/lib/sightings";
import { species } from "@/data/species";
import { locations } from "@/data/locations";

type DropdownResult = {
  type: "species" | "location";
  id: string;
  name: string;
};

const tabs = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Map" },
  { href: "/guide", label: "Field Guide" },
  { href: "/essentials", label: "Essentials" },
  { href: "/community", label: "Community" },
];

export default function Nav() {
  const pathname = usePathname();
  const [pending, setPending] = useState(0);
  const [dropdownResults, setDropdownResults] = useState<DropdownResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPending(pendingCount());
    const handler = () => setPending(pendingCount());
    window.addEventListener("forage:sighting-changed", handler);
    return () => window.removeEventListener("forage:sighting-changed", handler);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function handleSearchChange(val: string) {
    window.dispatchEvent(new CustomEvent("forage:search", { detail: val }));
    if (!val.trim()) {
      setDropdownResults([]);
      setShowDropdown(false);
      return;
    }
    const q = val.toLowerCase();
    const speciesHits: DropdownResult[] = species
      .filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((s) => ({ type: "species", id: s.id, name: s.name }));
    const locationHits: DropdownResult[] = locations
      .filter((l) => l.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((l) => ({ type: "location", id: l.id, name: l.name }));
    const results = [...speciesHits, ...locationHits].slice(0, 6);
    setDropdownResults(results);
    setShowDropdown(results.length > 0);
  }

  function handleSelect(result: DropdownResult) {
    window.dispatchEvent(new CustomEvent("forage:select", { detail: { type: result.type, id: result.id } }));
    setShowDropdown(false);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const isHome = pathname === "/";
  const isMap = pathname === "/map";

  return (
    <nav className={`${isHome ? "absolute top-0 left-0 right-0" : "sticky top-0"} z-[1000] h-16 flex items-center justify-between px-6 transition-all ${
      isHome ? "bg-gradient-to-b from-black/40 to-transparent" : "bg-white border-b border-forage-border shadow-sm"
    }`}>
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className={`flex items-center gap-2 font-sans font-extrabold text-xl tracking-tight transition-colors ${
            isHome ? "text-white" : "text-forage-green-dark"
          }`}
        >
          <span className="text-2xl">🌿</span>
          <span className={isMap ? "hidden lg:inline" : "inline"}>Bristol Foraging</span>
        </Link>

        {isMap && (
          <div ref={searchContainerRef} className="relative w-64 md:w-[500px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-forage-ink/40 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search plants or locations..."
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={(e) => { if (e.target.value.trim() && dropdownResults.length > 0) setShowDropdown(true); }}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-forage-bg border-none font-sans text-sm focus:ring-2 focus:ring-forage-green/20 outline-none"
            />
            {showDropdown && (
              <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-lg shadow-lg border border-forage-border overflow-hidden animate-fade-in">
                {dropdownResults.map((result, i) => (
                  <button
                    key={i}
                    onMouseDown={(e) => { e.preventDefault(); handleSelect(result); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-forage-bg flex items-center gap-3 font-sans text-sm text-forage-ink border-b border-forage-border last:border-0 transition-colors"
                  >
                    <span className="text-base leading-none">{result.type === "location" ? "📍" : "🌿"}</span>
                    <span className="font-semibold flex-1">{result.name}</span>
                    <span className="text-forage-muted text-[11px] capitalize">{result.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`text-[14px] font-sans font-semibold transition-colors ${
                isActive(tab.href)
                  ? isHome
                    ? "text-white"
                    : "text-forage-green"
                  : isHome
                    ? "text-white/65 hover:text-white"
                    : "text-forage-muted hover:text-forage-ink"
              }`}
            >
              {tab.label}
              {tab.label === "Community" && pending > 0 && (
                <span className="ml-1.5 bg-forage-red text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {pending}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
