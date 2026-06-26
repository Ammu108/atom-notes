import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { authRepository } from "../repositories/auth-repositary";
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

	deleteUser: adminProcedure
		.input(deleteUserSchema)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.session.user || ctx.session.user.role !== "ADMIN") {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Only admins can delete users",
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
