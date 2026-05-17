import z from "zod";

export const signupSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(256, "Name must be at most 256 characters"),
	role: z.enum(["user", "admin"]).default("user"),
	email: z.string().email(),
	password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const deleteUserSchema = z.object({
	id: z.string().uuid(), // Ensures the frontend sends a valid UUID
});
