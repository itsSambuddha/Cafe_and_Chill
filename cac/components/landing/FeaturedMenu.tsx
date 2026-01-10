// components/landing/FeaturedMenu.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuCategory } from "@/data/menu";
import { MenuCard } from "@/app/(menu)/MenuCard";
import { CATEGORY_LABELS } from "@/data/menuTheme";
import { BadgePill } from "@/components/ui/badge-pill";
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
        <section className="relative mx-auto max-w-6xl px-6 py-24 md:px-10">
            {/* Background decoration matching Hero */}
            <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-coffee-100/40 blur-3xl" />

            {/* vertical MENU texture (Coffee styled) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 items-center justify-center md:flex">
                <div
                    aria-hidden="true"
                    className="select-none text-[180px] font-extrabold leading-none text-coffee-100/60 lg:text-[220px]"
                    style={{
                        letterSpacing: "0.2em",
                        transform: "translateX(-40%)",
                    }}
                >
                    M
                    <br />
                    E
                    <br />
                    N
                    <br />
                    U
                </div>
            </div>

            {/* content shifted to the right */}
            <div className="relative md:ml-16">
                {/* heading + view full menu */}
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-4">
                        <BadgePill text="Featured & Favorites" icon={Sparkles} className="w-fit" />
                        <h2 className="text-3xl font-bold tracking-tight text-coffee-900 sm:text-4xl md:text-5xl">
                            A quick look at the menu.
                        </h2>
                        <p className="max-w-md text-lg leading-relaxed text-coffee-800/70">
                            A couple of picks from each section, so you get a feel for what
                            this cafe does best.
                        </p>
                    </div>
                    <Link
                        href="/menu"
                        className="group inline-flex items-center gap-2 rounded-full border border-coffee-200 bg-white/50 px-6 py-3 text-sm font-medium text-coffee-900 transition-all hover:bg-coffee-900 hover:text-white"
                    >
                        <span>View full menu</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* category pills */}
                <div className="mb-8 flex flex-wrap gap-2 md:gap-3">
                    {FEATURED_ORDER.map((cat) => {
                        const isActive = cat === activeCategory;
                        const Icon = getCategoryIcon(cat);

                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "border-coffee-900 bg-coffee-900 text-white shadow-lg shadow-coffee-900/10"
                                        : "border-transparent bg-coffee-50 text-coffee-800/60 hover:bg-coffee-100 hover:text-coffee-900"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-coffee-100" : "text-coffee-600")} />
                                <span>{CATEGORY_LABELS[cat]}</span>
                            </button>
                        );
                    })}
                </div>

                {/* asymmetrical layout: plate image + cards with bounce-in */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
                    >
                        {/* left: circular plate + main card */}
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            {mainItem && (
                                <>
                                    <div
                                        className="relative h-[220px] w-[220px] flex-shrink-0 rounded-full md:h-[260px] md:w-[260px]"
                                        style={{
                                            boxShadow:
                                                "0 25px 50px -12px rgba(111, 55, 15, 0.25)",
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-full border-4 border-white bg-coffee-50" />
                                        <img
                                            src={getFeaturedImageForCategory(activeCategory)}
                                            alt={mainItem.name}
                                            className="relative h-full w-full rounded-full object-cover p-1"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.1,
                                            }}
                                        >
                                            <MenuCard item={mainItem} variant="grid" />
                                        </motion.div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* right: secondary item, if present */}
                        <div className="flex items-center">
                            {secondaryItem && (
                                <motion.div
                                    className="w-full"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.2,
                                    }}
                                >
                                    <MenuCard item={secondaryItem} variant="list" />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
