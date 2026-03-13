"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pendingCount } from "@/lib/sightings";

const tabs = [
  { href: "/", label: "Map" },
  { href: "/guide", label: "Field Guide" },
  { href: "/community", label: "Community" },
];

export default function Nav() {
  const pathname = usePathname();
  const [pending, setPending] = useState(0);

  useEffect(() => {
    setPending(pendingCount());
    const handler = () => setPending(pendingCount());
    window.addEventListener("forage:sighting-changed", handler);
    return () => window.removeEventListener("forage:sighting-changed", handler);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] h-12 bg-forage-green-dark flex items-center px-4 gap-1">
      <Link
        href="/"
        className="text-white font-serif font-bold text-[15px] mr-4 tracking-wide whitespace-nowrap"
      >
        🌿 Bristol Foraging
      </Link>

      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-sans transition-all ${
            isActive(tab.href)
              ? "bg-white/20 text-white"
              : "text-white/65 hover:text-white"
          }`}
        >
          {tab.label}
          {tab.label === "Community" && pending > 0 && (
            <span className="absolute -top-0.5 -right-1 bg-orange-500 text-white text-[9px] font-sans px-1.5 py-px rounded-full">
              {pending}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
