"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SectionSeparatorProps {
    orientation?: "left" | "right";
    className?: string;
}

// Simple Cubic Bezier point calculator
function getBezierPoint(t: number, p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number]) {
    const oneMinusT = 1 - t;
    const x = Math.pow(oneMinusT, 3) * p0[0] +
        3 * Math.pow(oneMinusT, 2) * t * p1[0] +
        3 * oneMinusT * Math.pow(t, 2) * p2[0] +
        Math.pow(t, 3) * p3[0];

    const y = Math.pow(oneMinusT, 3) * p0[1] +
        3 * Math.pow(oneMinusT, 2) * t * p1[1] +
        3 * oneMinusT * Math.pow(t, 2) * p2[1] +
        Math.pow(t, 3) * p3[1];
    return [x, y];
}

export function SectionSeparator({ orientation = "left", className }: SectionSeparatorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    // Configuration for the Flow Curve
    // We define points for a smooth S-curve
    const curvePoints = useMemo(() => {
        if (orientation === "left") {
            // Top Left -> Bottom Right
            return {
                p0: [5, 10] as [number, number],
                p1: [40, 10] as [number, number],
                p2: [60, 90] as [number, number],
                p3: [95, 90] as [number, number],
                steamPath: "M5 10 C 40 10, 60 90, 95 90"
            };
        } else {
            // Bottom Left -> Top Right
            return {
                p0: [5, 90] as [number, number],
                p1: [40, 90] as [number, number],
                p2: [60, 10] as [number, number],
                p3: [95, 10] as [number, number],
                steamPath: "M5 90 C 40 90, 60 10, 95 10"
            };
        }
    }, [orientation]);

    // Generate beans
    const beans = useMemo(() => {
        const count = 25; // Increased density
        const result = [];
        const { p0, p1, p2, p3 } = curvePoints;

        for (let i = 0; i < count; i++) {
            const t = i / (count - 1); // 0 to 1
            const [bx, by] = getBezierPoint(t, p0, p1, p2, p3);

            // INCREASED SCATTER for organic "cloud" look
            const scatterX = (Math.random() - 0.5) * 15; // +/- 7.5%
            const scatterY = (Math.random() - 0.5) * 30; // +/- 15% (Vertical scatter is nice)

            // Size Gradient & Layers
            // We want mostly Large/Medium beans, fewer tiny ones.
            const scaleT = orientation === "left" ? (1 - t) : t;

            // 3 Layers of depth
            // 0 = Back (Small, Slow, Blurred)
            // 1 = Mid (Medium, Normal)
            // 2 = Front (Big, Fast, Sharp)
            const layer = Math.random() > 0.7 ? 2 : Math.random() > 0.4 ? 1 : 0;

            let size = 0;
            if (layer === 2) size = 140 + Math.random() * 40; // 140-180
            else if (layer === 1) size = 80 + Math.random() * 40; // 80-120
            else size = 40 + Math.random() * 30; // 40-70

            // Apply global gradient influence to size (optional, keeps it organized)
            size = size * (0.6 + 0.4 * scaleT);

            result.push({
                id: i,
                x: bx + scatterX,
                y: by + scatterY,
                size,
                rotation: Math.random() * 360,
                layer, // 0, 1, 2
                flip: Math.random() > 0.5 ? -1 : 1
            });
        }
        return result.sort((a, b) => a.layer - b.layer); // Render Back -> Front
    }, [orientation, curvePoints]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full h-56 md:h-[400px] relative overflow-hidden pointer-events-none z-10",
                className
            )}
            aria-hidden="true"
        >
            {/* Steam/Aroma Path Background */}
            <svg
                className="absolute inset-0 w-full h-full opacity-20 text-coffee-200"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <motion.path
                    d={curvePoints.steamPath}
                    stroke="currentColor"
                    strokeWidth="15" // Thick misty path
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#blur-steam)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                    <filter id="blur-steam" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                    </filter>
                </defs>
            </svg>

            {beans.map((bean) => (
                <ParallaxBean
                    key={bean.id}
                    bean={bean}
                    progress={smoothProgress}
                />
            ))}
        </div>
    );
}

function ParallaxBean({
    bean,
    progress
}: {
    bean: { x: number, y: number, size: number, rotation: number, layer: number, flip: number },
    progress: MotionValue<number>
}) {
    // Parallax by Layer
    // Layer 2 (Front): Moves -200px (Fast)
    // Layer 1 (Mid): Moves -100px
    // Layer 0 (Back): Moves -30px (Slow)
    const speed = bean.layer === 2 ? -200 : bean.layer === 1 ? -100 : -30;

    // Randomize initial Y slightly so they don't all start synced
    const initialYOffset = (Math.random() - 0.5) * 50;

    const y = useTransform(progress, [0, 1], [initialYOffset, initialYOffset + speed]);
    const rotate = useTransform(progress, [0, 1], [bean.rotation, bean.rotation + (bean.layer + 1) * 30]);

    // Opacity/Blur by Layer
    const opacity = bean.layer === 2 ? 1 : bean.layer === 1 ? 0.8 : 0.5;
    const blur = bean.layer === 2 ? "none" : bean.layer === 1 ? "blur(1px)" : "blur(3px)";

    return (
        <motion.div
            style={{
                left: `${bean.x}%`,
                top: `${bean.y}%`,
                y,
                rotate,
                scaleX: bean.flip,
                zIndex: bean.layer * 10
            }}
            className="absolute mix-blend-multiply"
        >
            <Image
                src="/assets/floating-bean12.png"
                alt="bean"
                width={200}
                height={200}
                className="object-contain"
                style={{
                    width: `${bean.size}px`,
                    height: `${bean.size}px`,
                    opacity,
                    filter: blur
                }}
            />
        </motion.div>
    );
}
