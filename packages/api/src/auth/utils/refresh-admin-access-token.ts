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
	const result = await authAdminService.rotateSession(db, refreshToken);

	if (!result) {
		return null;
	}

	const { admin, refreshToken: newRefreshToken } = result;

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
			maxAge: 15 * 60, // 15 min
		}),
	);

	resHeaders.append(
		"set-cookie",
		serialize("admin_refresh_token", newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 30 * 24 * 60 * 60, // 30 days
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
