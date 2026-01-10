"use client";

import { motion } from "framer-motion";

export function AboutHero() {
    return (
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-coffee-50 px-6 pt-24 pb-12 md:min-h-[80vh] md:pt-32">
            {/* Background Gradient / Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -right-[10%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-coffee-200),_transparent_70%)] blur-3xl opacity-40" />
                <div className="absolute top-[40%] -left-[10%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-coffee-300),_transparent_70%)] blur-3xl opacity-30" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="mb-4 inline-block rounded-full border border-coffee-800/10 bg-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-coffee-800 backdrop-blur-sm">
                        Our Story
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.1,
                    }}
                    className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight text-coffee-900 md:text-7xl lg:text-8xl"
                >
                    Crafted for the
                    <span className="block text-coffee-600 italic">chill moments.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2,
                    }}
                    className="mx-auto mt-8 max-w-2xl text-lg text-coffee-800/70 md:text-xl"
                >
                    We believe coffee isn&apos;t just caffeine. It&apos;s a ritual, a
                    pause button, and a reason to gather. Welcome to our living room.
                </motion.p>
            </div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-widest text-coffee-800/40">
                    <span>Scroll</span>
                    <div className="h-10 w-[1px] bg-coffee-800/20" />
                </div>
            </motion.div>
        </section>
    );
}
