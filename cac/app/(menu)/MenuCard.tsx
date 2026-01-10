// app/(menu)/MenuCard.tsx
"use client";

import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

interface MenuCardProps {
    item: MenuItem;
    variant?: "grid" | "list";
}

const TAG_STYLES: Record<string, string> = {
    hot: "bg-coffee-100 text-coffee-800",
    cold: "bg-sky-50 text-sky-800",
    veg: "bg-emerald-50 text-emerald-800",
    "non-veg": "bg-rose-50 text-rose-800",
    spicy: "bg-orange-50 text-orange-800",
    signature: "bg-purple-50 text-purple-800",
};

export function MenuCard({ item, variant = "list" }: MenuCardProps) {
    const isGrid = variant === "grid";

    return (
        <article
            className={cn(
                "group relative overflow-hidden transition-all duration-300",
                isGrid
                    ? "rounded-2xl border border-coffee-100 bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-coffee-900/5"
                    : "rounded-xl border border-coffee-100 bg-white/50 p-4 hover:bg-white hover:shadow-md hover:shadow-coffee-900/5"
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-semibold tracking-tight text-coffee-900">
                            {item.name}
                        </h3>
                        {item.bestSeller && (
                            <span className="rounded-full bg-coffee-600 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                                Best seller
                            </span>
                        )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-coffee-800/70">
                        {item.shortDesc}
                    </p>

                    {item.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={cn(
                                        "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                                        TAG_STYLES[tag] ?? "bg-gray-100 text-gray-600"
                                    )}
                                >
                                    {tag.replace("-", " ")}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="ml-3 flex flex-shrink-0 items-start">
                    <span className="rounded-md bg-coffee-50 px-2.5 py-1 text-sm font-semibold text-coffee-900">
                        ₹{item.price}
                    </span>
                </div>
            </div>
        </article>
    );
}
