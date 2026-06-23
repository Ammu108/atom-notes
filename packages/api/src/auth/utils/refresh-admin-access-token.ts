import type { DB } from "@repo/db";
import { serialize } from "cookie";
import { authAdminService } from "../services/auth-admin-service";
import { signAccessToken } from "./token";

export async function refreshAdminToken(
	refreshToken: string,
	db: DB,
	jwtSecret: string,
	resHeaders: Headers,
) {
	const admin = await authAdminService.refreshSession(db, refreshToken);

	if (!admin) {
		return null;
	}

	const accessToken = await signAccessToken(
		{
			id: admin.id,
			name: admin.name,
			email: admin.email,
			role: admin.role,
			type: "admin",
		},
		jwtSecret,
	);

	resHeaders.append(
		"set-cookie",
		serialize("admin_access_token", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 5 * 60,
		}),
	);

	return {
		id: admin.id,
		name: admin.name,
		email: admin.email,
		role: admin.role,
		type: "admin",
	};
}
