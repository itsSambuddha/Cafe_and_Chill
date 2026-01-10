import { AboutHero } from "@/components/about/AboutHero";
import { StorySection } from "@/components/about/StorySection";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { AboutCTA } from "@/components/about/AboutCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Coffee & Chill",
    description: "Learn about our origin, our process, and our philosophy.",
};

export default function AboutPage() {
    return (
        <main className="bg-coffee-50/50">
            <AboutHero />
            <StorySection />
            <ValuesGrid />
            <AboutCTA />
        </main>
    );
}
