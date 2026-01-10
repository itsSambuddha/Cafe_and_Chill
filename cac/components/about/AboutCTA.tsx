"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
    return (
        <section className="px-6 py-24 text-center md:px-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl bg-coffee-100 p-12 md:p-20"
            >
                <h2 className="text-3xl font-semibold tracking-tight text-coffee-900 md:text-5xl">
                    Come taste the difference.
                </h2>
                <p className="max-w-md text-lg text-coffee-800/80">
                    We’re open every day from 7am to 7pm. No reservations needed for coffee, just come on in.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/menu"
                        className="group inline-flex items-center gap-2 rounded-full bg-coffee-900 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-black hover:px-10"
                    >
                        <span>View Menu</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="/#visit"
                        className="inline-flex items-center gap-2 rounded-full border border-coffee-900/10 bg-white px-8 py-3 text-sm font-medium text-coffee-900 transition-colors hover:bg-coffee-50"
                    >
                        Get Directions
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
