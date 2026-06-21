import { z } from "zod";

export const idSchema = z.string({ required_error: "Id is required" });
export type IdSchema = z.infer<typeof idSchema>;

export const nameSchema = z
	.string({ required_error: "Name is required" })
	.min(2, { message: "Name must be at least 2 characters long" })
	.max(100, { message: "Name cannot exceed 100 characters" });
export type NameSchema = z.infer<typeof nameSchema>;

export const emailSchema = z
	.string({ required_error: "Email is required" })
	.email({ message: "Invalid email address" });
export type EmailSchema = z.infer<typeof emailSchema>;

export const passwordSchema = z
	.string({ required_error: "Password is required" })
	.min(8, { message: "Password must be at least 8 characters long" });
export type PasswordSchema = z.infer<typeof passwordSchema>;

export const roleSchema = z.enum(["admin", "user"], {
	required_error: "Role is required",
});
export type RoleSchema = z.infer<typeof roleSchema>;
