import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "../shared";

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema,
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
