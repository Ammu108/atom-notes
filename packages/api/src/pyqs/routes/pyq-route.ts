import { pyqsFormSchema, updatePyqSchema } from "@repo/validators";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../../trpc";
import { pyqRepository } from "../repositories/pyqs-repository";
import { pyqService } from "../services/pyq-service";

export const pyqRouter = createTRPCRouter({
	createPyq: adminProcedure
		.input(pyqsFormSchema)
		.mutation(async ({ input, ctx }) => {
			// admin check
			if (!ctx.session?.user || ctx.session.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can create notes!",
				});
			}

			const result = await pyqService.createPyq(input, ctx.db);

			return {
				message: "Pyq created successfully.",
				pyq: result,
			};
		}),

	updatePyq: adminProcedure
		.input(updatePyqSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.session?.user || ctx.session.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can update notes!",
				});
			}

			const result = await pyqService.updatePyq(input, ctx.db);

			return {
				message: "Pyq updated successfully.",
				pyq: result,
			};
		}),

	getAllPyqs: publicProcedure.query(async ({ ctx }) => {
		const pyqs = await pyqRepository.getAllPyqs(ctx.db);

		if (!pyqs) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Pyq not found!",
			});
		}

		return pyqs;
	}),

	getPyqsById: adminProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const pyqs = await pyqRepository.getPyqsById(ctx.db, input.id);

			if (!pyqs) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Pyq not found!",
				});
			}

			return pyqs;
		}),

	deletePyq: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.session?.user || ctx.session.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can delete notes!",
				});
			}

			const deleteNote = await pyqRepository.deletePyq(ctx.db, input.id);

			return deleteNote;
		}),
});
