import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { sendWelcomeStaffEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
    try {
        // In simplified mode, we trust the requester's email passed in headers or body
        // Here we will blindly check if the claimed admin email exists in our DB as admin.

        // We expect the client to send { adminEmail, userId, action }
        // Or we verify the "Auth" header is just the email? 
        // Let's stick to the Body for simplicity in this flow.
        const { adminEmail, userId, action } = await req.json();

        if (!adminEmail || !userId || !action) return NextResponse.json({ error: "Bad Request" }, { status: 400 });

        await connectToDatabase();

        // RBAC Check (Trusting client provided email)
        const adminUser = await User.findOne({ email: adminEmail });
        if (!adminUser || adminUser.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
        }

        const targetUser = await User.findById(userId);
        if (!targetUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

        if (action === "approve") {
            targetUser.status = "approved";
            await targetUser.save();

            try {
                await sendWelcomeStaffEmail(targetUser.email);
            } catch (mailError) {
                console.error("Failed to send welcome email", mailError);
            }
        } else if (action === "reject") {
            targetUser.status = "rejected";
            await targetUser.save();
        }

        return NextResponse.json({ success: true, user: targetUser });

    } catch (error: any) {
        console.error("Approve staff error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
