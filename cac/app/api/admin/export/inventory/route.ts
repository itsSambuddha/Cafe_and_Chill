import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import InventoryItem from "@/models/InventoryItem";
import { convertToCSV } from "@/lib/csv";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await InventoryItem.find({}).sort({ category: 1, name: 1 }).lean();

        const cleanData = items.map((item: any) => {
            const isLow = item.quantity <= (item.reorderThreshold || 0);
            return {
                Name: item.name,
                Category: item.category,
                Quantity: item.quantity,
                Unit: item.unit,
                Reorder_Level: item.reorderThreshold,
                Status: isLow ? "LOW STOCK" : "OK",
                Notes: item.notes || "",
                Last_Updated: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ""
            };
        });

        const csv = convertToCSV(cleanData);

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="inventory_export_${new Date().toISOString().split('T')[0]}.csv"`,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
