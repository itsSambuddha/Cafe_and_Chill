"use client";

import { useRef, useState, useEffect } from "react";
import { useCanvasFrames } from "@/hooks/use-canvas-frames";
import { MotionValue } from "framer-motion";

interface HeroAnimationProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroAnimation({ scrollYProgress }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Detect mobile to switch to auto-play mode
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const imagesLoaded = useCanvasFrames(
    canvasRef,
    240, // Total frames in your sequence
    "/Landing/Hero/sequence", // Path to folder
    isMobile,
    scrollYProgress
  );

  return (
    <div className="relative h-[40vh] w-full max-w-[500px] md:h-[600px] md:w-[600px]">
      
      {/* Loading Spinner */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-coffee-700" />
        </div>
      )}

      {/* Canvas Styles Explanation:
         mix-blend-multiply: Makes the white background of JPGs transparent against the white page.
         mask-image: Softens the hard square edges of the canvas container.
      */}
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="h-full w-full object-contain"
        style={{
          mixBlendMode: "multiply",
          maskImage: "radial-gradient(closest-side, black 80%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, black 80%, transparent 100%)",
        }}
      />
    </div>
  );
}