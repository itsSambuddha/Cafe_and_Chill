// components/landing/FeaturedMenu.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuCategory } from "@/data/menu";
import { MenuCard } from "@/app/(menu)/MenuCard";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/data/menuTheme";
import {
  Coffee,
  CupSoda,
  UtensilsCrossed,
  CakeSlice,
  Sparkles,
} from "lucide-react";

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

  const theme = CATEGORY_COLORS[activeCategory];

  const itemsForCategory = menuItems
    .filter((item) => item.category === activeCategory)
    .slice(0, 2); // only 2 per category

  const mainItem = itemsForCategory[0] ?? null;
  const secondaryItem = itemsForCategory[1] ?? null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 mt-12 md:mt-16">
      {/* vertical MENU texture on the left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 items-center justify-center md:flex">
        <div
          aria-hidden="true"
          className="select-none text-[180px] font-extrabold leading-none text-[color:#A8C3A0]/40 lg:text-[220px]"
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
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Featured &amp; Favorites
            </p>
            <h2
              className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{
                color: "#6B8E65",
                fontFamily:
                  "Playfair Display, ui-serif, Georgia, 'Times New Roman', serif",
              }}
            >
              A quick look at the menu.
            </h2>
            <p className="mt-1 max-w-md text-sm text-neutral-600">
              A couple of picks from each section, so you get a feel for what
              this cafe does best.
            </p>
          </div>
          <a
            href="/menu"
            className="mt-2 inline-flex items-center text-xs font-medium text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
          >
            View full menu
          </a>
        </div>

        {/* category pills */}
        <div className="mb-6 flex flex-wrap gap-2 text-[11px] md:gap-3">
          {FEATURED_ORDER.map((cat) => {
            const isActive = cat === activeCategory;
            const Icon = getCategoryIcon(cat);
            const catTheme = CATEGORY_COLORS[cat];

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-white text-neutral-700 hover:border-neutral-400"
                }`}
                style={{
                  borderColor: isActive
                    ? catTheme.accent
                    : `${catTheme.accent}66`,
                  backgroundColor: isActive ? catTheme.accent : "white",
                }}
              >
                <Icon className="h-3 w-3" />
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
              duration: 0.35,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
          >
            {/* left: circular plate + main card */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {mainItem && (
                <>
                  <div
                    className="h-[180px] w-[180px] flex-shrink-0 rounded-full"
                    style={{
                      backgroundColor: theme.softBg,
                      boxShadow:
                        "0 22px 60px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
                    }}
                  >
                    <img
                      src={getFeaturedImageForCategory(activeCategory)}
                      alt={mainItem.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      <MenuCard item={mainItem} variant="grid" />
                    </motion.div>
                  </div>
                </>
              )}
            </div>

            {/* right: secondary item, if present */}
            <div className="space-y-4">
              {secondaryItem && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
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
