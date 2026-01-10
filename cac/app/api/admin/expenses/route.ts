import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Expense from "@/models/Expense";

export async function GET() {
    try {
        await connectToDatabase();
        // Sort by date desc
        const items = await Expense.find({}).sort({ date: -1 });
        return NextResponse.json(items);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        if (!body.title || !body.amount) {
            return NextResponse.json({ error: "Title and Amount are required." }, { status: 400 });
        }

        const newItem = await Expense.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
