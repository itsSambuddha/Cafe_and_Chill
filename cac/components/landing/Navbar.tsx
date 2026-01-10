// components/landing/Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* left: logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-lg font-semibold tracking-tight text-black md:text-xl">
            Coffee &amp; Chill
          </span>
          <span className="h-2 w-2 rounded-full bg-[hsl(25,40%,35%)]" />
        </Link>

        {/* center: links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link href="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <Link href="/menu" className="transition-colors hover:text-black">
            Menu
          </Link>
          <Link href="/#about" className="transition-colors hover:text-black">
            About
          </Link>
          <Link href="/#visit" className="transition-colors hover:text-black">
            Visit
          </Link>
        </nav>

        {/* right: actions */}
        <div className="flex items-center gap-2">
          <button className="hidden rounded-full border border-black/80 px-4 py-1.5 text-xs font-medium text-black transition hover:bg-black hover:text-white md:inline-flex">
            Reserve a table
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-900">
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
