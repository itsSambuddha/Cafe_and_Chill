"use client";

import { motion } from "framer-motion";
import { Leaf, User, Armchair, Coffee } from "lucide-react";

const values = [
    {
        icon: Leaf,
        title: "Ethical Sourcing",
        desc: "Direct trade relationships with farmers ensure fair wages and exceptional bean quality.",
    },
    {
        icon: Coffee,
        title: "Artisanal Roasting",
        desc: "Small batches roasted weekly to highlight the unique notes of every single origin.",
    },
    {
        icon: Armchair,
        title: "Slow Living",
        desc: "A space designed for you to disconnect from the noise and reconnect with yourself.",
    },
];

export function ValuesGrid() {
    return (
        <section className="bg-coffee-900 px-6 py-24 text-coffee-50 md:px-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-semibold md:text-4xl">Our Philosophy</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {values.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10"
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-coffee-500/20 text-coffee-100">
                                <val.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-medium">{val.title}</h3>
                            <p className="text-coffee-200/80 leading-relaxed">
                                {val.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
