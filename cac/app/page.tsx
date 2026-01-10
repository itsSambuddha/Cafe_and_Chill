import { Hero } from "@/components/landing/Hero";
import { FeaturedMenu } from "@/components/landing/FeaturedMenu";
import { AboutCafe } from "@/components/landing/AboutCafe";
import { VisitSection } from "@/components/landing/VisitSection";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <FeaturedMenu />
      <AboutCafe />
      <VisitSection />
    </main>
  );
}
