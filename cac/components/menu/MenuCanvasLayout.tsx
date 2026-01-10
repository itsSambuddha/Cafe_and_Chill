// components/menu/MenuCanvasLayout.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuCategory } from "@/data/menu";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/data/menuTheme";

interface MenuCanvasLayoutProps {
  activeCategory: MenuCategory;
}

export function MenuCanvasLayout({ activeCategory }: MenuCanvasLayoutProps) {
  const items = menuItems.filter((i) => i.category === activeCategory);
  const theme = CATEGORY_COLORS[activeCategory];
  const [featured, ...rest] = items;

  return (
    <section
      key={activeCategory}
      className="bg-white"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-4 md:flex-row md:items-start md:px-10">
        {/* left: hero plate and description */}
        <div className="relative flex-1 space-y-6">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
              {CATEGORY_LABELS[activeCategory]}
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              {featured ? featured.name : "From the kitchen"}
            </h2>
            <p className="max-w-md text-sm text-neutral-600">
              {featured
                ? featured.shortDesc
                : "Pick a section to see what’s currently on this part of the menu."}
            </p>
          </div>

          {/* hero + supporting plates */}
          <div className="relative h-[260px] w-full max-w-[480px]">
            {/* main plate */}
            {featured && (
              <motion.div
                className="absolute left-0 top-6 h-[220px] w-[220px] rounded-full"
                style={{
                  backgroundColor: theme.softBg,
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)",
                }}
              >
                <motion.img
                  src={getHeroImageForCategory(activeCategory)}
                  alt={featured.name}
                  className="h-full w-full rounded-full object-cover"
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1], // subtle bounce-in
                  }}
                />
              </motion.div>
            )}

            {/* supporting plates */}
            <FloatingPlate
              src={getSupportingImage(activeCategory, 0)}
              className="absolute right-4 top-0 h-[120px] w-[120px]"
              delay={0.1}
              themeBg={theme.softBg}
            />
            <FloatingPlate
              src={getSupportingImage(activeCategory, 1)}
              className="absolute right-8 bottom-0 h-[140px] w-[140px]"
              delay={0.2}
              themeBg={theme.softBg}
            />
          </div>

          <p className="text-[11px] text-neutral-500">
            Allergies or specific preferences? Let the team know and the
            kitchen will try to adapt where possible.
          </p>
        </div>

        {/* right: items with bounce-in on category change */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
              Items on this section
            </p>
            <span className="text-[11px] text-neutral-500">
              {items.length} options
            </span>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

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
              className="space-y-3"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.04 * index,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <MenuLine
                    name={item.name}
                    price={item.price}
                    desc={item.shortDesc}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

interface MenuLineProps {
  name: string;
  price: number;
  desc: string;
}

function MenuLine({ name, price, desc }: MenuLineProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium tracking-[0.03em] text-neutral-900">
          {name}
        </p>
        <span className="flex-shrink-0 text-sm font-semibold text-neutral-900">
          ₹{price}
        </span>
      </div>
      <p className="text-[11px] leading-snug text-neutral-600">{desc}</p>
    </div>
  );
}

interface FloatingPlateProps {
  src: string | null;
  className?: string;
  delay?: number;
  themeBg: string;
}

function FloatingPlate({
  src,
  className,
  delay = 0,
  themeBg,
}: FloatingPlateProps) {
  if (!src) return null;

  return (
    <motion.div
      className={className}
      style={{
        backgroundColor: themeBg,
        boxShadow:
          "0 22px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.03)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full rounded-full object-cover"
      />
    </motion.div>
  );
}

// Image mappings – ensure these filenames exist in /public/assets/menu/
function getHeroImageForCategory(cat: MenuCategory) {
  switch (cat) {
    case "coffee-hot":
      return "/assets/menu/coffee-latte-art-01.jpeg";
    case "coffee-cold":
      return "/assets/menu/coffee-cold-01.jpeg";
    case "food":
      return "/assets/menu/tribal-rice-01.jpeg";
    case "dessert":
      return "/assets/menu/brownie-01.jpeg";
    case "beverages":
      return "/assets/menu/mojito-01.jpeg";
    case "special":
    default:
      return "/assets/menu/cafe-drink-03.jpeg";
  }
}

function getSupportingImage(cat: MenuCategory, index: number) {
  if (cat === "food") {
    return index === 0
      ? "/assets/menu/chicken-wings-01.jpeg"
      : "/assets/menu/butter-toast-01.jpeg";
  }
  if (cat === "dessert") {
    return index === 0
      ? "/assets/menu/tiramisu-01.jpeg"
      : "/assets/menu/brownie-01.jpeg";
  }
  if (cat === "coffee-hot") {
    return index === 0
      ? "/assets/menu/coffee-hot-01.jpeg"
      : "/assets/menu/coffee-latte-art-01.jpeg";
  }
  if (cat === "coffee-cold") {
    return index === 0
      ? "/assets/menu/frappe-01.jpeg"
      : "/assets/menu/cold-brew-01.jpeg";
  }
  if (cat === "beverages") {
    return index === 0
      ? "/assets/menu/lemon-ice-tea-01.jpeg"
      : "/assets/menu/lemon-ice-tea-top-01.jpeg";
  }
  // special / default
  return index === 0
    ? "/assets/menu/cafe-drink-01.jpeg"
    : "/assets/menu/cafe-drink-02.jpeg";
}
