"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

interface MenuItemData {
    id?: string; // slug
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string; // base64 or url
    tags: string[];
    isVegetarian: boolean;
    isSpicy: boolean;
    isChefSpecial: boolean;
    featured: boolean;
    bestSeller: boolean;
    isAvailable: boolean;
}

interface MenuFormProps {
    initialData?: MenuItemData | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES = [
    "coffee-hot",
    "coffee-cold",
    "beverages",
    "food",
    "dessert",
    "special",
];

export function MenuForm({ initialData, isOpen, onClose, onSuccess }: MenuFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<MenuItemData>({
        name: "",
        description: "",
        price: 0,
        category: "coffee-hot",
        tags: [],
        isVegetarian: false,
        isSpicy: false,
        isChefSpecial: false,
        featured: false,
        bestSeller: false,
        isAvailable: true,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                tags: initialData.tags || [],
            });
            // If image is a path, it's relative to public
            if (initialData.image) {
                setImagePreview(initialData.image);
            } else {
                setImagePreview(null);
            }
        } else {
            // Reset form
            setFormData({
                name: "",
                description: "",
                price: 0,
                category: "coffee-hot",
                tags: [],
                isVegetarian: false,
                isSpicy: false,
                isChefSpecial: false,
                featured: false,
                bestSeller: false,
                isAvailable: true,
            });
            setImagePreview(null);
        }
        setSelectedFile(null);
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "number") {
            setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSwitchChange = (name: keyof MenuItemData) => (checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Split by comma
        const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
        setFormData(prev => ({ ...prev, tags }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imagePath = initialData?.image;

            // Upload image if selected
            if (selectedFile) {
                const uploadData = new FormData();
                uploadData.append("file", selectedFile);

                const uploadRes = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: uploadData,
                });

                if (!uploadRes.ok) {
                    throw new Error("Failed to upload image");
                }

                const uploadJson = await uploadRes.json();
                imagePath = uploadJson.path; // e.g. /assets/Menu/file.jpg
            }

            const payload = {
                ...formData,
                image: imagePath
            };

            const url = initialData?.id
                ? `/api/admin/menu/${initialData.id}`
                : `/api/admin/menu`;

            const method = initialData?.id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to save");
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error saving item: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-stone-200">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-stone-950 transition-all"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                                id="tags"
                                name="tags"
                                value={formData.tags.join(", ")}
                                onChange={handleTagsChange}
                                placeholder="hot, spicy, veg"
                                className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="bg-stone-50 border-stone-200 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label>Image</Label>
                        <div className="flex items-center gap-4">
                            {imagePreview ? (
                                <div className="relative h-24 w-24 rounded-md overflow-hidden border border-stone-200 shadow-sm group">
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <button
                                        type="button"
                                        onClick={() => { setImagePreview(null); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                        className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div className="h-24 w-24 rounded-md bg-stone-50 flex flex-col items-center justify-center text-stone-400 border border-stone-200 border-dashed">
                                    <Upload size={24} className="mb-1 opacity-50" />
                                    <span className="text-[10px]">No Image</span>
                                </div>
                            )}
                            <div className="flex-1 space-y-2">
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 bg-white"
                                />
                                <p className="text-xs text-stone-500">Image will be uploaded to public/assets/Menu</p>
                            </div>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-b border-stone-100 py-4 bg-stone-50/50 rounded-lg px-2">
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white transition-colors">
                            <Label htmlFor="available" className="cursor-pointer">Available</Label>
                            <Switch id="available" checked={formData.isAvailable} onCheckedChange={handleSwitchChange("isAvailable")} />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white transition-colors">
                            <Label htmlFor="featured" className="cursor-pointer font-medium text-amber-800">Featured</Label>
                            <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange("featured")} className="data-[state=checked]:bg-amber-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white transition-colors">
                            <Label htmlFor="bestSeller" className="cursor-pointer">Best Seller</Label>
                            <Switch id="bestSeller" checked={formData.bestSeller} onCheckedChange={handleSwitchChange("bestSeller")} />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white transition-colors">
                            <Label htmlFor="veg" className="cursor-pointer">Vegetarian</Label>
                            <Switch id="veg" checked={formData.isVegetarian} onCheckedChange={handleSwitchChange("isVegetarian")} />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white transition-colors">
                            <Label htmlFor="spicy" className="cursor-pointer">Spicy</Label>
                            <Switch id="spicy" checked={formData.isSpicy} onCheckedChange={handleSwitchChange("isSpicy")} />
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-white transition-colors">
                            <Label htmlFor="chef" className="cursor-pointer">Chef Special</Label>
                            <Switch id="chef" checked={formData.isChefSpecial} onCheckedChange={handleSwitchChange("isChefSpecial")} />
                        </div>
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
