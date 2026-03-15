import Image from "next/image";

const items = [
  {
    name: "Wild Garlic",
    subtitle: "Spring Highlight",
    image: "/images/homepage/wild_garlic.png",
  },
  {
    name: "Nettles",
    subtitle: "Spring Highlight",
    image: "/images/homepage/nettles.png",
  },
  {
    name: "Alexanders",
    subtitle: "Spring Highlight",
    image: "/images/homepage/alexanders.jpg",
  },
  {
    name: "Wood Sorrel",
    subtitle: "Spring Highlight",
    image: "/images/homepage/hero.png", // Placeholder for now
  },
];

export default function SeasonalSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-forage-ink mb-12">
          What's in Season Right Now?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-serif font-bold leading-tight">{item.name}</h3>
                <p className="text-sm font-sans text-white/80">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
