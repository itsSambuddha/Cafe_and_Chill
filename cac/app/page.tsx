import { Hero } from "@/components/landing/Hero";
import { FeaturedMenu } from "@/components/landing/FeaturedMenu";
import { AboutCafe } from "@/components/landing/AboutCafe";
import { VisitSection } from "@/components/landing/VisitSection";
import { SectionSeparator } from "@/components/landing/SectionSeparator";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <SectionSeparator orientation="left" className="-mb-20" />
      <FeaturedMenu />
      <SectionSeparator orientation="right" className="-my-20" />
      <AboutCafe />
      <SectionSeparator orientation="left" className="-mt-20" />
      <VisitSection />
    </main>
  );
}
