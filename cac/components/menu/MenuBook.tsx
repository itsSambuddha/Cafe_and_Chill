// components/menu/MenuBook.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuCategory } from "@/data/menu";

const CATEGORY_LABELS: Record<MenuCategory, string> = {
  "coffee-hot": "Hot Coffee",
  "coffee-cold": "Cold Coffee",
  beverages: "Other Beverages",
  food: "Food & Snacks",
  dessert: "Desserts",
  special: "Specials",
};

const CATEGORY_ORDER: MenuCategory[] = [
  "coffee-hot",
  "coffee-cold",
  "beverages",
  "food",
  "dessert",
  "special",
];

export interface MenuBookProps {
  activeCategory: MenuCategory;
  onCategoryChange: (category: MenuCategory) => void;
}

export function MenuBook({ activeCategory, onCategoryChange }: MenuBookProps) {
  const itemsForCategory = menuItems.filter(
    (i) => i.category === activeCategory
  );

  const leftColumn = itemsForCategory.slice(0, Math.ceil(itemsForCategory.length / 2));
  const rightColumn = itemsForCategory.slice(Math.ceil(itemsForCategory.length / 2));

  return (
    <div className="grid w-full max-w-5xl gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      {/* left: header + category pills */}
      <div className="space-y-5">
        <div className="inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500 backdrop-blur">
          Coffee &amp; Chill · Shillong
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Today&apos;s menu
        </h2>
        <p className="max-w-md text-sm text-slate-600">
          A small, intentional list of coffees, plates, and desserts. Tap
          through categories to see how the mood of the page shifts with what
          you&apos;re in the mood for.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          {CATEGORY_ORDER.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`rounded-full border px-3 py-1 transition ${
                  isActive
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-black/10 bg-white/70 text-slate-600 hover:border-black/40 hover:text-slate-900"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid gap-2 text-[11px] text-slate-500 sm:grid-cols-2">
          <span>Freshly brewed coffee and made-to-order plates.</span>
          <span>Menu may shift with the season and what&apos;s good that day.</span>
        </div>
      </div>

      {/* right: the open menu card */}
      <motion.div
        layout
        className="relative rounded-[32px] border border-black/8 bg-white/85 p-[1px] shadow-[0_26px_80px_rgba(15,23,42,0.35)] backdrop-blur"
      >
        <div className="relative grid h-full grid-cols-1 rounded-[30px] bg-[radial-gradient(circle_at_top,_#fdf9f4,_#f3ebe1)] md:grid-cols-2">
          {/* center crease */}
          <div className="pointer-events-none absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-black/10 via-black/5 to-black/10 opacity-70" />

          {/* left page */}
          <div className="relative flex flex-col gap-3 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Section
                </p>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  {CATEGORY_LABELS[activeCategory]}
                </h3>
              </div>
              <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] text-slate-500">
                {itemsForCategory.length} items
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + "-left"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="space-y-2 pt-2"
              >
                {leftColumn.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 rounded-xl bg-white/80 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium tracking-tight text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
                        {item.shortDesc}
                      </p>
                    </div>
                    <span className="ml-2 flex-shrink-0 text-xs font-semibold text-slate-900">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* right page */}
          <div className="relative flex flex-col gap-3 border-t border-black/5 p-4 sm:border-l sm:border-t-0 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + "-right"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, delay: 0.05 }}
                className="space-y-2 pt-4"
              >
                {rightColumn.length === 0 && (
                  <p className="text-[11px] text-slate-500">
                    More items for this category are on their way.
                  </p>
                )}

                {rightColumn.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 rounded-xl bg-white/80 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium tracking-tight text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
                        {item.shortDesc}
                      </p>
                    </div>
                    <span className="ml-2 flex-shrink-0 text-xs font-semibold text-slate-900">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto flex items-center justify-between pt-3 text-[10px] text-slate-400">
              <span>Coffee &amp; Chill</span>
              <span>All prices inclusive of taxes</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
