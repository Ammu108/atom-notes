import { generateSlug } from "@repo/shared";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { notesRepository } from "../repositories/notes-repositary";
import { notesService } from "../services/notes-service";
import { noteIdSchema, notesSchema } from "../validators/notes-validators";

export const notesRouter = createTRPCRouter({
	createNote: publicProcedure
		.input(notesSchema)
		.mutation(async ({ input, ctx }) => {
			// admin check
			if (!ctx.user || ctx.user.role !== "admin") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can create notes!",
				});
			}

			// check if unit exists
			const isUnitExist = await ctx.db.query.chapters.findFirst({
				where: (chapter, { eq }) => eq(chapter.id, input.chapterId),
			});

			if (!isUnitExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Unit not found!",
				});
			}

			const slug = generateSlug(input.title);

			// duplicate check by slug and chapterId
			const existingNote = await notesRepository.findNoteBySlugAndChapterId(
				ctx.db,
				slug,
				input.chapterId,
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
			if (!ctx.user || ctx.user.role !== "admin") {
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
			const isUnitExist = await ctx.db.query.chapters.findFirst({
				where: (chapter, { eq }) => eq(chapter.id, input.chapterId),
			});

			if (!isUnitExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Unit not found!",
				});
			}

			const slug = generateSlug(input.title);

			// duplicate check by slug and chapterId
			const existingNote = await notesRepository.findNoteBySlugAndChapterId(
				ctx.db,
				slug,
				input.chapterId,
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
			const notes = await notesRepository.getNotesBySlug(ctx.db, input.slug);

			if (!notes) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Note not found!",
				});
			}

			return notes;
		}),

	deleteNote: publicProcedure
		.input(noteIdSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.user || ctx.user.role !== "admin") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can delete notes!",
				});
			}

			const deleteNote = await notesRepository.deleteNote(ctx.db, input.id);

			return deleteNote;
		}),
});
