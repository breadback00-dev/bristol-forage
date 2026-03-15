import Image from "next/image";
import Link from "next/link";

export default function InfoSection() {
  return (
    <section className="py-16 bg-forage-bg">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Local Sightings */}
        <div className="bg-[#fcfbf9] rounded-2xl p-8 border border-forage-border flex flex-col">
          <h2 className="text-2xl font-serif font-bold text-forage-ink mb-6">Local Sightings & Maps</h2>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-[11px] uppercase tracking-wider text-forage-muted font-bold font-sans">Recent Sightings Map Preview</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-sm font-sans border-b border-forage-border pb-2 last:border-0">
                <span className="text-forage-ink tracking-tight">Ashton Court: Early Wild Garlic in the lower woods</span>
                <span className="text-forage-muted whitespace-nowrap">2 days ago</span>
              </li>
              <li className="flex justify-between items-center text-sm font-sans border-b border-forage-border pb-2 last:border-0">
                <span className="text-forage-ink tracking-tight">Leigh Woods: Blackthorns starting to blossom</span>
                <span className="text-forage-muted whitespace-nowrap">4 days ago</span>
              </li>
              <li className="flex justify-between items-center text-sm font-sans border-b border-forage-border pb-2 last:border-0">
                <span className="text-forage-ink tracking-tight">Snuff Mills: Fresh Nettles along the river path</span>
                <span className="text-forage-muted whitespace-nowrap">1 week ago</span>
              </li>
            </ul>
            <Link href="/map" className="text-sm font-sans text-forage-green hover:underline inline-block">
              Open live map →
            </Link>
          </div>

          <div className="mt-auto">
            <h3 className="text-[11px] uppercase tracking-wider text-forage-muted font-bold font-sans mb-3">Find of the Week</h3>
            <div className="relative h-24 rounded-lg overflow-hidden mb-3">
              <Image 
                src="/images/homepage/wild_garlic.png" 
                alt="Find of the week" 
                fill 
                className="object-cover"
              />
            </div>
            <p className="text-sm italic font-serif text-forage-ink">
              "First elderberries of the season near Avon path." — @BristolForager
            </p>
          </div>
        </div>

        {/* Right Column: Essentials */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl overflow-hidden border border-forage-border shadow-sm flex flex-col h-full">
            <div className="relative w-full h-48 md:h-64">
              <Image 
                src="/images/homepage/nettles.png" 
                alt="Foraging gear and fresh find" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h2 className="text-2xl font-serif font-bold text-forage-ink mb-3">Foraging Essentials</h2>
              <p className="text-sm font-sans text-forage-muted mb-6 leading-relaxed">
                Learn basic gear, legal boundaries, and safe identification steps before collecting anything. Our guide covers everything you need to start your foraging journey safely and legally in Bristol's public spaces.
              </p>
              <Link 
                href="/guide" 
                className="inline-block px-8 py-3 bg-forage-green text-white rounded-full text-sm font-bold self-start hover:bg-forage-green-dark transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
