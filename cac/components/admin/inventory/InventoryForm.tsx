"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// Intentionally matching the API interface
interface InventoryData {
    _id?: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    reorderThreshold: number;
    notes?: string;
    isActive: boolean;
}

interface InventoryFormProps {
    initialData?: InventoryData | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const UNITS = ["kg", "g", "l", "ml", "pcs", "boxes", "cans", "bottles"];
const CATEGORIES = ["Ingredients", "Beverages", "Packaging", "Cleaning", "General"];

export function InventoryForm({ initialData, isOpen, onClose, onSuccess }: InventoryFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<InventoryData>({
        name: "",
        category: "General",
        quantity: 0,
        unit: "units",
        reorderThreshold: 5,
        notes: "",
        isActive: true
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                category: "General",
                quantity: 0,
                unit: "pcs",
                reorderThreshold: 5,
                notes: "",
                isActive: true
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "number") {
            setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData?._id
                ? `/api/admin/inventory/${initialData._id}`
                : `/api/admin/inventory`;

            const method = initialData?._id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save");

            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error saving item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white shadow-2xl border-stone-200">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Inventory Item" : "Add Inventory Item"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Item Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={formData.category} onValueChange={(val) => handleSelectChange("category", val)}>
                                <SelectTrigger className="bg-stone-50 border-stone-200 focus:bg-white transition-all">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Select value={formData.unit} onValueChange={(val) => handleSelectChange("unit", val)}>
                                <SelectTrigger className="bg-stone-50 border-stone-200 focus:bg-white transition-all">
                                    <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {UNITS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reorderThreshold">Reorder Point</Label>
                            <Input
                                id="reorderThreshold"
                                name="reorderThreshold"
                                type="number"
                                value={formData.reorderThreshold}
                                onChange={handleChange}
                                className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex items-center justify-between py-2 border-t border-stone-100">
                        <Label htmlFor="isActive" className="cursor-pointer">Active Status</Label>
                        <Switch
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} className="hover:bg-stone-100">Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white shadow-md">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? "Update Item" : "Create Item"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
