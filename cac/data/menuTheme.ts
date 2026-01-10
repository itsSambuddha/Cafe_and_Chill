// data/menuTheme.ts
import type { MenuCategory } from "./menu";

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  "coffee-hot": "Hot Coffee",
  "coffee-cold": "Cold Coffee",
  beverages: "Other Beverages",
  food: "Food & Snacks",
  dessert: "Desserts",
  special: "House Specials",
};

export const CATEGORY_COLORS: Record<
  MenuCategory,
  { accent: string; softBg: string }
> = {
  "coffee-hot": {
    accent: "#B0784A",
    softBg: "#F6E7D7",
  },
  "coffee-cold": {
    accent: "#4A8BB0",
    softBg: "#E2F1FB",
  },
  beverages: {
    accent: "#3B8B6A",
    softBg: "#E3F3EB",
  },
  food: {
    accent: "#A4AF4F",
    softBg: "#F0F5D8",
  },
  dessert: {
    accent: "#C4698E",
    softBg: "#FBE6F0",
  },
  special: {
    accent: "#6A65C3",
    softBg: "#E4E3FF",
  },
};
