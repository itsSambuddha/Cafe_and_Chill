import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Sale from "@/models/Sale";
import { convertToCSV } from "@/lib/csv";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await Sale.find({}).sort({ createdAt: -1 }).lean();

        const cleanData = items.map((item: any) => ({
            Date: item.createdAt ? new Date(item.createdAt).toLocaleString() : "",
            Total_Amount: item.totalAmount,
            Payment_Method: item.paymentMethod,
            Source: item.paymentSource,
            Staff_ID: item.staffUserId,
            Notes: item.notes || "",
        }));

        const csv = convertToCSV(cleanData);

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="sales_export.csv"`,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
