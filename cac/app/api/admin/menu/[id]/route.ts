import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import MenuItem from "@/models/MenuItem";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // In Next 15+ params should be awaited, checking Next 16 behavior. 
    // User context says Next.js 16. Params are promises in async layouts/pages, but route handlers receive params as 2nd arg.
    // Actually in Next 15/16 route handlers context param might be just an object or promise depending on configuration.
    // Safe bet: await params if it's a promise, or treat as object. The types say `params` is `unknown` or `any` in some versions?
    // Let's use standard signature.
) {
    const { id } = await params;
    try {
        const body = await request.json();
        await connectToDatabase();

        // ID in URL is the `id` field (custom slug), NOT _id.
        const updatedItem = await MenuItem.findOneAndUpdate({ id: id }, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(updatedItem);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectToDatabase();
        const deletedItem = await MenuItem.findOneAndDelete({ id: id });

        if (!deletedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Item deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
