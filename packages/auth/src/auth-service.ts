import { type DB, users } from "@repo/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import type z from "zod";
import type { signupSchema } from "./schema/signup-schema";

export const authService = {
	async signUp(input: z.infer<typeof signupSchema>, db: DB) {
		if (input.password.length < 6) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Password must be at least 6 characters long.",
			});
		}

		const hashedPassword = await bcrypt.hash(input.password, 10);

		const user = await db
			.insert(users)
			.values({
				name: input.name,
				email: input.email,
				password: hashedPassword,
			})
			.returning();

		return user[0];
	},

	async login(email: string, password: string, db: DB) {
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			user[0]?.password || "",
		);

		if (!isPasswordValid) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Invalid email or password. Please try again.",
			});
		}

		return user[0];
	},
};
