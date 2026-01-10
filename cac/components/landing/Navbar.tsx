// components/landing/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled
                    ? "border-b border-coffee-200/50 bg-white/80 backdrop-blur-md py-3"
                    : "border-transparent bg-transparent py-5"
            )}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
                {/* left: logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="h-2.5 w-2.5 rounded-full bg-coffee-600 transition-transform group-hover:scale-110" />
                    <span className="text-lg font-semibold tracking-tight text-coffee-900 md:text-xl">
                        Cafe &amp; Chill
                    </span>
                </Link>

                {/* center: links (desktop) */}
                <nav className="hidden items-center gap-8 text-sm font-medium text-coffee-800/80 md:flex">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/menu">Menu</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/#visit">Visit</NavLink>
                </nav>

                {/* right: actions */}
                <div className="flex items-center gap-3">
                    {/* login (desktop) */}
                    <button className="hidden rounded-full border border-coffee-900/10 bg-white/50 px-5 py-2 text-xs font-semibold text-coffee-900 transition hover:bg-coffee-900 hover:text-white md:inline-flex">
                        Login
                    </button>

                    {/* mobile menu toggle */}
                    <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-coffee-900/10 bg-white/80 text-coffee-900 transition hover:bg-coffee-50 md:hidden"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Toggle navigation"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* mobile sidebar menu */}
            {/* backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-coffee-900/20 backdrop-blur-sm transition-opacity md:hidden",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setOpen(false)}
            />

            {/* sliding panel */}
            <aside
                className={cn(
                    "fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col border-l border-coffee-200 bg-white/95 backdrop-blur-xl px-6 py-6 shadow-2xl transition-transform duration-300 md:hidden",
                    open ? "translate-x-0" : "translate-x-full"
                )}
                aria-hidden={!open}
            >
                <div className="mb-8 flex items-center justify-between">
                    <span className="text-lg font-semibold tracking-tight text-coffee-900">
                        Menu
                    </span>
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-coffee-100 text-coffee-900 hover:bg-coffee-200"
                        onClick={() => setOpen(false)}
                        aria-label="Close navigation"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <nav className="flex flex-col gap-2">
                    <MobileNavLink href="/" onClick={() => setOpen(false)}>
                        Home
                    </MobileNavLink>
                    <MobileNavLink href="/menu" onClick={() => setOpen(false)}>
                        Menu
                    </MobileNavLink>
                    <MobileNavLink href="/about" onClick={() => setOpen(false)}>
                        About
                    </MobileNavLink>
                    <MobileNavLink href="/#visit" onClick={() => setOpen(false)}>
                        Visit
                    </MobileNavLink>
                </nav>

                <div className="mt-auto">
                    <button
                        className="w-full rounded-full bg-coffee-900 py-3 text-sm font-medium text-white transition hover:bg-coffee-800"
                        onClick={() => setOpen(false)}
                    >
                        Login
                    </button>
                </div>
            </aside>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative text-coffee-800/80 transition-colors hover:text-coffee-900 text-sm font-medium"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({
    href,
    onClick,
    children,
}: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="block rounded-xl px-4 py-3 text-base font-medium text-coffee-800 transition hover:bg-coffee-50"
            onClick={onClick}
        >
            {children}
        </Link>
    );
}
