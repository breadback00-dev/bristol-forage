import Image from "next/image";
import Link from "next/link";

export default function FooterCTA() {
  return (
    <section className="relative py-24 w-full flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/homepage/hero.png" // Placeholder for footer CTA bg
          alt="Chopping board with vegetables"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
          Know what you're picking.
        </h2>
        <p className="text-lg font-sans text-white/90 mb-8 max-w-lg mx-auto leading-relaxed">
          Detailed identification notes, lookalike warnings, and harvest guides for 17 Bristol species.
        </p>

        <Link
          href="/guide"
          className="inline-block px-10 py-4 bg-forage-green hover:bg-forage-green-dark transition-colors rounded-full font-sans font-semibold text-lg"
        >
          Browse the Field Guide
        </Link>
      </div>
    </section>
  );
}
