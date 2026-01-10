"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Coffee, LogOut, Receipt, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-client";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    const { mongoUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!mongoUser || (mongoUser.role !== "staff" && mongoUser.role !== "admin")) {
                // Admins can also access staff view if they want? Or strictly staff.
                // Usually admins can see everything.
                if (mongoUser?.role !== "admin") router.push("/login"); // Access denied logic
            } else if (mongoUser.status !== "approved") {
                router.push("/waiting-approval");
            }
        }
    }, [mongoUser, loading, router]);

    if (loading || !mongoUser) return <div className="flex h-screen items-center justify-center text-amber-900">Loading Staff Board...</div>;

    return (

        <div className="min-h-screen bg-stone-50 flex flex-col">
            <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-800 rounded-lg flex items-center justify-center">
                        <Coffee className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-amber-900">POS</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-stone-600 hidden sm:inline-block">{mongoUser.displayName || mongoUser.email}</span>
                    <Button size="sm" variant="ghost" className="text-stone-500 hover:text-red-600" onClick={() => signOut(auth)}>
                        <LogOut size={18} />
                    </Button>
                </div>
            </header>

            {/* Desktop Navigation Tabs */}
            <div className="hidden md:flex bg-white border-b border-stone-200 px-4 gap-6 sticky top-14 z-10">
                <Link
                    href="/staff"
                    className="py-3 text-sm font-medium text-amber-900 border-b-2 border-amber-800"
                >
                    New Sale
                </Link>
                <Link
                    href="/staff/sales"
                    className="py-3 text-sm font-medium text-stone-600 hover:text-amber-900 hover:border-b-2 hover:border-amber-200 transition-all border-b-2 border-transparent"
                >
                    History
                </Link>
            </div>

            <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
                {children}
            </main>
            <nav className="bg-white border-t border-stone-200 md:hidden flex justify-around p-2 sticky bottom-0 z-20">
                <Link href="/staff" className="flex flex-col items-center p-2 text-stone-600 hover:text-amber-900">
                    <PenTool size={20} />
                    <span className="text-xs mt-1">Edit</span>
                </Link>
                <Link href="/staff/sales" className="flex flex-col items-center p-2 text-stone-600 hover:text-amber-900">
                    <Receipt size={20} />
                    <span className="text-xs mt-1">History</span>
                </Link>
            </nav>
        </div>

    );
}
