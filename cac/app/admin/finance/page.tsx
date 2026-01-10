"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/admin/PageShell";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Download,
    TrendingUp,
    TrendingDown,
    Edit2,
    Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseForm } from "@/components/admin/finance/ExpenseForm";
import { SaleForm } from "@/components/admin/finance/SaleForm";
import { Badge } from "@/components/ui/badge";

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState("expenses");

    // Data state
    const [expenses, setExpenses] = useState<any[]>([]);
    const [sales, setSales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [expenseFormOpen, setExpenseFormOpen] = useState(false);
    const [saleFormOpen, setSaleFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [expRes, salesRes] = await Promise.all([
                fetch("/api/admin/expenses"),
                fetch("/api/admin/sales")
            ]);
            if (expRes.ok) setExpenses(await expRes.json());
            if (salesRes.ok) setSales(await salesRes.json());
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (url: string) => {
        if (!confirm("Are you sure?")) return;
        await fetch(url, { method: "DELETE" });
        fetchData();
    };

    const handleExport = (type: 'expenses' | 'sales') => {
        window.location.href = `/api/admin/export/${type}`;
    };

    return (
        <PageShell
            title="Finance Overview"
            description="Manage expenses and view sales records."
            action={
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport(activeTab as 'expenses' | 'sales')}>
                        <Download className="mr-2 h-4 w-4" /> CSV
                    </Button>
                    <Button
                        onClick={() => {
                            setEditingItem(null);
                            activeTab === 'expenses' ? setExpenseFormOpen(true) : setSaleFormOpen(true);
                        }}
                        className="bg-amber-800 hover:bg-amber-900"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add {activeTab === 'expenses' ? 'Expense' : 'Sale'}
                    </Button>
                </div>
            }
        >
            <Tabs defaultValue="expenses" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                </TabsList>

                <TabsContent value="expenses">
                    <div className="rounded-md border border-stone-200 bg-white shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                                <tr>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {loading ? <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr> : expenses.map(item => (
                                    <tr key={item._id} className="hover:bg-stone-50/50">
                                        <td className="px-4 py-3 text-stone-500">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 font-medium">{item.title}</td>
                                        <td className="px-4 py-3"><Badge variant="outline" className="text-xs bg-stone-100">{item.category}</Badge></td>
                                        <td className="px-4 py-3 font-medium text-red-600">-₹{item.amount}</td>
                                        <td className="px-4 py-3 text-right flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingItem(item); setExpenseFormOpen(true); }}>
                                                <Edit2 className="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(`/api/admin/expenses/${item._id}`)}>
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {expenses.length === 0 && !loading && <tr><td colSpan={5} className="p-4 text-center text-stone-400">No expenses recorded.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="sales">
                    <div className="rounded-md border border-stone-200 bg-white shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                                <tr>
                                    <th className="px-4 py-3">Date/Time</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Method</th>
                                    <th className="px-4 py-3">Source</th>
                                    <th className="px-4 py-3">Notes</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {loading ? <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr> : sales.map(item => (
                                    <tr key={item._id} className="hover:bg-stone-50/50">
                                        <td className="px-4 py-3 text-stone-500">{new Date(item.createdAt).toLocaleString()}</td>
                                        <td className="px-4 py-3 font-medium text-green-600">+₹{item.totalAmount}</td>
                                        <td className="px-4 py-3">{item.paymentMethod}</td>
                                        <td className="px-4 py-3">
                                            {item.paymentSource === 'manual_upload' ? (
                                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Manual</Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Gateway</Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-stone-500 max-w-[200px] truncate">{item.notes}</td>
                                        <td className="px-4 py-3 text-right flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingItem(item); setSaleFormOpen(true); }}>
                                                <Edit2 className="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(`/api/admin/sales/${item._id}`)}>
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {sales.length === 0 && !loading && <tr><td colSpan={6} className="p-4 text-center text-stone-400">No sales recorded.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>

            <ExpenseForm
                isOpen={expenseFormOpen}
                onClose={() => setExpenseFormOpen(false)}
                initialData={editingItem}
                onSuccess={fetchData}
            />

            <SaleForm
                isOpen={saleFormOpen}
                onClose={() => setSaleFormOpen(false)}
                initialData={editingItem}
                onSuccess={fetchData}
            />
        </PageShell>
    );
}
