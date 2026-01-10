import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import { menuItems } from "@/data/menu";

// Assuming connectToDB is in lib/mongoose. If not, I'll need to create it or find where it is.
// I'll check lib folder content shortly. For now, I'll assume standard pattern.

export async function POST() {
    try {
        await connectToDatabase();

        let createdCount = 0;
        let updatedCount = 0;

        for (const item of menuItems) {
            const existing = await MenuItem.findOne({ id: item.id });

            const payload = {
                id: item.id,
                name: item.name,
                description: item.shortDesc,
                price: item.price,
                category: item.category,
                tags: item.tags,
                featured: item.featured || false,
                bestSeller: item.bestSeller || false,
                isAvailable: true,
                // Defaulting other fields
                isVegetarian: item.tags.includes('veg'),
                isSpicy: item.tags.includes('spicy'),
            };

            if (existing) {
                await MenuItem.updateOne({ id: item.id }, payload);
                updatedCount++;
            } else {
                await MenuItem.create(payload);
                createdCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Seeding complete. Created: ${createdCount}, Updated: ${updatedCount}`
        });

    } catch (error: any) {
        console.error("Error seeding menu:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
