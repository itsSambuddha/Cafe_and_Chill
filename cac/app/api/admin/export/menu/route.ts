import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import { convertToCSV } from "@/lib/csv";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await MenuItem.find({}).lean();

        // Flatten/Cleanup data for CSV if needed (e.g. remove _id if unwanted, format dates)
        const cleanData = items.map((item: any) => ({
            ID: item.id,
            Name: item.name,
            Category: item.category,
            Price: item.price,
            Description: item.description || "",
            Vegetarian: item.isVegetarian ? "Yes" : "No",
            Featured: item.featured ? "Yes" : "No",
            Available: item.isAvailable ? "Yes" : "No",
            Created_At: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : "",
        }));

        const csv = convertToCSV(cleanData);

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="menu_export_${new Date().toISOString().split('T')[0]}.csv"`,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
