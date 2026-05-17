import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import PopularDestinations from "@/components/PopularDestinations";

export default function Home() {
  return (
    <div className="space-y-8 pb-12">
      <HeroSection />
      <FeatureCards />
      <PopularDestinations />
    </div>
  );
}
