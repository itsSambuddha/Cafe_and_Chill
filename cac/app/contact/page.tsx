"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
                setErrorMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Failed to send message.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfbf7] selection:bg-coffee-200">
            <Navbar />

            <main className="relative pt-24 pb-12 overflow-hidden">
                {/* Background Ambience - Light & Warm */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coffee-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/60 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">

                    {/* Cinematic Header - Light Mode */}
                    <div className="mb-20 pt-10 md:pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-coffee-950 mb-6 leading-[0.9]">
                                Let's create <br /> some magic.
                            </h1>
                            <p className="text-xl md:text-2xl text-coffee-700/80 max-w-xl font-light leading-relaxed">
                                Whether it's a private event, a menu inquiry, or just a friendly hello—we're all ears.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Interactive Info Grid (Bento Style) - Light Mode */}
                        <div className="lg:col-span-5 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                    <InfoCard
                                        icon={MapPin}
                                        title="Find Us"
                                        content="Police Bazar, Shillong, Meghalaya 793001"
                                        delay={0.3}
                                    />
                                    <InfoCard
                                        icon={Mail}
                                        title="Email Us"
                                        content="hello@cafeandchill.in"
                                        subContent="events@cafeandchill.in"
                                        delay={0.4}
                                    />
                                    <InfoCard
                                        icon={Phone}
                                        title="Ring Us"
                                        content="+91 98765 43210"
                                        subContent="Mon-Sat, 9am - 9pm"
                                        delay={0.5}
                                    />
                                </div>
                            </motion.div>

                            {/* Stylized Map Preview - Light Mode */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="relative h-64 w-full rounded-2xl overflow-hidden border border-coffee-200 shadow-xl group"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.20336262492!2d91.8708!3d25.5684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM0JzA1LjkiTiA5McKwNTInMjYuOCJF!5e0!3m2!1sen!2sin!4v1626343434343!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    className="grayscale contrast-[0.9] opacity-80 hover:grayscale-0 transition-all duration-700 w-[110%] h-[110%] -ml-[5%] -mt-[5%]"
                                />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-coffee-50 to-transparent opacity-20" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-coffee-900 bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    Open until 9:30 PM
                                </div>
                            </motion.div>
                        </div>

                        {/* Glassmorphism Form - Light Mode */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <div className="relative rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
                                <div className="absolute top-0 right-0 -m-4">
                                    <Sparkles className="h-12 w-12 text-coffee-400 opacity-40 rotate-12" />
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid gap-8 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold uppercase tracking-widest text-coffee-900">Name</label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                required
                                                className="bg-white/50 border-coffee-200/50 text-coffee-900 placeholder:text-coffee-900/30 h-14 rounded-xl focus:border-coffee-500 focus:ring-1 focus:ring-coffee-500 transition-all font-medium text-lg focus:bg-white"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold uppercase tracking-widest text-coffee-900">Email</label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                                className="bg-white/50 border-coffee-200/50 text-coffee-900 placeholder:text-coffee-900/30 h-14 rounded-xl focus:border-coffee-500 focus:ring-1 focus:ring-coffee-500 transition-all font-medium text-lg focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold uppercase tracking-widest text-coffee-900">Subject</label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="What's this about?"
                                            required
                                            className="bg-white/50 border-coffee-200/50 text-coffee-900 placeholder:text-coffee-900/30 h-14 rounded-xl focus:border-coffee-500 focus:ring-1 focus:ring-coffee-500 transition-all font-medium text-lg focus:bg-white"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold uppercase tracking-widest text-coffee-900">Message</label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us everything..."
                                            required
                                            className="min-h-[200px] bg-white/50 border-coffee-200/50 text-coffee-900 placeholder:text-coffee-900/30 rounded-xl focus:border-coffee-500 focus:ring-1 focus:ring-coffee-500 transition-all font-medium text-lg resize-none p-4 focus:bg-white"
                                        />
                                    </div>

                                    <div className="relative pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-14 rounded-xl bg-gradient-to-r from-coffee-600 to-coffee-500 hover:from-coffee-700 hover:to-coffee-600 text-white text-lg font-semibold tracking-wide shadow-lg shadow-coffee-900/10 disabled:opacity-70"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="h-5 w-5 animate-spin" /> Sending magic...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    Send Message <ArrowRight className="h-5 w-5" />
                                                </span>
                                            )}
                                        </Button>

                                        <AnimatePresence>
                                            {status === "success" && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute top-full left-0 right-0 mt-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-3 shadow-sm"
                                                >
                                                    <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                                                    <span>Message sent! We'll be in touch over a cup of coffee soon.</span>
                                                </motion.div>
                                            )}
                                            {status === "error" && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute top-full left-0 right-0 mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3 shadow-sm"
                                                >
                                                    <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                                                    <span>{errorMessage || "Oops! Something went wrong. Try again."}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            
        </div>
    );
}

function InfoCard({ icon: Icon, title, content, subContent, delay }: { icon: any, title: string, content: string, subContent?: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="group flex gap-5 items-start p-6 rounded-2xl bg-white border border-coffee-100 shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.08)] hover:border-coffee-200 transition-all cursor-default"
        >
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-coffee-50 border border-coffee-100 text-coffee-700 group-hover:bg-coffee-600 group-hover:text-white transition-all duration-500">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-bold text-coffee-950 mb-1 leading-none pt-1">{title}</h3>
                <p className="text-coffee-700 font-medium text-sm leading-relaxed mt-1">{content}</p>
                {subContent && <p className="text-coffee-500 text-xs mt-1 font-medium">{subContent}</p>}
            </div>
        </motion.div>
    )
}
