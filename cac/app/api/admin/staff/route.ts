import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    try {
        await connectToDatabase();
        // Return all users, sort by pending first, then created desc
        // "status" enum: pending, approved, rejected. 
        // We can just sort by createdAt desc for now, or use custom sort later.
        const users = await User.find({}).sort({ createdAt: -1 });
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
