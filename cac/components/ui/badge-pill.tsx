import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BadgePillProps {
    icon?: React.ComponentType<{ className?: string }>;
    text: string;
    className?: string;
}

export function BadgePill({ icon: Icon, text, className }: BadgePillProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-full border border-gray-100 bg-white/90 px-4 py-2 text-xs text-gray-700 shadow-sm backdrop-blur-sm",
                className
            )}
        >
            {Icon && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coffee-100 text-coffee-900">
                    <Icon className="h-3.5 w-3.5" />
                </span>
            )}
            <span>{text}</span>
        </div>
    );
}
