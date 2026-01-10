"use client";

import { Star, Leaf, Wifi, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Star,
        label: "4.9/5 Rating",
        sub: "1.2k+ Reviews"
    },
    {
        icon: Leaf,
        label: "100% Organic",
        sub: "Direct Trade"
    },
    {
        icon: Wifi,
        label: "Super Fast WiFi",
        sub: "Remote Friendly"
    },
    {
        icon: MapPin,
        label: "City Center",
        sub: "Easy Access"
    }
];

export function HeroFeatures({ className }: { className?: string }) {
    return (
        <div className={cn("w-full max-w-5xl mx-auto px-4 pointer-events-none", className)}>
            <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl md:rounded-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-coffee-900/5 p-2 md:p-3 pointer-events-auto">

                {features.map((feature, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex items-center gap-3 px-6 py-2 w-full md:w-auto  ",
                            // Add dividers on desktop, except for the last item
                            i !== features.length - 1 && "md:border-r border-coffee-900/5"
                        )}
                    >
                        <div className="flex-shrink-0 p-2 rounded-full bg-coffee-100 text-coffee-800">
                            <feature.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs md:text-sm font-bold text-coffee-900 leading-none mb-1">
                                {feature.label}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-coffee-600/70">
                                {feature.sub}
                            </span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
