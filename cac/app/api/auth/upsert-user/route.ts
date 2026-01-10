import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { uid, email, displayName } = body;
        console.log("👉 [API] Upsert Request Received:", { email, uid, displayName });

        if (!uid || !email) {
            console.error("❌ [API] Missing uid or email");
            return NextResponse.json({ error: "Missing uid or email" }, { status: 400 });
        }

        console.log("👉 [API] Connecting to Database...");
        await connectToDatabase();
        console.log("✅ [API] Database Connected");

        let user = await User.findOne({ firebaseUid: uid });
        console.log("👉 [API] Existing User Found:", user ? "YES" : "NO");

        // Check against hardcoded admin emails
        const adminEmails = (process.env.ADMIN_EMAIL || "").split(",").map(e => e.trim().toLowerCase());
        const isAdmin = adminEmails.includes(email.toLowerCase());
        console.log("👉 [API] Is Admin?", isAdmin);

        if (!user) {
            console.log(`👉 [API] Creating new user for ${email}`);
            user = await User.create({
                firebaseUid: uid,
                email,
                displayName: displayName || "New User",
                role: isAdmin ? "admin" : "staff",
                status: isAdmin ? "approved" : "pending",
            });
            console.log("✅ [API] User Created:", user);
        } else {
            // Sync Admin status if env var changed
            if (isAdmin && user.role !== 'admin') {
                console.log(`👉 [API] Promoting ${email} to admin based on ENV.`);
                user.role = 'admin';
                user.status = 'approved';
                await user.save();
                console.log("✅ [API] User Promoted to Admin");
            }
        }

        return NextResponse.json({ user });
    } catch (error: any) {
        console.error("❌ [API] Upsert user error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
