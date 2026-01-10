"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function AboutCafe() {
    return (
        <section className="relative overflow-hidden bg-white py-24 md:py-32">
            {/* Decorative gradient blob matching Hero */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="absolute right-0 top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle_at_center,_rgba(120,53,15,0.08),_transparent_70%)] blur-3xl opacity-60" />
                <div className="absolute left-0 bottom-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 rounded-full bg-coffee-100/40 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:items-center md:gap-20 md:px-10">

                {/* Left: Text Content */}
                <div className="relative z-10 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-coffee-600">
                            <Sparkles className="h-4 w-4" />
                            <span>The Vibe</span>
                        </div>
                        <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-coffee-900 md:text-5xl lg:text-6xl">
                            More than just
                            <span className="block italic text-coffee-500">good coffee.</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg leading-relaxed text-coffee-800/70 md:text-xl"
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
                            className="group inline-flex items-center gap-2 border-b border-coffee-900 pb-1 text-sm font-medium text-coffee-900 transition-all hover:gap-3 hover:border-coffee-500 hover:text-coffee-600"
                        >
                            <span>Read our full story</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Right: Visual Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-coffee-200 md:aspect-square"
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
                        className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/90 p-4 backdrop-blur-md"
                    >
                        <div className="flex items-center justify-between text-xs text-coffee-900">
                            <div className="flex flex-col">
                                <span className="font-semibold">Open Daily</span>
                                <span className="text-coffee-600">7am - 7pm</span>
                            </div>
                            <div className="h-8 w-[1px] bg-coffee-100" />
                            <div className="flex flex-col text-right">
                                <span className="font-semibold">Locally Roasted</span>
                                <span className="text-coffee-600">Shillong, IN</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
