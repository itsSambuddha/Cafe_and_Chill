import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Sale from "@/models/Sale";

export async function GET() {
    try {
        await connectToDatabase();
        // Sort by createdAt desc
        const items = await Sale.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        if (!body.totalAmount || !body.staffUserId) {
            // staffUserId should theoretically come from the auth token/session user
            // but for now we accept it in body if passed from frontend (e.g. Current User context)
            return NextResponse.json({ error: "Total Amount and User ID are required." }, { status: 400 });
        }

        const newItem = await Sale.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error: any) {
        console.error("Sale Recording Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
