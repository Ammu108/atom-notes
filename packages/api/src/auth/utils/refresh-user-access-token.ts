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
	const user = await authService.refreshSession(db, refreshToken);

	if (!user) {
		return null;
	}

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
			maxAge: 5 * 60,
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
