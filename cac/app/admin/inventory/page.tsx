"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/admin/PageShell";
import { Button } from "@/components/ui/button";
import { Download, Database, Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InventoryForm } from "@/components/admin/inventory/InventoryForm";

interface InventoryItem {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    reorderThreshold: number;
    notes?: string;
    isActive: boolean;
    updatedAt: string;
}

export default function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/inventory");
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleCreate = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: InventoryItem) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const res = await fetch(`/api/admin/inventory/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchItems();
            } else {
                alert("Failed to delete item");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting item");
        }
    };

    const handleSeed = async () => {
        if (!confirm("This will seed sample inventory data. Continue?")) return;
        try {
            const res = await fetch("/api/admin/inventory/seed", { method: "POST" });
            if (res.ok) fetchItems();
        } catch (e) {
            console.error(e);
        }
    };

    const handleExport = () => {
        window.location.href = "/api/admin/export/inventory";
    };

    const onFormSuccess = () => {
        fetchItems();
        setIsFormOpen(false);
    };

    return (
        <PageShell
            title="Inventory Management"
            description="Track stock levels and reorder points."
            action={
                <Button onClick={handleCreate} className="bg-amber-800 hover:bg-amber-900 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
            }
        >
            <div className="mb-6 flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-200">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone-600">Actions:</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSeed} title="Seed Sample Data">
                        <Database className="mr-2 h-4 w-4" /> Seed Sample
                    </Button>
                </div>
            </div>

            <div className="rounded-md border border-stone-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                        <tr>
                            <th className="px-4 py-3">Item Name</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Stock Level</th>
                            <th className="px-4 py-3">Reorder Point</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {loading ? (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-500">Loading inventory...</td></tr>
                        ) : items.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-500">No inventory items found. Add items or seed sample data.</td></tr>
                        ) : (
                            items.map((item) => {
                                const isLow = item.quantity <= item.reorderThreshold;
                                return (
                                    <tr key={item._id} className={isLow ? "bg-red-50/30" : "hover:bg-stone-50/50"}>
                                        <td className="px-4 py-3 font-medium text-stone-900">
                                            {item.name}
                                            {item.notes && <span className="block text-xs text-stone-400 font-normal truncate max-w-[150px]">{item.notes}</span>}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline" className="text-xs bg-stone-100 font-normal">{item.category}</Badge>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-stone-800">
                                            {item.quantity} <span className="font-normal text-stone-500 text-xs">{item.unit}</span>
                                        </td>
                                        <td className="px-4 py-3 text-stone-500">{item.reorderThreshold} {item.unit}</td>
                                        <td className="px-4 py-3">
                                            {isLow ? (
                                                <div className="flex items-center text-red-700 font-medium text-xs">
                                                    <AlertCircle className="mr-1 h-3 w-3" /> Low Stock
                                                </div>
                                            ) : (
                                                <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200 font-normal">In Stock</Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-700 hover:bg-stone-100" onClick={() => handleEdit(item)}>
                                                    <Pencil size={14} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item._id)}>
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <InventoryForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={onFormSuccess}
                initialData={editingItem}
            />
        </PageShell>
    );
}
