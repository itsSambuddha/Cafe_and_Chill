"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/admin/PageShell";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Download,
    Database,
    Search,
    Edit2,
    Trash2,
    MoreHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { MenuForm } from "@/components/admin/menu/MenuForm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    isAvailable: boolean;
    featured: boolean;
    bestSeller: boolean;
    image?: string;
    // ... other props
    isVegetarian: boolean;
    isSpicy: boolean;
    isChefSpecial: boolean;
    createdAt?: string;
}

export default function MenuPage() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/menu");
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch menu items", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSeed = async () => {
        if (!confirm("This will merge default data into the database. Continue?")) return;
        try {
            const res = await fetch("/api/admin/menu/seed", { method: "POST" });
            const result = await res.json();
            if (result.success) {
                alert(result.message);
                fetchItems();
            } else {
                alert("Seed failed: " + result.error);
            }
        } catch (e: any) {
            alert("Error: " + e.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchItems();
            } else {
                alert("Failed to delete");
            }
        } catch (e: any) {
            alert("Error: " + e.message);
        }
    };

    // CSV Export
    const handleExport = () => {
        window.location.href = "/api/admin/export/menu";
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageShell
            title="Menu Management"
            description="Manage your cafe's menu items, prices, and categories."
            action={
                <Button onClick={() => { setEditingItem(null); setIsFormOpen(true); }} className="bg-amber-800 hover:bg-amber-900 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
            }
        >
            {/* Filters & Actions Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                    <Input
                        placeholder="Search menu..."
                        className="pl-9 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" /> CSV
                    </Button>
                    <Button variant="outline" onClick={handleSeed} title="Seed Default Data">
                        <Database className="mr-2 h-4 w-4" /> Seed
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border border-stone-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {loading ? (
                                <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-500">Loading menu...</td></tr>
                            ) : filteredItems.length === 0 ? (
                                <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-500">No items found.</td></tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-stone-50/50">
                                        <td className="px-4 py-3 font-medium text-stone-900">
                                            <div className="flex flex-col">
                                                <span>{item.name}</span>
                                                <span className="text-xs text-stone-400 truncate max-w-[200px]">{item.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline" className="text-xs capitalize bg-stone-100">{item.category}</Badge>
                                        </td>
                                        <td className="px-4 py-3 font-medium">₹{item.price}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-1.5 flex-wrap">
                                                {item.isAvailable ? (
                                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 text-[10px] px-1.5 py-0">Avail</Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Unavail</Badge>
                                                )}
                                                {item.featured && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 text-[10px] px-1.5 py-0">Feat</Badge>}
                                                {item.bestSeller && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 text-[10px] px-1.5 py-0">Best</Badge>}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => { setEditingItem(item); setIsFormOpen(true); }}>
                                                        <Edit2 className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600 focus:text-red-700">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <MenuForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={fetchItems}
                initialData={editingItem}
            />
        </PageShell>
    );
}
