// components/menu/MenuHeroShell.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface MenuHeroShellProps {
  children: ReactNode;
}

export function MenuHeroShell({ children }: MenuHeroShellProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotX = useSpring(useTransform(y, [-180, 180], [12, -12]), {
    stiffness: 120,
    damping: 16,
  });
  const rotY = useSpring(useTransform(x, [-280, 280], [-18, 18]), {
    stiffness: 120,
    damping: 16,
  });

  const glowX = useTransform(x, [-280, 280], ["20%", "80%"]);
  const glowY = useTransform(y, [-180, 180], ["20%", "80%"]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx);
    y.set(dy);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      className="relative flex w-full justify-center"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* moving spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <motion.div
          className="absolute h-72 w-72 rounded-full bg-white/40 blur-3xl"
          style={{ left: glowX, top: glowY }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </motion.div>

      {/* table shadow */}
      <div className="pointer-events-none absolute bottom-[-40px] left-1/2 h-40 w-[520px] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.45),transparent_70%)] blur-xl" />

      {/* 3D shell */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY }}
        className="relative origin-center rounded-[34px] border border-white/25 bg-white/10 p-[2px] shadow-[0_40px_120px_rgba(15,23,42,0.65)] backdrop-blur-2xl"
      >
        <div className="relative rounded-[32px] bg-gradient-to-br from-white/88 via-white/82 to-white/78">
          {/* subtle gradient border */}
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(148,81,31,0.28),transparent_40%,rgba(94,73,192,0.26))] opacity-70 mix-blend-soft-light" />
          {/* inner rim */}
          <div className="pointer-events-none absolute inset-[1px] rounded-[31px] border border-white/50" />
          {/* corner chips */}
          <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-full border border-black/5 bg-white/70" />
          <div className="pointer-events-none absolute right-4 bottom-4 h-6 w-6 rounded-full border border-black/5 bg-white/70" />

          <div className="relative rounded-[30px] p-4 sm:p-6">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
