// components/menu/MenuParallaxScene.tsx
"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, useMemo } from "react";
import { CATEGORY_ASSETS } from "@/data/menuAssets";
import type { MenuCategory } from "@/data/menu";

interface MenuParallaxSceneProps {
  activeCategory: MenuCategory;
  children: ReactNode;
}

const CATEGORY_THEMES: Record<
  MenuCategory,
  { bgFrom: string; bgTo: string; accent: string }
> = {
  "coffee-hot": {
    bgFrom: "#f7eee5",
    bgTo: "#f0e0cf",
    accent: "rgba(148,81,31,0.45)",
  },
  "coffee-cold": {
    bgFrom: "#eaf4ff",
    bgTo: "#d8e7ff",
    accent: "rgba(56,116,203,0.5)",
  },
  beverages: {
    bgFrom: "#e9f7f0",
    bgTo: "#d4efe3",
    accent: "rgba(16,131,88,0.5)",
  },
  food: {
    bgFrom: "#f5f7e9",
    bgTo: "#e7edcf",
    accent: "rgba(137,155,45,0.5)",
  },
  dessert: {
    bgFrom: "#fdf0f4",
    bgTo: "#f4d7e3",
    accent: "rgba(174,68,120,0.55)",
  },
  special: {
    bgFrom: "#f4f0ff",
    bgTo: "#e0d8ff",
    accent: "rgba(94,73,192,0.55)",
  },
};

export function MenuParallaxScene({
  activeCategory,
  children,
}: MenuParallaxSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rawBgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bgY = useSpring(rawBgY, { stiffness: 80, damping: 20, mass: 0.8 });

  const theme =
    CATEGORY_THEMES[activeCategory] ?? CATEGORY_THEMES["coffee-hot"];

  const assets = useMemo(
    () => CATEGORY_ASSETS[activeCategory] ?? [],
    [activeCategory]
  );

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      animate={{
        background: `radial-gradient(circle at top, ${theme.bgFrom}, ${theme.bgTo})`,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* accent glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full"
        animate={{
          boxShadow: [
            `0 0 0 0 ${theme.accent}`,
            `0 0 200px 110px ${theme.accent}`,
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* vignette + grid drifting with scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.05),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.22),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.14] mix-blend-soft-light">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </motion.div>

      {/* ambient blur blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[18%] h-40 w-40 rounded-[40%] bg-white/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] bottom-[12%] h-52 w-52 rounded-[45%] bg-white/16 blur-3xl"
      />

      {/* floating food images with infinite subtle motion */}
      <div className="pointer-events-none absolute inset-0">
        {assets.slice(0, 4).map((src, index) => {
          const positions = [
            { left: "6%", top: "18%" },
            { right: "4%", top: "24%" },
            { left: "10%", bottom: "12%" },
            { right: "8%", bottom: "16%" },
          ] as const;

          const floatDistance = index % 2 === 0 ? 18 : 26;
          const floatDuration = 7 + index * 1.7;

          return (
            <motion.img
              key={src + index}
              src={src}
              alt=""
              style={{ ...positions[index] }}
              initial={{ opacity: 0.95, y: 0, scale: 1 }}
              animate={{
                opacity: 0.98,
                y: [0, -floatDistance, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: floatDuration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="absolute h-40 w-40 rounded-3xl object-cover shadow-[0_24px_70px_rgba(15,23,42,0.45)] brightness-[1.05] contrast-[1.04]"
            />
          );
        })}
      </div>

      {/* foreground content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
