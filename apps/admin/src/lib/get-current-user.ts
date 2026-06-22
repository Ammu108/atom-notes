import { verifyAccessToken } from "@repo/api/verifyToken";
import { cookies } from "next/headers";
import { env } from "~/env";

export async function getCurrentUser() {
	const token = (await cookies()).get("admin_access_token");
	const jwtSecret = env.ADMIN_JWT_SECRET;

	if (!token) {
		return null;
	}

	try {
		return await verifyAccessToken(token.value, jwtSecret);
	} catch {
		return null;
	}
}
