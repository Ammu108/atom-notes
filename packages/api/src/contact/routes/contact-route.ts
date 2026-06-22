import { contactSchema } from "@repo/validators";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { contactRepository } from "../repositories/contact-repository";
import { contactService } from "../services/contact-service";

export const contactRouter = createTRPCRouter({
	create: protectedProcedure
		.input(contactSchema)
		.mutation(async ({ ctx, input }) => {
			await contactService.create(input, ctx.db);
			return { message: "Your message has been submitted successfully!" };
		}),

	getAllContacts: protectedProcedure.query(async ({ ctx }) => {
		const contacts = await contactRepository.getAll(ctx.db);
		return contacts;
	}),
});
