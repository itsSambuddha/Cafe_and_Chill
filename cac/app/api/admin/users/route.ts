import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        // Simplified Auth: Check for x-admin-email header
        const adminEmail = req.headers.get("x-admin-email");

        if (!adminEmail) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const requester = await User.findOne({ email: adminEmail });
        if (!requester || requester.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        const users = await User.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ users });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
