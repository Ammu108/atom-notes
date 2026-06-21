import { createHash, randomBytes } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signAccessToken(
	userId: string,
	name: string,
	email: string,
	role: string,
) {
	return new SignJWT({ userId: userId, name, email, role })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("15m")
		.sign(JWT_SECRET);
}

export async function verifyAccessToken(token: string) {
	const { payload } = await jwtVerify(token, JWT_SECRET);
	return payload as {
		userId: string;
		name: string;
		email: string;
		role: string;
	};
}

// Refresh token — opaque, stored as HttpOnly cookie
export function generateRefreshToken() {
	return randomBytes(64).toString("hex"); // 128 char hex string
}

export function hashRefreshToken(token: string) {
	return createHash("sha256").update(token).digest("hex"); // Hash the token for secure storage and comparison
}
