"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  FlaskConical,
  Coffee,
  Clock,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { HeroAnimation } from "@/components/landing/HeroAnimation";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax for background title
  const titleY = useTransform(smoothProgress, [0, 1], ["0%", "18%"]);

  // Story text animations
  const text1Opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.2], [0, -20]);

  const text2Opacity = useTransform(
    smoothProgress,
    [0.25, 0.35, 0.55, 0.65],
    [0, 1, 1, 0]
  );
  const text2Scale = useTransform(smoothProgress, [0.25, 0.65], [0.92, 1.06]);

  const text3Opacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
  const text3Y = useTransform(smoothProgress, [0.7, 0.85], [20, 0]);

  // Sidebar fade and mobile hint fade
  const sideOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <main
      ref={containerRef}
      className="relative bg-white md:h-[320vh]"
    >
      {/* sticky viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* background glow + subtle diagonal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle_at_center,_rgba(120,53,15,0.16),_transparent_70%)] blur-2xl" />
          </div>
          <div className="absolute -inset-x-40 -top-40 h-64 rotate-[-7deg] bg-gradient-to-r from-white via-[rgba(120,53,15,0.04)] to-transparent" />
        </div>

        {/* parallax background title */}
        <motion.div
          style={{ y: titleY }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          <h1 className="select-none whitespace-nowrap text-[16vw] font-light leading-none tracking-tighter text-black/5">
            Signature Product
          </h1>
        </motion.div>

        {/* main content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 md:px-10">
          {/* storytelling text */}
          <div className="absolute top-[14%] z-20 h-28 w-full text-center md:top-[18%]">
            {/* 1: setup – what you think a latte is */}
            <motion.div
              style={{ opacity: text1Opacity, y: text1Y }}
              className="absolute inset-x-0"
            >
              <p className="text-xl font-semibold tracking-tight text-coffee-800/90 md:text-2xl">
                It looks like a simple latte.
              </p>
            </motion.div>

            {/* 2: reveal – what’s actually happening inside the cup */}
            <motion.div
              style={{ opacity: text2Opacity, scale: text2Scale }}
              className="absolute inset-x-0"
            >
              <h2 className="text-3xl font-bold tracking-tight text-coffee-800 md:text-5xl">
                Inside, it&apos;s coffee and milk, precisely layered.
              </h2>
            </motion.div>

            {/* 3: statement – what the video is doing */}
            <motion.div
              style={{ opacity: text3Opacity, y: text3Y }}
              className="absolute inset-x-0"
            >
              <p className="text-base font-medium tracking-wide text-coffee-800/80 md:text-lg">
                Every layer, slowed just enough to see.
              </p>
            </motion.div>
          </div>

          {/* hero animation area (cup dissection) */}
          <div className="mt-10 flex w-full justify-center md:mt-0">
            <HeroAnimation scrollYProgress={smoothProgress} />
          </div>

          {/* sidebar UI (desktop) */}
          <motion.div
            style={{ opacity: sideOpacity }}
            className="pointer-events-none absolute inset-0 mx-auto hidden h-full w-full max-w-7xl md:block"
          >
            {/* left info block */}
            <div className="pointer-events-auto absolute left-6 top-1/2 w-64 -translate-y-1/2 lg:left-10">
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-coffee-800">
                <Sparkles className="h-4 w-4" />
                <span>Inside the cup</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                This isn&apos;t just a hero shot of a drink. It&apos;s a breakdown of
                what happens when espresso meets milk — every layer separated,
                every swirl slowed down so you can design the experience as
                carefully as the recipe.
              </p>
              <button className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                See the layers
              </button>
            </div>

            {/* right specs block */}
            <div className="absolute right-6 top-[18%] bottom-[18%] flex flex-col items-end justify-between lg:right-10">
              {/* stamp-style badge */}
              <div className="pointer-events-auto">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white shadow-xl shadow-black/15 rotate-3">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-coffee-800/60 text-[10px] uppercase tracking-[0.18em] text-coffee-900">
                    <span className="text-center leading-tight">
                      Future
                      <br />
                      Signature
                      <br />
                      Product
                    </span>
                  </div>
                </div>
              </div>

              {/* spec pills – tied to what the video shows */}
              <div className="flex flex-col items-end gap-3">
                <Badge icon={FlaskConical} text="Layered extraction · espresso" />
                <Badge icon={Coffee} text="Milk, crema, and foam separated" />
                <Badge icon={Clock} text="A few seconds slowed into a story" />
              </div>
            </div>
          </motion.div>

          {/* mobile scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 text-gray-400 md:hidden"
          >
            <div className="flex flex-col items-center gap-1 text-xs">
              <span>Scroll</span>
              <ChevronDown className="animate-bounce" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function Badge({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-gray-100 bg-white/90 px-4 py-2 text-xs text-gray-700 shadow-sm backdrop-blur-sm">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coffee-100 text-coffee-900">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span>{text}</span>
    </div>
  );
}
