import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import MenuItem from "@/models/MenuItem";

export async function GET() {
    try {
        await connectToDatabase();
        // Return all items, sorted by category then name
        const items = await MenuItem.find({}).sort({ category: 1, name: 1 });
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        // Basic validation
        if (!body.name || !body.price || !body.category) {
            return NextResponse.json(
                { error: "Name, price, and category are required." },
                { status: 400 }
            );
        }

        // Generate ID if not provided (slugify name)
        if (!body.id) {
            body.id = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            // Append random string if too short or collision risk? 
            // For simple admin usage, we'll assume admin handles duplicates or Mongo throws unique error.
        }

        const newItem = await MenuItem.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error: any) {
        // Check for duplicate key error (E11000)
        if (error.code === 11000) {
            return NextResponse.json({ error: "A menu item with this ID/Name already exists." }, { status: 409 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
