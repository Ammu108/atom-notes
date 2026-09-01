import { generateSlug } from "@repo/shared";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
	adminProcedure,
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "../../trpc";
import { notesRepository } from "../repositories/notes-repositary";
import { notesService } from "../services/notes-service";
import { noteIdSchema, notesSchema } from "../validators/notes-validators";

export const notesRouter = createTRPCRouter({
	createNote: publicProcedure
		.input(notesSchema)
		.mutation(async ({ input, ctx }) => {
			// admin check
			if (!ctx.session?.user || ctx.session.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can create notes!",
				});
			}

			// check if unit exists
			const isUnitExist = await ctx.db.query.unit.findFirst({
				where: (unit, { eq }) => eq(unit.id, input.unitId),
			});

			if (!isUnitExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Unit not found!",
				});
			}

			const slug = generateSlug(input.title);

			// duplicate check by slug and unitId
			const existingNote = await notesRepository.findNoteBySlugAndUnitId(
				ctx.db,
				slug,
				input.unitId,
			);

			if (existingNote) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Note already exists!",
				});
			}

			const notes = await notesService.createNotes(input, ctx.db);

			return notes;
		}),

	UpdateNote: publicProcedure
		.input(notesSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.session?.user || ctx.session.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can update notes!",
				});
			}

			// note exist or not
			const isNoteExist = await ctx.db.query.notes.findFirst({
				where: (note, { eq }) => eq(note.id, input.id),
			});

			if (!isNoteExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Note not found!",
				});
			}

			// check if unit exists
			const isUnitExist = await ctx.db.query.unit.findFirst({
				where: (unit, { eq }) => eq(unit.id, input.unitId),
			});

			if (!isUnitExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Unit not found!",
				});
			}

			const slug = generateSlug(input.title);

			// duplicate check by slug and unitId
			const existingNote = await notesRepository.findNoteBySlugAndUnitId(
				ctx.db,
				slug,
				input.unitId,
			);

			if (existingNote && existingNote.id !== input.id) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Note already exists!",
				});
			}

			const notes = await notesService.updateNote(input, ctx.db, input.id);

			return {
				message: "Note updated successfully!",
				notes,
			};
		}),

	getAllNotesAdmin: publicProcedure.query(async ({ ctx }) => {
		const notes = await notesRepository.getAllNotes(ctx.db);

		return notes;
	}),

	getAllNotes: publicProcedure
		.input(
			z.object({
				search: z.string().optional(),
				course: z.string().optional(),
				semester: z.string().optional(),
				subject: z.string().optional(),
			}),
		)
		.query(async ({ input, ctx }) => {
			const notes = await notesRepository.getAllNotes(ctx.db, input);

			return notes;
		}),

	getPurchasedNotesByUserId: protectedProcedure
		.input(z.object({ id: z.string().optional() }))
		.query(async ({ input, ctx }) => {
			const notes = await notesRepository.getPurchasedNotesByUserId(
				ctx.db,
				input.id,
			);

			return notes;
		}),

	getNoteById: publicProcedure
		.input(noteIdSchema)
		.query(async ({ input, ctx }) => {
			const notes = await notesRepository.getNotesById(ctx.db, input.id);

			if (!notes) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Note not found!",
				});
			}

			return notes;
		}),

	getNoteBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ input, ctx }) => {
			const userId = ctx.session?.user?.id;
			const notes = await notesRepository.getNotesBySlug(
				ctx.db,
				userId,
				input.slug,
			);

			if (!notes) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Note not found!",
				});
			}

			return notes;
		}),

	getStatsById: adminProcedure
		.input(noteIdSchema)
		.query(async ({ input, ctx }) => {
			const analytics = await notesRepository.getStats(ctx.db, input.id);

			return analytics;
		}),

	deleteNote: adminProcedure
		.input(noteIdSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.session?.user || ctx.session.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can delete notes!",
				});
			}

			const deleteNote = await notesRepository.deleteNote(ctx.db, input.id);

			return deleteNote;
		}),
});
