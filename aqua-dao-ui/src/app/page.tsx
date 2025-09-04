import { HeroSection } from "@/sections/HeroSection";
import { FeaturesSection } from "@/sections/FeaturesSection";

export default function HomePage() {
  return (
    <section className="size-full">
      <HeroSection />
      <FeaturesSection />
    </section>
  );
}
