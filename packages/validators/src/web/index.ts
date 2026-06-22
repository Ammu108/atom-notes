import { z } from "zod";
import {
	emailSchema,
	messageSchema,
	nameSchema,
	passwordSchema,
	subjectSchema,
} from "../shared";

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

export const contactSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	subject: subjectSchema,
	message: messageSchema,
});

export type ContactSchema = z.infer<typeof contactSchema>;
