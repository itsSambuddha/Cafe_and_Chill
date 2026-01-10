"use client";

import { useRef, useState, useEffect } from "react";
import { useCanvasFrames } from "@/hooks/use-canvas-frames";
import type { MotionValue } from "framer-motion";

interface HeroAnimationProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroAnimation({ scrollYProgress }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const imagesLoaded = useCanvasFrames(
    canvasRef as React.RefObject<HTMLCanvasElement>,
    240,
    "/Landing/Hero/sequence",
    isMobile,
    scrollYProgress
  );

  return (
    <div className="relative flex w-full items-center justify-center">
      {/* loader */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[hsl(25,40%,35%)]" />
        </div>
      )}

      {/* canvas with heavy feathered mask */}
      <canvas
        ref={canvasRef}
        width={900}
        height={900}
        className="h-[48vh] w-full max-w-[620px] md:h-[680px] md:max-w-[680px] object-contain"
        style={{
          mixBlendMode: "multiply",
          // UPDATED: 'closest-side' ensures the fade hits the edge perfectly prevents the "box" look
          maskImage: "radial-gradient(closest-side, black 80%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, black 80%, transparent 100%)",
        }}
      />
    </div>
  );
}