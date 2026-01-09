"use client";

import { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring 
} from "framer-motion";
import { 
  FlaskConical, Coffee, Clock, Sparkles, ChevronDown 
} from "lucide-react";
import { HeroAnimation } from "@/components/landing/HeroAnimation";

export function Hero() {
  // 1. Scroll Setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value for less jittery animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. Animations
  // Parallax Title (moves slightly slower than scroll)
  const titleY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  // --- STORY TEXT ANIMATIONS ---
  // Stage 1: "The Daily Grind" (Visible at 0, fades out by 0.2)
  const text1Opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.2], [0, -20]);

  // Stage 2: "Break the Routine" (Enters 0.25, Exits 0.65)
  const text2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const text2Scale = useTransform(smoothProgress, [0.25, 0.65], [0.9, 1.1]);

  // Stage 3: "Pure Ingredients" (Enters 0.7)
  const text3Opacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
  const text3Y = useTransform(smoothProgress, [0.7, 0.85], [20, 0]);

  return (
    // 300vh height = 3 screens of scroll distance to complete animation
    <main ref={containerRef} className="relative bg-white md:h-[300vh]">
      
      {/* STICKY VIEWPORT: Keeps content centered while user scrolls through height */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        
        {/* -- Background Glow -- */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
           <div className="h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle_at_center,_rgba(146,64,14,0.12),_transparent_70%)] blur-2xl" />
        </div>

        {/* -- Parallax Background Title -- */}
        <motion.div 
          style={{ y: titleY }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        >
          <h1 className="select-none text-[16vw] font-light tracking-tighter leading-none text-black/5 whitespace-nowrap">
            Signature Product
          </h1>
        </motion.div>

        {/* -- Main Content Stage -- */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 md:px-10">
          
          {/* Dynamic Storytelling Text Overlay */}
          <div className="absolute top-[15%] md:top-[20%] w-full text-center h-24 z-20">
            
            {/* Story 1 */}
            <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-x-0">
               <p className="text-xl font-medium tracking-wide text-coffee-800/80">The Daily Grind</p>
            </motion.div>

            {/* Story 2 (Explosion) */}
            <motion.div style={{ opacity: text2Opacity, scale: text2Scale }} className="absolute inset-x-0">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-coffee-700">Break the Routine</h2>
            </motion.div>

            {/* Story 3 (Result) */}
            <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-x-0">
               <p className="text-xl font-medium tracking-wide text-coffee-800/80">Pure Ingredients. Pure Chill.</p>
            </motion.div>
          </div>

          {/* Canvas Animation */}
          <div className="mt-8 md:mt-0 w-full flex justify-center">
            <HeroAnimation scrollYProgress={smoothProgress} />
          </div>

          {/* -- Sidebar UI (Fades out as animation starts) -- */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="pointer-events-none absolute inset-0 w-full h-full max-w-7xl mx-auto hidden md:block"
          >
            {/* Left Info Block */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-64 pointer-events-auto">
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-coffee-800">
                <Sparkles className="h-4 w-4" />
                <span>Signature Highlight</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-6">
                Experience coffee in its purest form. A blend that defies gravity and expectations.
              </p>
              <button className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Right Specs Block */}
            <div className="absolute right-4 top-[20%] bottom-[20%] flex flex-col justify-between items-end">
               {/* Floating Badge */}
               <div className="h-24 w-24 rounded-full border border-gray-100 bg-white shadow-xl flex items-center justify-center rotate-6">
                 <div className="text-[10px] text-center uppercase tracking-widest text-coffee-900 font-semibold">
                   Future<br/>Classic
                 </div>
               </div>

               {/* Spec Pills */}
               <div className="flex flex-col gap-3 items-end">
                 <Badge icon={FlaskConical} text="Less Acidity" />
                 <Badge icon={Coffee} text="2x Caffeine" />
                 <Badge icon={Clock} text="16h Steep" />
               </div>
            </div>
          </motion.div>
          
          {/* Mobile Scroll Hint */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-10 animate-bounce text-gray-400 md:hidden"
          >
            <ChevronDown />
          </motion.div>

        </div>
      </div>
    </main>
  );
}

// Simple Helper Component
function Badge({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-xs text-gray-700 shadow-sm border border-gray-100">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coffee-100 text-coffee-900">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span>{text}</span>
    </div>
  );
}