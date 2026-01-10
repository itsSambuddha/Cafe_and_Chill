import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import InventoryItem from "@/models/InventoryItem";
import Expense from "@/models/Expense";
import Sale from "@/models/Sale";
import User from "@/models/User";

export async function GET() {
    try {
        await connectToDatabase();

        const [
            menuCount,
            inventoryLowCount,
            pendingStaffCount,
            expenses,
            sales
        ] = await Promise.all([
            MenuItem.countDocuments(),
            InventoryItem.countDocuments({ $expr: { $lte: ["$quantity", "$reorderThreshold"] } }),
            User.countDocuments({ status: "pending" }),
            Expense.find({}, { amount: 1 }), // optimize projection
            Sale.find({}, { totalAmount: 1 }),
        ]);

        const totalExpenses = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
        const totalSales = sales.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
        const netProfit = totalSales - totalExpenses;

        return NextResponse.json({
            menuCount,
            inventoryLowCount,
            pendingStaffCount,
            totalExpenses,
            totalSales,
            netProfit
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
