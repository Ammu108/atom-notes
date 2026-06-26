import path from "node:path";
import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
	path: path.resolve(process.cwd(), "../../.env"),
});

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),

		// ✅ Add admin envs
		ADMIN_NAME: z.string().min(1),
		ADMIN_EMAIL: z.string().email(),
		ADMIN_PASSWORD: z.string().min(6),

		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,

		// ✅ Map runtime values
		ADMIN_NAME: process.env.ADMIN_NAME,
		ADMIN_EMAIL: process.env.ADMIN_EMAIL,
		ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

		NODE_ENV: process.env.NODE_ENV,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
