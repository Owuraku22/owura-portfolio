import Hero from "@/components/Hero";
import PhilosophySection from "@/components/PhilosophySection";
import TechStackOrbit from "@/components/TechStackOrbit";
import SelectedWorks from "@/components/SelectedWorks";
import TestimonialSection from "@/components/TestimonialSection";
import ClickMeMediumBlogSection from "@/components/ClickMeMediumBlogSection";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <PhilosophySection />
      <TechStackOrbit />
      <SelectedWorks />
      <ClickMeMediumBlogSection />
      <TestimonialSection />
    </main>
  );
}
