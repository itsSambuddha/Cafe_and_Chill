// app/(menu)/menu/MenuClient.tsx
"use client";

import { useState } from "react";
import type { MenuCategory } from "@/data/menu";
import { MenuHeroMinimal } from "@/components/menu/MenuHeroMinimal";
import { MenuCanvasLayout } from "@/components/menu/MenuCanvasLayout";

export function MenuClient() {
    const [category, setCategory] = useState<MenuCategory>("food");

    return (
        <main className="bg-white text-neutral-900">
            {/* add top padding to clear fixed navbar height, e.g. 64px */}
            <div className="pt-16">
                <MenuHeroMinimal
                    activeCategory={category}
                    onCategoryChange={setCategory}
                />
                <MenuCanvasLayout activeCategory={category} />
            </div>
        </main>
    );
}
