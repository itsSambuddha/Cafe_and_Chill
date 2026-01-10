import React from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export function PageShell({
    children,
    title,
    description,
    action,
    className,
}: PageShellProps) {
    return (
        <div className={cn("space-y-6 pt-10 pb-16 animate-in fade-in duration-500", className)}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-stone-500 md:text-base">
                            {description}
                        </p>
                    )}
                </div>
                {action && <div className="flex items-center gap-2">{action}</div>}
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
