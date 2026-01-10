"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StoryBlockProps {
    title: string;
    content: string;
    imageSide: "left" | "right";
    index: number;
}

const stories = [
    {
        title: "The Origin",
        content:
            "It started with a simple question: Why is it so hard to find a place that takes coffee seriously but doesn't take itself too seriously? We wanted a spot where the espresso is dialled in to the gram, but you can still wear sweatpants.",
        imageSide: "left" as const,
    },
    {
        title: "The Process",
        content:
            "We source our beans from small-lot farmers who prioritize sustainability. Every batch is roasted locally in small quantities to ensure peak freshness. It's not the easiest way to do things, but you can taste the difference in every cup.",
        imageSide: "right" as const,
    },
    {
        title: "The Atmosphere",
        content:
            "Lighting that flatters, playlists that set the mood, and seating designed for hours of conversation. We built this space to be an extension of your living room—just with much better coffee machinery.",
        imageSide: "left" as const,
    },
];

export function StorySection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
            <div className="flex flex-col gap-24 md:gap-32">
                {stories.map((story, i) => (
                    <StoryBlock key={i} {...story} index={i} />
                ))}
            </div>
        </section>
    );
}

function StoryBlock({ title, content, imageSide, index }: StoryBlockProps) {
    const isLeft = imageSide === "left";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn(
                "grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24",
                !isLeft && "md:[direction:rtl]" // Flip order on desktop only
            )}
        >
            {/* Image Placeholder area */}
            <div className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl bg-coffee-100")}>
                {/* Placeholder visual - In production this would be <Image /> */}
                <div className="absolute inset-0 flex items-center justify-center text-coffee-300">
                    <span className="text-sm font-medium uppercase tracking-widest">Image: {title}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-coffee-200/50 to-transparent mix-blend-multiply" />
            </div>

            {/* Text Area */}
            <div className={cn(!isLeft && "md:[direction:ltr]")}>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-coffee-900 md:text-4xl">
                    {title}
                </h2>
                <p className="text-lg leading-relaxed text-coffee-800/80 md:text-xl">
                    {content}
                </p>
            </div>
        </motion.div>
    );
}
