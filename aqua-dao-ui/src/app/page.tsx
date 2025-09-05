import { HeroSection } from "@/sections/HeroSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { HowItWorks } from "@/sections/HowItWorks";

export default function HomePage() {
  return (
    <section className="size-full">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <HowItWorks />
    </section>
  );
}
