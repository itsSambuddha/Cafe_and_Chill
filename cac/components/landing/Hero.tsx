"use client";

import { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    animate,
} from "framer-motion";
import {
    FlaskConical,
    Coffee,
    Clock,
    Sparkles,
    ChevronDown,
} from "lucide-react";
import { HeroAnimation } from "@/components/landing/HeroAnimation";
import { HeroFeatures } from "@/components/landing/HeroFeatures";


export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Parallax State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse coordinates (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Smoothed mouse values
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);


    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120, // Faster scroll response
        damping: 25,
        restDelta: 0.001,
    });

    // Unified Progress (Desktop: Scroll | Mobile: Auto-Loop)
    const activeProgress = useMotionValue(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            // Mobile: Infinite Auto-Loop (0 -> 1)
            const controls = animate(activeProgress, 1, {
                duration: 8,
                ease: "linear",
                repeat: Infinity,
                repeatType: "mirror", // Ping-pong for smooth continuity
                repeatDelay: 1
            });
            return () => controls.stop();
        } else {
            // Desktop: Sync with Scroll
            const unsubscribe = smoothProgress.on("change", (v) => activeProgress.set(v));
            return () => unsubscribe();
        }
    }, [isMobile, smoothProgress, activeProgress]);

    // Animations linked to activeProgress
    const titleY = useTransform(activeProgress, [0, 1], ["0%", "25%"]);

    // Parallax layers for background elements
    const layer1X = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
    const layer1Y = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

    const layer2X = useTransform(smoothMouseX, [-1, 1], [30, -30]);
    const layer2Y = useTransform(smoothMouseY, [-1, 1], [30, -30]);


    // Text phases
    const text1Opacity = useTransform(activeProgress, [0, 0.15], [1, 0]);
    const text1Y = useTransform(activeProgress, [0, 0.15], [0, -40]);

    const text2Opacity = useTransform(activeProgress, [0.2, 0.3, 0.55, 0.65], [0, 1, 1, 0]);
    const text2Scale = useTransform(activeProgress, [0.2, 0.65], [0.95, 1.05]);

    const text3Opacity = useTransform(activeProgress, [0.7, 0.85], [0, 1]);
    const text3Y = useTransform(activeProgress, [0.7, 0.85], [40, 0]);

    return (
        <main
            ref={containerRef}
            className="relative bg-white md:h-[320vh]"
        >
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden">

                {/* Living Background */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    {/* Ambient Glow */}
                    <motion.div
                        style={{ x: layer1X, y: layer1Y }}
                        className="absolute inset-0 flex items-center justify-center opacity-60"
                    >
                        <div className="h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle_at_center,_rgba(120,53,15,0.12),_transparent_70%)] blur-3xl" />
                    </motion.div>

                    {/* Dynamic Shape */}
                    <motion.div
                        style={{ x: layer2X, y: layer2Y }}
                        className="absolute -right-40 -top-40 h-96 w-96 rotate-12 rounded-full bg-coffee-50/50 blur-3xl"
                    />
                </div>

                {/* Huge Parallax Title */}
                <motion.div
                    style={{ y: titleY, x: layer1X }}
                    className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-multiply"
                >
                    <h1 className="select-none whitespace-nowrap text-[18vw] font-bold leading-none tracking-tighter text-coffee-100/80">
                        CRAFT
                    </h1>
                </motion.div>

                {/* Center Stage */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 md:px-10 pb-32">

                    {/* Scrolling Narrative */}
                    <div className="absolute top-[15%] z-20 h-32 w-full text-center md:top-[18%] pointer-events-none">

                        {/* Phase 1 */}
                        <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-x-0">
                            <span className="inline-block rounded-full bg-coffee-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-coffee-600 mb-4">
                                The Setup
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-coffee-900 md:text-5xl lg:text-6xl">
                                More than just a latte.
                            </h2>
                        </motion.div>

                        {/* Phase 2 */}
                        <motion.div style={{ opacity: text2Opacity, scale: text2Scale }} className="absolute inset-x-0">
                            <h2 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-coffee-900 to-coffee-600 md:text-6xl lg:text-7xl">
                                Precision in every layer.
                            </h2>
                        </motion.div>

                        {/* Phase 3 */}
                        <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-x-0">
                            <p className="text-xl font-medium text-coffee-800/80 md:text-2xl">
                                We slowed down time so you can taste the details.
                            </p>
                        </motion.div>
                    </div>

                    {/* Hero Animation (The Cup) */}
                    <div className="mt-12 flex w-full justify-center md:mt-0 scale-75 md:scale-90 transition-transform duration-700">
                        <HeroAnimation scrollYProgress={activeProgress} />
                    </div>

                    {/* Floating UI Elements (Desktop) */}
                    <div className="pointer-events-none absolute inset-0 hidden w-full max-w-7xl mx-auto md:block">

                        {/* Left: Info Card (Interactive) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="pointer-events-auto absolute left-0 top-1/2 w-72 -translate-y-1/2 p-6 backdrop-blur-sm rounded-2xl border border-white/40 bg-white/30 hover:bg-white/50 transition-colors duration-300"
                        >
                            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coffee-900">
                                <Sparkles className="h-4 w-4 text-orange-400" />
                                <span>Deconstructed</span>
                            </div>
                            <p className="mb-6 text-sm leading-relaxed text-coffee-800">
                                Experience the anatomy of a perfect pour. Espresso, milk, and foam orchestrated in perfect harmony.
                            </p>
                        </motion.div>

                        {/* Right: Specs (Interactive) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 pointer-events-auto"
                        >
                            <Badge icon={FlaskConical} text="Single Origin Espresso" />
                            <Badge icon={Coffee} text="Steamed Full Cream Milk" />
                            <Badge icon={Clock} text="28s Extraction Time" />
                        </motion.div>

                    </div>

                    {/* Scroll Hint (Simplified/Moved or Removed in favor of Marketing?) */}
                    {/* Let's keep it but maybe smaller or blended? Or remove it if Features takes the space. */}
                    {/* User said "market/advertize... like a proper business". Features is better. */}

                    <div className="absolute  bottom-0 left-0 right-0 z-30">

                        <HeroFeatures />

                        {/* Subtle Scroll Hint below features */}
                        <motion.div
                            animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="flex justify-center mt-2"
                        >
                            <ChevronDown className="h-4 w-4 text-coffee-400" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function Badge({ icon: Icon, text }: { icon: any; text: string }) {
    return (
        <div className="group flex items-center gap-3 rounded-full border border-white/50 bg-white/40 px-5 py-3 text-xs font-medium text-coffee-900 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-white/60 hover:shadow-md cursor-default">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coffee-100/50 text-coffee-800 group-hover:bg-coffee-100 group-hover:text-coffee-900 transition-colors">
                <Icon className="h-3.5 w-3.5" />
            </span>
            <span>{text}</span>
        </div>
    );
}
