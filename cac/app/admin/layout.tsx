"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Coffee, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { mongoUser, loading } = useAuth();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!mongoUser || mongoUser.role !== "admin") {
                router.push("/login"); // Or access-denied
            } else if (mongoUser.status !== "approved") {
                router.push("/waiting-approval");
            }
        }
    }, [mongoUser, loading, router]);

    // Persist sidebar state if desired, but local state is fine for now
    useEffect(() => {
        const saved = localStorage.getItem("admin-sidebar-collapsed");
        if (saved) {
            setIsCollapsed(saved === "true");
        }
    }, []);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("admin-sidebar-collapsed", String(newState));
    };

    if (loading || !mongoUser || mongoUser.role !== "admin") {
        return <div className="flex h-screen items-center justify-center text-amber-900 bg-stone-50">Loading Admin...</div>;
    }

    return (
        <div className="flex min-h-screen bg-stone-50">
            <AdminSidebar
                isCollapsed={isCollapsed}
                toggleCollapse={toggleCollapse}
                mobileOpen={mobileMenuOpen}
                setMobileOpen={setMobileMenuOpen}
                userEmail={mongoUser.email}
            />

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 min-h-screen transition-all duration-300",
                    isCollapsed ? "md:ml-16" : "md:ml-64"
                )}
            >
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-stone-200 md:hidden flex items-center px-4 justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-800 rounded-full flex items-center justify-center">
                            <Coffee className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-amber-900">Cafe Admin</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </header>

                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
