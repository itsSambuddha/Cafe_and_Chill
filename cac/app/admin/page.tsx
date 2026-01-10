"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/admin/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Coffee,
    DollarSign,
    ShoppingCart,
    Users,
    AlertTriangle,
    TrendingUp,
    TrendingDown
} from "lucide-react";

interface DashboardMetrics {
    menuCount: number;
    inventoryLowCount: number;
    pendingStaffCount: number;
    totalExpenses: number;
    totalSales: number;
    netProfit: number;
}

export default function AdminDashboardPage() {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const res = await fetch("/api/admin/metrics");
                if (res.ok) {
                    setMetrics(await res.json());
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchMetrics();
    }, []);

    const cards = [
        {
            title: "Total Sales",
            value: metrics ? `₹${metrics.totalSales.toLocaleString()}` : "...",
            icon: DollarSign,
            desc: "Lifetime revenue",
            color: "text-green-600",
        },
        {
            title: "Total Expenses",
            value: metrics ? `₹${metrics.totalExpenses.toLocaleString()}` : "...",
            icon: TrendingDown,
            desc: "Lifetime expenses",
            color: "text-red-600",
        },
        {
            title: "Net Profit",
            value: metrics ? `₹${metrics.netProfit.toLocaleString()}` : "...",
            icon: TrendingUp,
            desc: "Sales - Expenses",
            color: metrics && metrics.netProfit >= 0 ? "text-green-600" : "text-red-600",
        },
        {
            title: "Menu Items",
            value: metrics ? metrics.menuCount : "...",
            icon: Coffee,
            desc: "Active dishes & drinks",
            color: "text-amber-600",
        },
        {
            title: "Low Stock Items",
            value: metrics ? metrics.inventoryLowCount : "...",
            icon: AlertTriangle,
            desc: "Items below reorder level",
            color: metrics && metrics.inventoryLowCount > 0 ? "text-amber-600 font-bold" : "text-stone-500",
        },
        {
            title: "Pending Users",
            value: metrics ? metrics.pendingStaffCount : "...",
            icon: Users,
            desc: "Awaiting approval",
            color: metrics && metrics.pendingStaffCount > 0 ? "text-blue-600 font-bold" : "text-stone-500",
        },
    ];

    return (
        <PageShell
            title="Dashboard"
            description="Welcome back. Here's what's happening at Cafe & Chill today."
        >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, i) => (
                    <Card key={i} className="border-stone-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-stone-500">
                                {card.title}
                            </CardTitle>
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-stone-900">{card.value}</div>
                            <p className="text-xs text-stone-500 mt-1">
                                {card.desc}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PageShell>
    );
}
