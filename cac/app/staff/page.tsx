"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreditCard, Banknote, QrCode, CheckCircle2 } from "lucide-react";
import { BadgePill } from "@/components/ui/badge-pill";
import { UpiQrCard } from "@/components/shared/UpiQrCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StaffPosPage() {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const { mongoUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || isNaN(Number(amount))) return;

        setLoading(true);
        try {
            const res = await fetch("/api/admin/sales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    totalAmount: parseFloat(amount),
                    paymentMethod,
                    paymentSource: "pos",
                    notes: note,
                    staffUserId: mongoUser?.firebaseUid || "unknown"
                })
            });

            if (res.ok) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setAmount("");
                    setNote("");
                    setPaymentMethod("Cash");
                }, 2000);
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

    const paymentMethods = [
        { id: "Cash", icon: Banknote, color: "bg-green-100 text-green-700 border-green-200" },
        { id: "UPI - GPay", icon: QrCode, color: "bg-blue-100 text-blue-700 border-blue-200" },
        { id: "Card", icon: CreditCard, color: "bg-purple-100 text-purple-700 border-purple-200" },
    ];

    return (
        <div className="space-y-6 max-w-md mx-auto pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-stone-800 tracking-tight">New Sale</h2>
                    <BadgePill text={new Date().toLocaleDateString()} className="bg-white shadow-sm" />
                </div>

                <AnimatePresence mode="wait">
                    {showSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-green-50 border border-green-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-inner h-[400px]"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 text-white shadow-lg"
                            >
                                <CheckCircle2 size={48} />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-green-800">Sale Recorded!</h3>
                            <p className="text-green-600 mt-2">The transaction has been saved successfully.</p>
                        </motion.div>
                    ) : (
                        <Card key="form" className="border-none shadow-xl bg-white/80 backdrop-blur-md overflow-hidden relative">
                            {/* Decorative background blob */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

                            <CardContent className="p-6 space-y-8 relative z-10">
                                {/* Amount Input - Massive & Central */}
                                <div className="text-center space-y-2 pt-4">
                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Total Amount</label>
                                    <div className="relative flex items-center justify-center">
                                        <span className={cn("text-4xl font-medium absolute left-8 top-1/2 -translate-y-1/2 transition-colors", amount ? "text-stone-800" : "text-stone-300")}>₹</span>
                                        <Input
                                            type="number"
                                            className="text-6xl font-black h-24 text-center border-none shadow-none bg-transparent focus-visible:ring-0 text-stone-800 placeholder:text-stone-100"
                                            placeholder="0"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="h-1 w-24 bg-stone-100 mx-auto rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-amber-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: amount ? "100%" : "0%" }}
                                        />
                                    </div>
                                </div>

                                {/* Payment Method Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block text-center">Payment Method</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {paymentMethods.map((method) => (
                                            <motion.button
                                                key={method.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 aspect-square",
                                                    paymentMethod === method.id
                                                        ? method.color + " shadow-md ring-2 ring-offset-2 ring-stone-100"
                                                        : "bg-stone-50 border-transparent text-stone-400 hover:bg-stone-100"
                                                )}
                                            >
                                                <method.icon size={24} className="mb-2" />
                                                <span className="text-xs font-bold">{method.id.split(" - ")[0]}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Notes Input */}
                                <div className="relative">
                                    <Input
                                        placeholder="Add a note... (optional)"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="bg-stone-50 border-none rounded-xl px-4 py-6 text-center focus:bg-stone-100 transition-colors"
                                    />
                                </div>

                                {/* Action Button */}
                                <Button
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-orange-950 text-white text-lg font-bold py-8 rounded-2xl shadow-lg shadow-amber-900/20 active:scale-95 transition-all"
                                    onClick={handleSubmit}
                                    disabled={loading || !amount}
                                >
                                    {loading ? "Recording..." : "Charge ₹" + (amount || "0")}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {paymentMethod === 'UPI - GPay' && !showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <UpiQrCard />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
