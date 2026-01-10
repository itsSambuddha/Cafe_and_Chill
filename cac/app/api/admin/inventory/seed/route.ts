import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import InventoryItem from "@/models/InventoryItem";

const SAMPLE_INVENTORY = [
    { name: "Espresso Beans", category: "Coffee", quantity: 15, unit: "kg", reorderThreshold: 5, notes: "Dark roast blend" },
    { name: "Whole Milk", category: "Dairy", quantity: 40, unit: "liters", reorderThreshold: 10, notes: "Daily delivery" },
    { name: "Almond Milk", category: "Dairy", quantity: 8, unit: "liters", reorderThreshold: 3, notes: "Barista blend" },
    { name: "Sourdough Bread", category: "Bakery", quantity: 12, unit: "loaves", reorderThreshold: 4, notes: "" },
    { name: "Avocados", category: "Produce", quantity: 25, unit: "pcs", reorderThreshold: 10, notes: "Check ripeness" },
    { name: "Takeaway Cups (12oz)", category: "Packaging", quantity: 400, unit: "pcs", reorderThreshold: 100, notes: "" },
    { name: "Napkins", category: "Packaging", quantity: 1000, unit: "pcs", reorderThreshold: 200, notes: "" },
    { name: "Chocolate Syrup", category: "Syrups", quantity: 4, unit: "bottles", reorderThreshold: 2, notes: "Monin" },
    { name: "Green Tea Leaves", category: "Tea", quantity: 2, unit: "kg", reorderThreshold: 0.5, notes: "" },
];

export async function POST() {
    try {
        await connectToDatabase();

        let count = 0;
        for (const item of SAMPLE_INVENTORY) {
            // Upsert by name
            await InventoryItem.updateOne(
                { name: item.name },
                { $set: item },
                { upsert: true }
            );
            count++;
        }

        return NextResponse.json({ success: true, message: `Seeded ${count} inventory items.` });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
