import { uploadPdfToTigris } from "@repo/api";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("pdf") as File | null;

		if (!file) {
			return Response.json({ error: "No PDF file provided" }, { status: 400 });
		}

		if (file.type !== "application/pdf") {
			return Response.json(
				{ error: "Only PDF files are allowed" },
				{ status: 400 },
			);
		}

		const MAX_SIZE = 50 * 1024 * 1024; // 50MB
		if (file.size > MAX_SIZE) {
			return Response.json(
				{ error: "File too large (max 50MB)" },
				{ status: 400 },
			);
		}

		// ── 3. Upload to Tigris ────────────────────────────────────────
		const buffer = Buffer.from(await file.arrayBuffer());
		const { key, url } = await uploadPdfToTigris(buffer, file.name);

		return Response.json({ key, url });
	} catch (err) {
		console.error("[upload-pdf] error:", err);
		return Response.json({ error: "Upload failed" }, { status: 500 });
	}
}

// Disable body parsing — we handle it ourselves via formData()
export const runtime = "nodejs";
