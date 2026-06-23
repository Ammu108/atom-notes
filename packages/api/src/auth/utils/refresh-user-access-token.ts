import type { DB } from "@repo/db";
import { serialize } from "cookie";
import { authService } from "../services/auth-service";
import { signAccessToken } from "./token";

export async function refreshUserToken(
	refreshToken: string,
	db: DB,
	jwtSecret: string,
	resHeaders: Headers,
) {
	const result = await authService.rotateSession(db, refreshToken);

	if (!result) {
		return null;
	}

	const { user, refreshToken: newRefreshToken } = result;

	const accessToken = await signAccessToken(
		{
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			type: "user",
		},
		jwtSecret,
	);

	resHeaders.append(
		"set-cookie",
		serialize("user_access_token", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 15 * 60, // 15 min
		}),
	);

	resHeaders.append(
		"set-cookie",
		serialize("user_refresh_token", newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 30 * 24 * 60 * 60, // 30 days
		}),
	);

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		type: "user",
	};
}
