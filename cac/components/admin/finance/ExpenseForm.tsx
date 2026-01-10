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

interface ExpenseData {
    _id?: string;
    title: string;
    category: string;
    amount: number;
    date: string; // YYYY-MM-DD
    paymentMethod: string;
    notes: string;
}

interface ExpenseFormProps {
    initialData?: ExpenseData | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES = ["General", "Inventory", "Maintenance", "Salaries", "Utilities", "Marketing", "Other"];
const PAY_METHODS = ["Cash", "Card", "UPI", "Bank Transfer", "Other"];

export function ExpenseForm({ initialData, isOpen, onClose, onSuccess }: ExpenseFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ExpenseData>({
        title: "",
        category: "General",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "Cash",
        notes: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]
            });
        } else {
            setFormData({
                title: "",
                category: "General",
                amount: 0,
                date: new Date().toISOString().split("T")[0],
                paymentMethod: "Cash",
                notes: "",
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "amount" ? parseFloat(value) : value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData?._id
                ? `/api/admin/expenses/${initialData._id}`
                : `/api/admin/expenses`;

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
            alert("Error saving expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] border-stone-200 bg-white/95 backdrop-blur-md shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-amber-950">
                        {initialData ? "Edit Expense" : "Add New Expense"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-stone-600 font-medium">Description</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Weekly Coffee Bean Supply"
                            className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-stone-600 font-medium">Amount (₹)</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-stone-600 font-medium">Date</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20 dark:[color-scheme:light]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-stone-600 font-medium">Category</Label>
                            <Select value={formData.category} onValueChange={(val) => handleSelectChange("category", val)}>
                                <SelectTrigger className="bg-stone-50 border-stone-200">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="paymentMethod" className="text-stone-600 font-medium">Payment Method</Label>
                            <Select value={formData.paymentMethod} onValueChange={(val) => handleSelectChange("paymentMethod", val)}>
                                <SelectTrigger className="bg-stone-50 border-stone-200">
                                    <SelectValue placeholder="Select Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAY_METHODS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-stone-600 font-medium">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="bg-stone-50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20 min-h-[80px]"
                            placeholder="Additional details..."
                        />
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="text-stone-500 hover:text-stone-700 hover:bg-stone-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white shadow-md transition-all"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? "Update Expense" : "Save Record"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
