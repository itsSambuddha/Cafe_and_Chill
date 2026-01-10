// data/menuAssets.ts
import type { MenuCategory } from "@/data/menu";

type CategoryAssetMap = {
  [K in MenuCategory]: string[];
};

export const CATEGORY_ASSETS: CategoryAssetMap = {
  "coffee-hot": [
    "/assets/menu/coffee-hot-01.jpeg",
    "/assets/menu/coffee-latte-art-01.jpeg",
  ],
  "coffee-cold": [
    "/assets/menu/coffee-cold-01.jpeg",
    "/assets/menu/cold-brew-01.jpeg",
    "/assets/menu/frappe-01.jpeg",
  ],
  beverages: [
    "/assets/menu/cafe-drink-01.jpeg",
    "/assets/menu/cafe-drink-02.jpeg",
    "/assets/menu/cafe-drink-03.jpeg",
    "/assets/menu/mojito-01.jpeg",
    "/assets/menu/lemon-ice-tea-01.jpeg",
    "/assets/menu/lemon-ice-tea-top-01.jpeg",
  ],
  food: [
    "/assets/menu/butter-toast-01.jpeg",
    "/assets/menu/chicken-nuggets-01.jpeg",
    "/assets/menu/chicken-wings-01.jpeg",
    "/assets/menu/rice-dish-01.jpeg",
  ],
  dessert: [
    "/assets/menu/brownie-01.jpeg",
    "/assets/menu/tiramisu-01.jpeg",
    "/assets/menu/tiramisu-02.jpeg"
  ],
  special: [
    "/assets/menu/tribal-rice-01.jpeg",
    "/assets/menu/cafe-drink-03.jpeg",
  ],
};
