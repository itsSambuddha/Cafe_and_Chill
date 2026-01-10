import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    intensity?: "low" | "medium" | "high";
}

export function GlassCard({
    children,
    className,
    intensity = "medium",
    ...props
}: GlassCardProps) {
    const intensityStyles = {
        low: "bg-white/60 backdrop-blur-sm border-white/20",
        medium: "bg-white/80 backdrop-blur-md border-white/40",
        high: "bg-white/95 backdrop-blur-xl border-white/60",
    };

    return (
        <div
            className={cn(
                "rounded-2xl border shadow-xl shadow-black/5",
                intensityStyles[intensity],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
