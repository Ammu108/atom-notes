import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { BUCKET_NAME, TIGRIS_BASE_URL, tigris } from "./tigris";

function sanitizeFileName(fileName: string) {
	return fileName
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-zA-Z0-9.-]/g, "");
}

export async function uploadPdfToTigris(
	fileBuffer: Buffer,
	originalName: string,
): Promise<{ key: string; url: string }> {
	const sanitizedName = sanitizeFileName(originalName);

	const key = `notes/${randomUUID()}-${sanitizedName}`;

	await tigris.send(
		new PutObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
			Body: fileBuffer,
			ContentType: "application/pdf",
		}),
	);

	return {
		key,
		url: `${TIGRIS_BASE_URL}/${key}`,
	};
}

export async function deletePdfFromTigris(key: string): Promise<void> {
	await tigris.send(
		new DeleteObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
		}),
	);
}
