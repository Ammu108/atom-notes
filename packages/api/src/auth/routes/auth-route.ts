import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { authRepository } from "../repositories/auth-repositary";
import { authService } from "../services/auth-service";
import { deleteUserSchema } from "../validators/auth-validator";

/**
 * Auth Router
 * API endpoints only - uses service for business logic
 */

export const authRouter = createTRPCRouter({
	getAllUsers: adminProcedure.query(async ({ ctx }) => {
		if (!ctx.session.user || ctx.session.user.role !== "ADMIN") {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "Only admins can view users.",
			});
		}

		const users = await authRepository.getAllUsers(ctx.db);
		return users;
	}),

	getUserDetails: adminProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			const userDetails = await authService.getUserDetails(ctx.db, input.id);

			if (!userDetails) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found.",
				});
			}

			return userDetails;
		}),

	deleteUser: adminProcedure
		.input(deleteUserSchema)
		.mutation(async ({ input, ctx }) => {
			if (ctx.session.user.id === input.id) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "You cannot delete your own account.",
				});
			}

			// Check if user exists using repository
			const userExist = await authRepository.findById(ctx.db, input.id);

			if (!userExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "User not found",
				});
			}

			// Delete user using repository
			return await authRepository.deleteById(ctx.db, input.id);
		}),
});
