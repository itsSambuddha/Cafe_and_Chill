import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Expense from "@/models/Expense";
import { convertToCSV } from "@/lib/csv";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await Expense.find({}).sort({ date: -1 }).lean();

        const cleanData = items.map((item: any) => ({
            Title: item.title,
            Category: item.category,
            Amount: item.amount,
            Date: item.date ? new Date(item.date).toLocaleDateString() : "",
            Payment_Method: item.paymentMethod || "",
            Notes: item.notes || "",
        }));

        const csv = convertToCSV(cleanData);

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="expenses_export.csv"`,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
