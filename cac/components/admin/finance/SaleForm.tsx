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
import { useAuth } from "@/components/providers/AuthProvider";

interface SaleData {
    _id?: string;
    totalAmount: number;
    paymentMethod: string;
    paymentSource: string;
    notes: string;
    staffUserId?: string;
}

interface SaleFormProps {
    initialData?: SaleData | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const PAY_METHODS = ["Cash", "Card", "UPI - GPay", "Other"];
const SOURCES = ["manual_upload", "gateway"];

export function SaleForm({ initialData, isOpen, onClose, onSuccess }: SaleFormProps) {
    const { mongoUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<SaleData>({
        totalAmount: 0,
        paymentMethod: "Cash",
        paymentSource: "manual_upload",
        notes: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                totalAmount: 0,
                paymentMethod: "Cash",
                paymentSource: "manual_upload",
                notes: "",
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "totalAmount" ? parseFloat(value) : value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData?._id
                ? `/api/admin/sales/${initialData._id}`
                : `/api/admin/sales`;

            const method = initialData?._id ? "PUT" : "POST";

            // Attach current staff ID if creating new sale
            const payload = {
                ...formData,
                staffUserId: initialData?.staffUserId || mongoUser?.firebaseUid || "unknown_staff"
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save");

            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error saving sale");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white shadow-2xl border-stone-200">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Sale Record" : "Add Sale Record"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="totalAmount">Total Amount</Label>
                        <Input
                            id="totalAmount"
                            name="totalAmount"
                            type="number"
                            value={formData.totalAmount}
                            onChange={handleChange}
                            required
                            className="bg-stone-50 border-stone-200 focus:bg-white text-lg font-semibold transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="paymentMethod">From Customer Via</Label>
                            <Select value={formData.paymentMethod} onValueChange={(val) => handleSelectChange("paymentMethod", val)}>
                                <SelectTrigger className="bg-stone-50 border-stone-200 focus:bg-white transition-all">
                                    <SelectValue placeholder="Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAY_METHODS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="paymentSource">Entry Source</Label>
                            <Select value={formData.paymentSource} onValueChange={(val) => handleSelectChange("paymentSource", val)}>
                                <SelectTrigger className="bg-stone-50 border-stone-200 focus:bg-white transition-all">
                                    <SelectValue placeholder="Source" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SOURCES.map(c => <SelectItem key={c} value={c}>{c === 'manual_upload' ? 'Manual Entry' : 'Gateway'}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes / Items Summary</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="e.g. 2 Coffee, 1 Cake"
                            className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} className="hover:bg-stone-100">Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white shadow-md">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
