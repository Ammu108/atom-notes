import { contactSchema } from "@repo/validators";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	adminProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "../../trpc";
import { contactRepository } from "../repositories/contact-repository";
import { contactService } from "../services/contact-service";

export const contactRouter = createTRPCRouter({
	create: protectedProcedure
		.input(contactSchema)
		.mutation(async ({ ctx, input }) => {
			await contactService.create(
				{
					...input,
					userId: ctx.user.id,
				},
				ctx.db,
			);
			return { message: "Your message has been submitted successfully!" };
		}),

	getAllContacts: protectedProcedure.query(async ({ ctx }) => {
		const contacts = await contactRepository.getAll(ctx.db);
		return contacts;
	}),

	getContactById: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const result = await contactRepository.getById(ctx.db, input.id);

			if (!result) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Contact not found",
				});
			}

			return result;
		}),

	delete: protectedProcedure
		.input(z.string().uuid())
		.mutation(async ({ ctx, input }) => {
			await contactService.deleteById(input, ctx.db);
			return { message: "Contact deleted successfully!" };
		}),
});
