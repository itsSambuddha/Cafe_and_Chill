"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { CreditCard, Banknote, QrCode, CheckCircle2, IndianRupee, Plus, Minus, Search, Trash2, Printer, RefreshCw } from "lucide-react";
import { BadgePill } from "@/components/ui/badge-pill";
import { UpiQrCard } from "@/components/shared/UpiQrCard";
import { useAuth } from "@/components/providers/AuthProvider"; // Corrected import path
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Receipt } from "@/components/staff/Receipt";
import { useReactToPrint } from "react-to-print";

interface MenuItem {
    _id: string;
    name: string;
    price: number;
    category: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

export default function StaffPosPage() {
    const { mongoUser } = useAuth();

    // Data State
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loadingMenu, setLoadingMenu] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Transaction State
    const [cart, setCart] = useState<CartItem[]>([]);
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [lastSale, setLastSale] = useState<any>(null);

    // Printing
    const receiptRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: receiptRef,
        documentTitle: `Bill-${Date.now()}`,
    } as any);

    // Fetch Menu on Mount
    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch("/api/admin/menu");
                if (res.ok) {
                    const data = await res.json();
                    setMenuItems(data);
                }
            } catch (error) {
                console.error("Failed to fetch menu", error);
            } finally {
                setLoadingMenu(false);
            }
        }
        fetchMenu();
    }, []);

    // Cart Logic
    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === item._id);
            if (existing) {
                return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => prev.filter(i => i._id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setCart(prev => prev.map(i => {
            if (i._id === itemId) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    };

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Filter Logic
    const categories = ["All", ...Array.from(new Set(menuItems.map(i => i.category)))];
    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSubmit = async () => {
        if (cart.length === 0) return;

        setLoading(true);
        try {
            const saleData = {
                staffUserId: mongoUser?.firebaseUid || "unknown",
                items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
                totalAmount,
                paymentMethod,
                paymentSource: "pos",
                notes: note,
            };

            const res = await fetch("/api/admin/sales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(saleData)
            });

            if (res.ok) {
                const newSale = await res.json();
                setLastSale(newSale); // Store for receipt
                setShowSuccess(true);
            } else {
                alert("Failed to record sale.");
            }
        } catch (error) {
            console.error(error);
            alert("Error recording sale.");
        } finally {
            setLoading(false);
        }
    };

    const resetSale = () => {
        setShowSuccess(false);
        setCart([]);
        setNote("");
        setPaymentMethod("Cash");
        setLastSale(null);
    };

    const paymentMethods = [
        { id: "Cash", icon: Banknote, color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/50" },
        { id: "UPI - GPay", icon: QrCode, color: "bg-blue-500/20 text-blue-700 border-blue-500/50" },
        { id: "Card", icon: CreditCard, color: "bg-purple-500/20 text-purple-700 border-purple-500/50" },
    ];

    if (showSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] gap-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 max-w-md w-full text-center shadow-xl space-y-6"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                        <CheckCircle2 size={40} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-emerald-900">Sale Recorded!</h2>
                        <p className="text-emerald-700">₹{totalAmount.toFixed(2)}</p>
                    </div>

                    <div className="flex gap-3">
                        <Button onClick={handlePrint} className="flex-1 bg-stone-900 hover:bg-stone-800 text-white gap-2">
                            <Printer size={16} />
                            Print Bill
                        </Button>
                        <Button onClick={resetSale} variant="outline" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                            New Sale
                        </Button>
                    </div>

                    {/* Hidden Receipt for Printing */}
                    {/* Hidden Receipt for Printing */}
                    <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
                        <div id="receipt-content">
                            <Receipt ref={receiptRef} sale={lastSale} />
                        </div>
                    </div>
                </motion.div>

                {/* Print Preview (Optional, just to show user what will print) */}
                <div className="border border-stone-200 rounded-lg p-4 bg-white shadow-sm opacity-60 pointer-events-none scale-75 origin-top">
                    <p className="text-xs text-center text-stone-400 mb-2">Receipt Preview</p>
                    <Receipt sale={lastSale} />
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6 pb-4">
            {/* Left: Menu Selection */}
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="flex gap-3 bg-white p-3 rounded-2xl shadow-sm border border-stone-100">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                        <Input
                            placeholder="Search menu..."
                            className="pl-9 bg-stone-50 border-stone-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[400px]">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors",
                                    selectedCategory === cat
                                        ? "bg-stone-900 text-white"
                                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 lg:grid-cols-3 gap-3 content-start">
                    {loadingMenu ? (
                        <div className="col-span-full flex justify-center py-10 text-stone-400">Loading menu...</div>
                    ) : (
                        filteredItems.map(item => (
                            <motion.button
                                layout
                                key={item._id}
                                onClick={() => addToCart(item)}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all text-left flex flex-col justify-between h-32 group"
                            >
                                <span className="font-bold text-stone-800 line-clamp-2">{item.name}</span>
                                <span className="text-amber-700 font-mono font-medium bg-amber-50 self-start px-2 py-1 rounded-lg text-xs group-hover:bg-amber-100">
                                    ₹{item.price}
                                </span>
                            </motion.button>
                        ))
                    )}
                </div>
            </div>

            {/* Right: Cart & Checkout */}
            <div className="w-[400px] flex flex-col gap-4">
                <Card className="flex-1 border-none shadow-xl shadow-stone-200/50 bg-white ring-1 ring-stone-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                        <span className="font-bold text-stone-500 text-xs tracking-wider uppercase">Current Order</span>
                        <div className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">{cart.length} Items</div>
                    </div>

                    <CardContent className="flex-1 overflow-y-auto p-2 space-y-2">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-stone-300 gap-2">
                                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                                    <Printer className="w-6 h-6" />
                                </div>
                                <span className="text-sm">Start adding items</span>
                            </div>
                        ) : (
                            cart.map(item => (
                                <motion.div
                                    layout
                                    key={item._id}
                                    className="bg-white border border-stone-100 p-3 rounded-xl flex items-center justify-between shadow-sm"
                                >
                                    <div className="flex-1 min-w-0 pr-3">
                                        <div className="font-medium text-stone-800 text-sm truncate">{item.name}</div>
                                        <div className="text-xs text-stone-400">₹{item.price} x {item.quantity}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center bg-stone-100 rounded-lg p-0.5">
                                            <button onClick={() => updateQuantity(item._id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-shadow">
                                                {item.quantity === 1 ? <Trash2 size={12} className="text-red-400" /> : <Minus size={12} />}
                                            </button>
                                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-shadow">
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <div className="font-bold text-sm min-w-[3rem] text-right">₹{item.price * item.quantity}</div>
                                        {item.quantity === 1 && (
                                            <button onClick={() => removeFromCart(item._id)} className="text-stone-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </CardContent>

                    <div className="p-4 bg-stone-50 border-t border-stone-100 space-y-4">
                        {/* Notes */}
                        <Input
                            placeholder="Add note..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="bg-white border-stone-200 text-sm h-9"
                        />

                        {/* Payment Selection */}
                        <div className="grid grid-cols-3 gap-2">
                            {paymentMethods.map(method => (
                                <button
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold uppercase transition-all",
                                        paymentMethod === method.id ? method.color + " bg-opacity-100 shadow-sm" : "bg-white border-stone-100 text-stone-400 hover:bg-stone-50"
                                    )}
                                >
                                    <method.icon size={16} className="mb-1" />
                                    {method.id.split(" - ")[0]}
                                </button>
                            ))}
                        </div>

                        {/* Total & Action */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-stone-500 font-medium text-sm">Total</span>
                                <span className="text-3xl font-black text-stone-900">₹{totalAmount.toFixed(0)}</span>
                            </div>
                            <Button
                                size="lg"
                                className="w-full bg-stone-900 hover:bg-black text-white rounded-xl h-12 font-bold shadow-lg shadow-stone-900/10 active:scale-95 transition-all text-base"
                                disabled={cart.length === 0 || loading}
                                onClick={handleSubmit}
                            >
                                {loading ? "Processing..." : `Charge ₹${totalAmount}`}
                            </Button>
                        </div>
                    </div>
                </Card>

                {paymentMethod === 'UPI - GPay' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden bg-white border border-stone-200 rounded-2xl p-4 shadow-sm"
                    >
                        <UpiQrCard />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
