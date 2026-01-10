"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Coffee,
    Store,
    IndianRupee,
    LogOut,
    ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "framer-motion";

interface AdminSidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    userEmail?: string | null;
}

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/staff", label: "Staff & Users", icon: Users },
    { href: "/admin/menu", label: "Menu Management", icon: Coffee },
    { href: "/admin/inventory", label: "Inventory", icon: Store },
    { href: "/admin/finance", label: "Finance", icon: IndianRupee },
];

export function AdminSidebar({
    isCollapsed,       // Leaving these in signature to avoid breaking parent layout types
    toggleCollapse,    // though we might rely on internal state now
    mobileOpen,
    setMobileOpen,
    userEmail,
}: AdminSidebarProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <div className="fixed inset-y-0 left-0 z-50 h-full">
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-r border-stone-200/50 shadow-sm">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {navItems.map((item, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={{
                                        label: item.label,
                                        href: item.href,
                                        icon: <item.icon className="h-5 w-5 flex-shrink-0" />
                                    }}
                                    className={cn(
                                        "hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors rounded-lg",
                                        pathname === item.href && "bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-100"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col gap-2">
                            {userEmail && (
                                <SidebarLink
                                    link={{
                                        label: userEmail,
                                        href: "#",
                                        icon: (
                                            <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xs ring-2 ring-white">
                                                {userEmail[0].toUpperCase()}
                                            </div>
                                        ),
                                    }}
                                />
                            )}
                            <button onClick={handleSignOut} className="w-full text-left">
                                <SidebarLink
                                    link={{
                                        label: "Sign Out",
                                        href: "#",
                                        icon: <LogOut className="h-5 w-5 flex-shrink-0 text-red-500" />,
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            href="/admin"
            className="font-normal flex space-x-2 items-center text-sm text-stone-900 py-1 relative z-20"
        >
            <div className="h-6 w-6 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0">
                <Coffee size={14} className="text-white" />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-lg text-amber-950 whitespace-pre"
            >
                Cafe Admin
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="/admin"
            className="font-normal flex space-x-2 items-center text-sm text-stone-900 py-1 relative z-20"
        >
            <div className="h-6 w-6 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0">
                <Coffee size={14} className="text-white" />
            </div>
        </Link>
    );
};
