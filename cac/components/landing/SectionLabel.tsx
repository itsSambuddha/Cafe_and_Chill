"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
    text: string;
    side?: "left" | "right";
    className?: string;
    textColor?: string;
}

export function SectionLabel({
    text,
    side = "left",
    className,
    textColor = "text-coffee-900/10" // Dark text with low opacity for watermark effect
}: SectionLabelProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax effect
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "pointer-events-none absolute inset-y-0 hidden w-[15vw] items-center justify-center lg:flex z-0",
                side === "left" ? "left-0 xl:left-4" : "right-0 xl:right-4",
                className
            )}
        >
            <motion.div
                style={{ y }}
                aria-hidden="true"
                className={cn(
                    "select-none text-[6rem] xl:text-[7rem] font-black leading-none whitespace-nowrap",
                    textColor
                )}
            >
                <div
                    style={{
                        writingMode: "vertical-rl",
                        textOrientation: "upright",
                        letterSpacing: "0.5em",
                    }}
                >
                    {text}
                </div>
            </motion.div>
        </div>
    );
}
