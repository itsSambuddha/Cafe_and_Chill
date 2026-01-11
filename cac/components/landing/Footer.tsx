"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, MapPin, Phone, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    // Hide Footer on Staff pages
    if (pathname?.startsWith('/staff')) return null;

    return (
        <footer className="relative bg-gradient-to-br from-coffee-950 via-[#3c1e0a] to-[#1a0b02] text-coffee-100 overflow-hidden">
            <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 relative z-10">

                {/* Top Section: Header & Message */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                            Stay Caffeinated.
                        </h2>
                        <p className="text-coffee-300 max-w-sm text-sm">
                            Experience the art of coffee in a space designed for you. <br /> Come visit us and taste the difference.
                        </p>
                    </div>

                    {/* Socials - Replaces Newsletter Input */}
                    <div className="flex gap-4">
                        <SocialIcon icon={Instagram} href="#" />
                        <SocialIcon icon={Twitter} href="#" />
                        <SocialIcon icon={Facebook} href="#" />
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/10 mb-10" />

                {/* Main Content Row */}
                <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 text-sm">

                    {/* Brand */}
                    <div className="max-w-xs space-y-4">
                        <Link href="/" className="inline-block">
                            <div className="relative h-36 w-36 overflow-hidden rounded-full mb-2">
                                <Image
                                    src="/assets/logo1.png"
                                    alt="Coffee & Chill Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Coffee &amp; Chill</span>
                        </Link>
                        <p className="text-coffee-300/80 text-xs leading-relaxed">
                            Crafted with care, served with love. Experience the finest coffee and vibrant atmosphere in the heart of Shillong.
                        </p>
                    </div>

                    {/* Columns Wrapper */}
                    <div className="flex flex-1 flex-col sm:flex-row gap-10 md:gap-20">
                        {/* Company */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Company</h3>
                            <ul className="space-y-2.5">
                                <FooterLink href="/about">Our Story</FooterLink>
                                <FooterLink href="/staff">Staff Portal</FooterLink>
                                <FooterLink href="/contact">Contact</FooterLink>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Quick Links</h3>
                            <ul className="space-y-2.5">
                                <FooterLink href="/menu">Menu</FooterLink>
                                <FooterLink href="/#visit">Visit Us</FooterLink>
                                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                                <FooterLink href="/terms">Terms of Service</FooterLink>
                            </ul>
                        </div>

                        {/* Visit Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Visit Us</h3>
                            <ul className="space-y-3 text-coffee-300">
                                <li className="flex items-start gap-2.5">
                                    <MapPin className="h-4 w-4 text-coffee-400 shrink-0 mt-0.5" />
                                    <a href="https://www.google.com/maps/place/Police+Bazar,+Shillong,+Meghalaya+793001" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        Police Bazar, Shillong<br />Meghalaya 793001
                                    </a>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Clock className="h-4 w-4 text-coffee-400 shrink-0" />
                                    <span>Daily: 7am - 9:30pm</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Phone className="h-4 w-4 text-coffee-400 shrink-0" />
                                    <a href="tel:+916002861294" className="hover:text-white transition-colors">
                                        +91 60028 61294
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright */}
                <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-coffee-400/60">
                    <p>&copy; {currentYear} Coffee &amp; Chill. All rights reserved.</p>
                    <p>Designed & Developed by Sam. All Dev rights reserved</p>
                </div>
            </div>

            {/* Texture/Noise */}
            <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,#000000_100%)] opacity-20 pointer-events-none"></div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-coffee-300/80 hover:text-white transition-colors block w-fit"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialIcon({ icon: Icon, href }: { icon: any; href: string }) {
    return (
        <Link
            href={href}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-coffee-300 transition-all hover:bg-white hover:text-coffee-950 hover:scale-110"
        >
            <Icon className="h-5 w-5" />
        </Link>
    );
}
