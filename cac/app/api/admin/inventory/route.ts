import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import InventoryItem from "@/models/InventoryItem";

export async function GET() {
    try {
        await connectToDatabase();
        // sort by category then name
        const items = await InventoryItem.find({}).sort({ category: 1, name: 1 });
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.quantity) {
            return NextResponse.json({ error: "Name and Quantity are required" }, { status: 400 });
        }

        const newItem = await InventoryItem.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// Optional SEED route embedded as POST (usually triggered manually or hidden)
// Or I can make a separate seed route. Let's make a separate seed route to be consistent.
