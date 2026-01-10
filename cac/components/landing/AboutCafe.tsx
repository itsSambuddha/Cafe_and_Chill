// components/landing/AboutCafe.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/landing/SectionLabel";

export function AboutCafe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax for huge image
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section ref={containerRef} className="relative bg-white py-32 md:py-40">
            {/* Standardized Vertical Label (Right side) */}
            <SectionLabel text="ABOUT" side="right" />

            {/* Decorative background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 right-0 h-[80vh] w-[80vh] -translate-y-1/2 translate-x-1/3 rounded-full bg-[radial-gradient(circle_at_center,_rgba(120,53,15,0.06),_transparent_70%)] blur-3xl" />
                <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 rounded-full bg-coffee-100/30 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-10 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Text Content */}
                    <div className="space-y-10 lg:pr-10 lg:mr-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coffee-600">
                                <Sparkles className="h-4 w-4" />
                                <span>The Vibe</span>
                            </div>
                            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-coffee-900 md:text-5xl lg:text-7xl">
                                More than just<br />
                                <span className="italic text-coffee-500 font-serif">good coffee.</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg leading-relaxed text-coffee-800/80 md:text-xl font-light"
                        >
                            We built Cafe & Chill for the slow mornings, the quiet work sessions, and
                            the conversations that lose track of time. It&apos;s a space designed to
                            feel like your living room—just with much better espresso.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-2 border-b-2 border-coffee-900 pb-1 text-sm font-bold uppercase tracking-wider text-coffee-900 transition-all hover:gap-4 hover:text-coffee-600 hover:border-coffee-600"
                            >
                                <span>Read our full story</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Visual Placeholder */}
                    <div className="relative lg:mr-24 xl:mr-32">
                        <motion.div
                            style={{ y: imageY }}
                            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-coffee-200 shadow-2xl"
                        >
                            {/* Placeholder for real image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                                <span className="uppercase tracking-widest text-xs font-medium">Interior Image</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-6 backdrop-blur-md shadow-lg"
                            >
                                <div className="flex items-center justify-between text-xs text-coffee-900 uppercase tracking-wider">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold">Open Daily</span>
                                        <span className="text-coffee-600">7am - 7pm</span>
                                    </div>
                                    <div className="h-8 w-[1px] bg-coffee-200" />
                                    <div className="flex flex-col gap-1 text-right">
                                        <span className="font-bold">Locally Roasted</span>
                                        <span className="text-coffee-600">Shillong, IN</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
