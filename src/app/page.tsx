import Hero from "@/components/homepage/Hero";
import SeasonalSection from "@/components/homepage/SeasonalSection";
import InfoSection from "@/components/homepage/InfoSection";
import FooterCTA from "@/components/homepage/FooterCTA";
import CommunityGallery from "@/components/homepage/CommunityGallery";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SeasonalSection />
      <InfoSection />
      <FooterCTA />
      <CommunityGallery />
      
      {/* Simple Footer */}
      <footer className="py-12 bg-white border-t border-forage-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-forage-ink font-serif font-bold text-xl">
            🌿 Bristol Foraging
          </div>
          <div className="text-forage-muted text-sm font-sans">
            © {new Date().getFullYear()} Bristol Foraging. Forage responsibly.
          </div>
          <div className="flex gap-6 text-sm font-sans text-forage-muted">
            <a href="#" className="hover:text-forage-green transition-colors">Privacy</a>
            <a href="#" className="hover:text-forage-green transition-colors">Terms</a>
            <a href="#" className="hover:text-forage-green transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
