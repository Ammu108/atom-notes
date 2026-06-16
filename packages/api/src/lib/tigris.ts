import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId = process.env.TIGRIS_ACCESS_KEY;
const secretAccessKey = process.env.TIGRIS_SECRET_KEY;
const endpoint = process.env.TIGRIS_ENDPOINT_URL;

if (!accessKeyId || !secretAccessKey || !endpoint) {
	throw new Error("Missing required Tigris/S3 environment variables.");
}

export const tigris = new S3Client({
	region: process.env.TIGRIS_REGION || "auto",
	endpoint: endpoint,
	forcePathStyle: true,
	credentials: {
		accessKeyId: accessKeyId,
		secretAccessKey: secretAccessKey,
	},
});

export const BUCKET_NAME = process.env.TIGRIS_BUCKET_NAME;
export const TIGRIS_BASE_URL = `https://${process.env.TIGRIS_BUCKET_NAME}.fly.storage.tigris.dev`;
