import Image from "next/image";

const galleryImages = [
  {
    src: "/images/homepage/gallery1.jpg",
    user: "@bristol_forager",
    caption: "Wild garlic by the gorge",
  },
  {
    src: "/images/homepage/gallery2.jpg",
    user: "@nature_wild",
    caption: "First nettles of spring",
  },
  {
    src: "/images/homepage/gallery3.jpg",
    user: "@seasonal_finds",
    caption: "A good morning's haul",
  },
  {
    src: "/images/homepage/gallery4.jpg",
    user: "@wild_edibles",
    caption: "Hedgerow magic",
  },
];

export default function CommunityGallery() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-sans font-extrabold text-forage-ink mb-4 tracking-tight">
              Share your next adventure
            </h2>
            <p className="text-forage-muted font-sans text-lg">
              Show us how you <span className="font-bold text-forage-ink">#BristolForage</span> by tagging us <span className="font-bold text-forage-ink">@BristolForage</span> for a chance to be featured!
            </p>
          </div>
          
          {/* Social Icons Mockup */}
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border border-forage-border flex items-center justify-center text-forage-ink hover:bg-forage-bg cursor-pointer transition-colors text-xl">
                {i === 1 && "📸"}
                {i === 2 && "🎵"}
                {i === 3 && "📘"}
                {i === 4 && "🐦"}
                {i === 5 && "💼"}
              </div>
            ))}
          </div>
        </div>

        {/* 4 Images Across */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, i) => (
            <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
              <Image
                src={img.src}
                alt={`Community finding by ${img.user}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                <p className="font-sans font-semibold text-sm leading-tight">{img.user}</p>
                <p className="font-sans text-xs text-white/75 mt-0.5">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
