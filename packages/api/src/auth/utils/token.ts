import { createHash, randomBytes } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";

type TokenType = "admin" | "user";

export type AccessTokenPayload = {
	id: string;
	name: string;
	email: string;
	role: string;
	type: TokenType;
};

export async function signAccessToken(
	payload: AccessTokenPayload,
	secret: string,
) {
	const jwtSecret = new TextEncoder().encode(secret);

	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("15m")
		.sign(jwtSecret);
}

export async function verifyAccessToken(token: string, secret: string) {
	const jwtSecret = new TextEncoder().encode(secret);

	const { payload } = await jwtVerify(token, jwtSecret);
	return payload as AccessTokenPayload;
}

// Refresh token — opaque, stored as HttpOnly cookie
export function generateRefreshToken() {
	return randomBytes(64).toString("hex"); // 128 char hex string
}

export function hashRefreshToken(token: string) {
	return createHash("sha256").update(token).digest("hex"); // Hash the token for secure storage and comparison
}
