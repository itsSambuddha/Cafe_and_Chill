// components/landing/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

export function Navbar() {
    const [open, setOpen] = useState(false);

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

                {/* center: links (desktop) */}
                <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
                    <Link href="/" className="transition-colors hover:text-black">
                        Home
                    </Link>
                    <Link href="/menu" className="transition-colors hover:text-black">
                        Menu
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-black">
                        About
                    </Link>
                    <Link href="/#visit" className="transition-colors hover:text-black">
                        Visit
                    </Link>
                </nav>

                {/* right: actions */}
                <div className="flex items-center gap-2">
                    {/* login (desktop) */}
                    <button className="hidden rounded-full border border-black/80 px-4 py-1.5 text-xs font-medium text-black transition hover:bg-black hover:text-white md:inline-flex">
                        Login
                    </button>

                    {/* cart */}
                    {/* <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-900">
            <ShoppingBag className="h-4 w-4" />
          </button> */}

                    {/* mobile menu toggle */}
                    <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-gray-100 md:hidden"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Toggle navigation"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* mobile sidebar menu */}
            {/* backdrop (kept subtle, not fully opaque) */}
            <div
                className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* sliding translucent panel */}
            <aside
                className={`fixed right-0 top-0 z-50 flex h-full w-64 flex-col border-l border-black/5 bg-white/60 backdrop-blur-xl px-4 py-4 text-sm font-medium text-gray-700 shadow-xl transition-transform duration-200 md:hidden ${open ? "translate-x-0" : "translate-x-full"
                    }`}
                aria-hidden={!open}
            >
                <div className="mb-4 flex items-center justify-between">
                    <span className="text-base font-semibold text-black">
                        Menu
                    </span>
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/70 hover:bg-white"
                        onClick={() => setOpen(false)}
                        aria-label="Close navigation"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <nav className="flex flex-col gap-1">
                    <Link
                        href="/"
                        className="rounded-lg px-2 py-2 hover:bg-white/70"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/menu"
                        className="rounded-lg px-2 py-2 hover:bg-white/70"
                        onClick={() => setOpen(false)}
                    >
                        Menu
                    </Link>
                    <Link
                        href="/about"
                        className="rounded-lg px-2 py-2 hover:bg-white/70"
                        onClick={() => setOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/#visit"
                        className="rounded-lg px-2 py-2 hover:bg-white/70"
                        onClick={() => setOpen(false)}
                    >
                        Visit
                    </Link>
                </nav>

                <button
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-black px-4 py-2 text-xs font-medium text-black transition hover:bg-black hover:text-white"
                    onClick={() => setOpen(false)}
                >
                    Login
                </button>
            </aside>
        </header>
    );
}
