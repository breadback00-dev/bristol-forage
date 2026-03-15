"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SLIDES = [
  { src: "/images/homepage/wild_garlic.png",  alt: "Wild garlic carpeting a Bristol woodland floor" },
  { src: "/images/homepage/nettles.png",       alt: "Stinging nettles at a hedgerow edge" },
  { src: "/images/homepage/alexanders.jpg",    alt: "Alexanders growing along a Bristol path" },
  { src: "/images/homepage/hero.png",          alt: "Forager exploring Bristol greenery" },
];

export default function Hero() {
  const [query, setQuery]     = useState("");
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/map?q=${encodeURIComponent(query.trim())}` : "/map");
  }

  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center text-white overflow-hidden">

      {/* ── Slideshow images ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* ── Overlays for text legibility ── */}
      {/* Base dark tint */}
      <div className="absolute inset-0 z-[1] bg-black/45" />
      {/* Top-to-centre gradient (darkens behind heading) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/10 to-black/55" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-sans font-extrabold mb-8 tracking-tight drop-shadow-xl">
          Find your next wild edible
        </h1>

        <div className="flex flex-col gap-5 max-w-2xl mx-auto">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex items-center group">
            <span className="absolute left-6 text-forage-ink/40 group-focus-within:text-forage-green transition-colors pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by plant name, habitat, or season…"
              className="w-full pl-16 pr-6 py-5 rounded-full text-forage-ink bg-white text-base font-sans shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
            />
          </form>

          {/* CTA button — black pill */}
          <div className="flex justify-center">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 bg-black text-white font-sans font-bold text-base px-8 py-3.5 rounded-full hover:bg-forage-ink transition-colors shadow-lg"
            >
              Explore local map
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Slide navigation dots ── */}
        <div className="flex gap-2.5 justify-center mt-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
