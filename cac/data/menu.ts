// data/menu.ts
export type MenuCategory =
  | "coffee-hot"
  | "coffee-cold"
  | "beverages"
  | "food"
  | "dessert"
  | "special";

export interface MenuItem {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  category: MenuCategory;
  tags: string[];
  bestSeller?: boolean;
  featured?: boolean;
}

export const menuItems: MenuItem[] = [
  // HOT COFFEE
  {
    id: "1",
    name: "Classic Cappuccino",
    shortDesc: "Rich espresso with steamed milk foam.",
    price: 180,
    category: "coffee-hot",
    tags: ["hot", "best-seller"],
    bestSeller: true,
    featured: true,
  },
  {
    id: "2",
    name: "Flat White",
    shortDesc: "Bold espresso with a velvety microfoam.",
    price: 190,
    category: "coffee-hot",
    tags: ["hot"],
  },
  {
    id: "3",
    name: "Hazelnut Latte",
    shortDesc: "Espresso with hazelnut syrup and steamed milk.",
    price: 210,
    category: "coffee-hot",
    tags: ["hot", "flavoured"],
  },
  {
    id: "4",
    name: "Americano",
    shortDesc: "Espresso stretched with hot water.",
    price: 160,
    category: "coffee-hot",
    tags: ["hot"],
  },
  {
    id: "5",
    name: "Mocha",
    shortDesc: "Chocolate, espresso, and steamed milk.",
    price: 220,
    category: "coffee-hot",
    tags: ["hot", "chocolate"],
  },

  // COLD COFFEE
  {
    id: "6",
    name: "Iced Hazelnut Latte",
    shortDesc: "Chilled espresso with hazelnut syrup and milk.",
    price: 220,
    category: "coffee-cold",
    tags: ["cold"],
    featured: true,
  },
  {
    id: "7",
    name: "Classic Iced Latte",
    shortDesc: "Espresso over ice with chilled milk.",
    price: 210,
    category: "coffee-cold",
    tags: ["cold"],
  },
  {
    id: "8",
    name: "Caramel Frappe",
    shortDesc: "Blended coffee drink with caramel drizzle.",
    price: 240,
    category: "coffee-cold",
    tags: ["cold", "sweet"],
  },
  {
    id: "9",
    name: "Cold Brew",
    shortDesc: "18-hour steeped coffee over ice.",
    price: 200,
    category: "coffee-cold",
    tags: ["cold"],
  },
  {
    id: "10",
    name: "Affogato",
    shortDesc: "Espresso poured over vanilla ice cream.",
    price: 230,
    category: "coffee-cold",
    tags: ["cold", "dessert"],
  },

  // BEVERAGES
  {
    id: "11",
    name: "Matcha Latte",
    shortDesc: "Premium matcha green tea with steamed milk.",
    price: 210,
    category: "beverages",
    tags: ["hot"],
  },
  {
    id: "12",
    name: "Lemon Iced Tea",
    shortDesc: "House-brewed tea with lemon and ice.",
    price: 160,
    category: "beverages",
    tags: ["cold"],
  },
  {
    id: "13",
    name: "Classic Hot Chocolate",
    shortDesc: "Dark cocoa with steamed milk and cream.",
    price: 190,
    category: "beverages",
    tags: ["hot", "chocolate"],
  },
  {
    id: "14",
    name: "Mojito Cooler",
    shortDesc: "Mint, lime, and soda over crushed ice.",
    price: 180,
    category: "beverages",
    tags: ["cold", "refreshing"],
  },
  {
    id: "15",
    name: "Masala Chai",
    shortDesc: "Spiced Indian tea brewed with milk.",
    price: 150,
    category: "beverages",
    tags: ["hot"],
  },

  // FOOD
  {
    id: "16",
    name: "Avocado Toast",
    shortDesc: "Sourdough bread topped with smashed avocado.",
    price: 250,
    category: "food",
    tags: ["veg"],
  },
  {
    id: "17",
    name: "Chicken Wings",
    shortDesc: "Crispy wings with house spice rub.",
    price: 260,
    category: "food",
    tags: ["non-veg"],
  },
  {
    id: "18",
    name: "Tribal Rice Plate",
    shortDesc: "Rice with local sides and a warm curry.",
    price: 280,
    category: "food",
    tags: ["signature"],
    featured: true,
  },
  {
    id: "19",
    name: "Butter Toast",
    shortDesc: "Crisp toast with salted butter.",
    price: 130,
    category: "food",
    tags: ["veg"],
  },
  {
    id: "20",
    name: "Chicken Nuggets",
    shortDesc: "Bite-sized crispy chicken pieces.",
    price: 220,
    category: "food",
    tags: ["non-veg"],
  },

  // DESSERT
  {
    id: "21",
    name: "Blueberry Cheesecake",
    shortDesc: "Creamy cheesecake with blueberry topping.",
    price: 300,
    category: "dessert",
    tags: ["veg"],
    featured: true,
  },
  {
    id: "22",
    name: "Brownie with Ice Cream",
    shortDesc: "Warm brownie with a scoop of vanilla.",
    price: 260,
    category: "dessert",
    tags: ["veg"],
  },
  {
    id: "23",
    name: "Tiramisu",
    shortDesc: "Coffee-soaked sponge with mascarpone.",
    price: 280,
    category: "dessert",
    tags: ["veg"],
  },
  {
    id: "24",
    name: "Chocolate Mousse",
    shortDesc: "Dark chocolate mousse, lightly whipped.",
    price: 240,
    category: "dessert",
    tags: ["veg"],
  },
  {
    id: "25",
    name: "Lemon Tart",
    shortDesc: "Buttery crust with lemon curd.",
    price: 230,
    category: "dessert",
    tags: ["veg"],
  },

  // SPECIAL
  {
    id: "26",
    name: "Signature Cold Brew",
    shortDesc: "Steeped for 18 hours for a smooth taste.",
    price: 190,
    category: "special",
    tags: ["cold", "signature"],
    featured: true,
  },
  {
    id: "27",
    name: "Seasonal Pour Over",
    shortDesc: "Rotating single-origin hand brew.",
    price: 220,
    category: "special",
    tags: ["hot"],
  },
  {
    id: "28",
    name: "Cafe Shilllong Special",
    shortDesc: "Barista’s choice drink of the day.",
    price: 210,
    category: "special",
    tags: ["signature"],
  },
  {
    id: "29",
    name: "Cold Coffee Flight",
    shortDesc: "Three small pours of cold coffee styles.",
    price: 320,
    category: "special",
    tags: ["cold", "tasting"],
  },
  {
    id: "30",
    name: "Dessert Flight",
    shortDesc: "Mini portions of three desserts.",
    price: 350,
    category: "special",
    tags: ["dessert", "sharing"],
  },
];
