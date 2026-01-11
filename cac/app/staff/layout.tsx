"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Coffee, LogOut, Receipt, Calculator, Store, User, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    const { mongoUser, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!mongoUser || (mongoUser.role !== "staff" && mongoUser.role !== "admin")) {
                if (mongoUser?.role !== "admin") router.push("/login"); // Access denied logic
            } else if (mongoUser.status !== "approved") {
                router.push("/waiting-approval");
            }
        }
    }, [mongoUser, loading, router]);

    if (loading || !mongoUser) return (
        <div className="flex h-screen items-center justify-center bg-stone-50 text-amber-900 font-medium">
            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-amber-900/30 border-t-amber-900 rounded-full animate-spin" />
                <p>Loading POS...</p>
            </div>
        </div>
    );

    const navItems = [
        { href: "/staff", label: "New Sale", icon: Calculator },
        { href: "/staff/sales", label: "History", icon: Receipt },
    ];

    return (
        <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-amber-100">
            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-stone-200 hidden md:flex flex-col z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                <div className="p-6 flex items-center gap-3 border-b border-stone-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
                        <Coffee className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight tracking-tight text-stone-800">Cafe POS</h1>
                        <p className="text-[10px] text-stone-500 font-medium tracking-wider uppercase">Staff Portal</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <p className="px-4 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Menu</p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                                    isActive
                                        ? "bg-amber-50 text-amber-900 font-bold"
                                        : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                                )}
                            >
                                <item.icon size={18} className={cn("transition-colors", isActive ? "text-amber-700" : "text-stone-400 group-hover:text-stone-600")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-stone-100 bg-stone-50/50">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 border border-amber-200">
                            <User size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-stone-800 truncate">{mongoUser.displayName || "Staff Member"}</p>
                            <p className="text-xs text-stone-500 truncate">{mongoUser.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 border-stone-200 text-stone-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 bg-white h-9 shadow-sm"
                        onClick={() => signOut(auth)}
                    >
                        <LogOut size={16} />
                        <span className="text-xs font-medium">Sign Out</span>
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-4 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
                        <Coffee className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-stone-800">Cafe POS</span>
                </div>
                <Button variant="ghost" size="icon" className="text-stone-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <MenuIcon />}
                </Button>
            </header>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-16 bg-white z-10 p-4 md:hidden flex flex-col gap-2"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-stone-100 shadow-sm",
                                    pathname === item.href ? "bg-amber-50 text-amber-900 border-amber-100" : "bg-white text-stone-600"
                                )}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-auto border-t border-stone-100 pt-4">
                            <Button
                                variant="destructive"
                                className="w-full gap-2"
                                onClick={() => signOut(auth)}
                            >
                                <LogOut size={16} />
                                Sign Out
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="md:pl-64 pt-16 md:pt-0 min-h-screen transition-all duration-300 bg-[#fafaf9]">
                <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
