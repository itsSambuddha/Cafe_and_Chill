"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { Loader2, Calendar, TrendingUp, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

interface Sale {
    _id: string;
    totalAmount: number;
    paymentMethod: string;
    notes?: string;
    createdAt: string;
}

export default function SalesHistoryPage() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSales() {
            try {
                const res = await fetch("/api/admin/sales");
                if (res.ok) {
                    const data = await res.json();
                    setSales(data);
                }
            } catch (error) {
                console.error("Failed to fetch sales", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSales();
    }, []);

    const totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-amber-800" /></div>;
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-amber-700" />
                    Sales History
                </h2>
                <div className="flex gap-3">
                    <Card className="bg-amber-50 border-amber-100 shadow-sm">
                        <CardContent className="p-3 flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-full text-amber-800">
                                <IndianRupee size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">Total Revenue</p>
                                <p className="text-lg font-bold text-amber-900">₹{totalSales.toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-stone-50 border-stone-100 shadow-sm">
                        <CardContent className="p-3 flex items-center gap-3">
                            <div className="p-2 bg-stone-200 rounded-full text-stone-700">
                                <TrendingUp size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Count</p>
                                <p className="text-lg font-bold text-stone-800">{sales.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="border-stone-100 shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-4">
                    <CardTitle className="text-sm font-medium text-stone-500 uppercase tracking-widest">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {sales.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-stone-400">
                            <Calendar size={48} className="mb-4 opacity-20" />
                            <p>No sales recorded yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-stone-400 font-bold uppercase bg-stone-50/50">
                                    <tr>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Method</th>
                                        <th className="px-6 py-4">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {sales.map((sale, i) => (
                                        <motion.tr
                                            key={sale._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white hover:bg-amber-50/30 transition-colors group"
                                        >
                                            <td className="px-6 py-4 font-mono text-xs text-stone-500 group-hover:text-stone-800 transition-colors">
                                                {new Date(sale.createdAt).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-stone-800 text-base">
                                                ₹{sale.totalAmount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <BadgePill
                                                    text={sale.paymentMethod}
                                                    className={
                                                        sale.paymentMethod === 'Cash' ? "bg-green-100 text-green-700 hover:bg-green-200" :
                                                            sale.paymentMethod === 'Card' ? "bg-purple-100 text-purple-700 hover:bg-purple-200" :
                                                                "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                    }
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-stone-500 text-xs italic max-w-[200px] truncate">
                                                {sale.notes || <span className="text-stone-300">-</span>}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
