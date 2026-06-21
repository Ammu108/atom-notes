import { verifyAccessToken } from "@repo/api/verifyToken";
import { cookies } from "next/headers";

export async function getCurrentUser() {
	const token = (await cookies()).get("access_token");

	if (!token) {
		return null;
	}

	try {
		return await verifyAccessToken(token.value);
	} catch {
		return null;
	}
}
