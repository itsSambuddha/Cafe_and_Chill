// components/menu/MenuHeroMinimal.tsx
"use client";

import { motion } from "framer-motion";
import type { MenuCategory } from "@/data/menu";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/data/menuTheme";
import { Coffee, CupSoda, UtensilsCrossed, CakeSlice, Sparkles } from "lucide-react";

interface MenuHeroMinimalProps {
  activeCategory: MenuCategory;
  onCategoryChange: (category: MenuCategory) => void;
}

const CATEGORY_ORDER: MenuCategory[] = [
  "coffee-hot",
  "coffee-cold",
  "food",
  "dessert",
  "beverages",
  "special",
];

export function MenuHeroMinimal({
  activeCategory,
  onCategoryChange,
}: MenuHeroMinimalProps) {
  const theme = CATEGORY_COLORS[activeCategory];
  const marqueeText = "TODAY'S MENU • ".repeat(6);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* more breathing room above marquee */}
      <div className="pt-10 pb-4 border-b border-neutral-100 bg-white/90">
        <div className="overflow-hidden">
          <motion.div
            className="whitespace-nowrap text-[80px] font-extrabold leading-[0.8] text-neutral-900/5 sm:text-[120px] md:text-[150px]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeText}
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 pt-8 pb-10 md:px-10 md:pb-12">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-[44px]">
            A menu that feels like the cafe.
          </h1>
          <p className="max-w-xl text-sm text-neutral-600">
            Bright, minimal, and easy to scan. Pick a section and watch the
            palette and plates shift to match what you&apos;re in the mood for.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] md:gap-3">
          {CATEGORY_ORDER.map((cat) => {
            const isActive = cat === activeCategory;
            const Icon = getCategoryIcon(cat);
            const catTheme = CATEGORY_COLORS[cat];

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
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
      </div>
    </section>
  );
}

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
