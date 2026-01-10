import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean filename: remove spaces, special chars
        const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const relativePath = `/assets/Menu/${Date.now()}_${filename}`;

        // Ensure path exists
        const uploadDir = path.join(process.cwd(), "public", "assets", "Menu");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // ignore if exists
        }

        const fullPath = path.join(process.cwd(), "public", relativePath);

        await writeFile(fullPath, buffer);

        return NextResponse.json({ path: relativePath });
    } catch (error) {
        console.error("Upload failed", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
