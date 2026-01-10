// app/(menu)/MenuCard.tsx
"use client";

import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  variant?: "grid" | "list";
}

const TAG_STYLES: Record<string, string> = {
  hot: "bg-amber-50 text-amber-800",
  cold: "bg-sky-50 text-sky-800",
  veg: "bg-emerald-50 text-emerald-800",
  "non-veg": "bg-rose-50 text-rose-800",
  spicy: "bg-red-50 text-red-800",
  signature: "bg-purple-50 text-purple-800",
};

export function MenuCard({ item, variant = "list" }: MenuCardProps) {
  const isGrid = variant === "grid";

  const accent =
    item.category === "food"
      ? "#A8C3A0"
      : item.category === "coffee-hot"
      ? "#B0784A"
      : item.category === "coffee-cold"
      ? "#4A8BB0"
      : item.category === "dessert"
      ? "#C4698E"
      : item.category === "special"
      ? "#6A65C3"
      : "#3B8B6A";

  return (
    <article
      className={cn(
        "group relative overflow-hidden transition",
        isGrid
          ? "rounded-3xl border border-neutral-200/80 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] hover:-translate-y-[2px] hover:shadow-[0_22px_55px_rgba(15,23,42,0.14)]"
          : "rounded-2xl border border-neutral-200 bg-white/90 p-4 hover:-translate-y-[1px] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
      )}
    >
      {/* subtle accent bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold tracking-[0.03em] text-neutral-900">
              {item.name}
            </h3>
            {item.bestSeller && (
              <span className="rounded-full bg-[hsl(25,90%,92%)] px-2 py-0.5 text-[10px] font-medium text-[hsl(25,40%,30%)]">
                Best seller
              </span>
            )}
          </div>

          {item.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                    TAG_STYLES[tag] ?? "bg-neutral-100 text-neutral-700"
                  )}
                >
                  {tag.replace("-", " ")}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ml-2 flex flex-shrink-0 items-start">
          <span className="text-sm font-semibold text-neutral-900">
            ₹{item.price}
          </span>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-xs text-neutral-500">
        {item.shortDesc}
      </p>
    </article>
  );
}
