// components/landing/FeaturedMenu.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuCategory } from "@/data/menu";
import { MenuCard } from "@/app/(menu)/MenuCard";
import { CATEGORY_LABELS } from "@/data/menuTheme";
import { BadgePill } from "@/components/ui/badge-pill";
import { SectionLabel } from "@/components/landing/SectionLabel";
import {
    Coffee,
    CupSoda,
    UtensilsCrossed,
    CakeSlice,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FEATURED_ORDER: MenuCategory[] = [
    "coffee-hot",
    "coffee-cold",
    "food",
    "dessert",
];

function getCategoryIcon(cat: MenuCategory) {
    switch (cat) {
        case "coffee-hot":
            return Coffee;
        case "coffee-cold":
            return CupSoda;
        case "food":
            return UtensilsCrossed;
        case "dessert":
            return CakeSlice;
        default:
            return Sparkles;
    }
}

function getFeaturedImageForCategory(cat: MenuCategory) {
    switch (cat) {
        case "coffee-hot":
            return "/assets/menu/coffee-latte-art-01.jpeg";
        case "coffee-cold":
            return "/assets/menu/coffee-cold-01.jpeg";
        case "food":
            return "/assets/menu/butter-toast-01.jpeg";
        case "dessert":
            return "/assets/menu/brownie-01.jpeg";
        default:
            return "/assets/menu/cafe-drink-01.jpeg";
    }
}

export function FeaturedMenu() {
    const [activeCategory, setActiveCategory] = useState<MenuCategory>("food");

    const itemsForCategory = menuItems
        .filter((item) => item.category === activeCategory)
        .slice(0, 2); // only 2 per category

    const mainItem = itemsForCategory[0] ?? null;
    const secondaryItem = itemsForCategory[1] ?? null;

    return (
        <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 overflow-hidden">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-coffee-100/40 blur-3xl" />

            {/* Consistent Vertical Label */}
            <SectionLabel text="MENU" side="left" />

            {/* content shifted to the right to accommodate label */}
            <div className="relative z-10 lg:ml-24 xl:ml-32">
                {/* heading + view full menu */}
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <BadgePill text="Featured & Favorites" icon={Sparkles} className="w-fit" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-coffee-900 sm:text-5xl md:text-6xl"
                        >
                            A quick look at<br />the menu.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link
                            href="/menu"
                            className="group inline-flex items-center gap-2 rounded-full border border-coffee-200 bg-white/50 px-8 py-4 text-sm font-medium text-coffee-900 transition-all hover:bg-coffee-900 hover:text-white hover:scale-105 active:scale-95"
                        >
                            <span>View full menu</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* category pills */}
                <div className="mb-12 flex flex-wrap gap-2 md:gap-3">
                    {FEATURED_ORDER.map((cat, idx) => {
                        const isActive = cat === activeCategory;
                        const Icon = getCategoryIcon(cat);

                        return (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "border-coffee-900 bg-coffee-900 text-white shadow-lg shadow-coffee-900/10 scale-105"
                                        : "border-transparent bg-coffee-50 text-coffee-800/60 hover:bg-coffee-100 hover:text-coffee-900 hover:scale-105"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-coffee-100" : "text-coffee-600")} />
                                <span>{CATEGORY_LABELS[cat]}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* asymmetrical layout: plate image + cards with bounce-in */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{
                            duration: 0.4,
                            ease: [0.23, 1, 0.32, 1], // snappy cubic bezier
                        }}
                        className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center"
                    >
                        {/* left: circular plate + main card */}
                        <div className="flex flex-col gap-8 md:flex-row md:items-center">
                            {mainItem && (
                                <>
                                    <motion.div
                                        initial={{ rotate: -20, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, ease: "backOut" }}
                                        className="relative h-[240px] w-[240px] flex-shrink-0 rounded-full md:h-[300px] md:w-[300px]"
                                        style={{
                                            boxShadow:
                                                "0 30px 60px -15px rgba(111, 55, 15, 0.25)",
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-full border-4 border-white bg-coffee-50" />
                                        <img
                                            src={getFeaturedImageForCategory(activeCategory)}
                                            alt={mainItem.name}
                                            className="relative h-full w-full rounded-full object-cover p-1"
                                        />
                                    </motion.div>

                                    <div className="flex-1 w-full">
                                        <MenuCard item={mainItem} variant="grid" />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* right: secondary item, if present */}
                        <div className="flex items-center w-full">
                            {secondaryItem && (
                                <MenuCard item={secondaryItem} variant="list" />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
