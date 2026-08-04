import {
	contacts,
	type DB,
	notes,
	notesPurchases,
	pyqPurchases,
	user,
} from "@repo/db";
import { eq } from "drizzle-orm";

/**
 * Auth Repository
 * ONLY database communication - no business logic
 */

export const authRepository = {
	async findUserById(db: DB, userId: string) {
		const result = await db
			.select()
			.from(user)
			.where(eq(user.id, userId))
			.limit(1);

		return result[0];
	},
	/**
	 * Find user by email
	 */
	async findByEmail(db: DB, email: string) {
		const result = await db
			.select()
			.from(user)
			.where(eq(user.email, email))
			.limit(1);

		return result[0] || null;
	},

	/**
	 * Find user by ID
	 */
	async findById(db: DB, id: string) {
		const result = await db.select().from(user).where(eq(user.id, id)).limit(1);

		return result[0] || null;
	},

	async findUserDetailsById(db: DB, id: string) {
		const result = await db
			.select({
				id: user.id,
				emailVerified: user.emailVerified,
				name: user.name,
				email: user.email,
				amount: notesPurchases.amount,
				status: notesPurchases.status,
				purchaseId: notesPurchases.id,
				purchasedAt: notesPurchases.createdAt,
				noteId: notes.id,
				noteTitle: notes.title,
				createdAt: user.createdAt,
			})
			.from(user)
			.leftJoin(notesPurchases, eq(user.id, notesPurchases.userId))
			.leftJoin(notes, eq(notesPurchases.noteId, notes.id))
			.where(eq(user.id, id));

		console.log("FIND USER DETAILS BY ID RESULT: ", id);

		return result;
	},

	async getAllUsers(db: DB) {
		const result = await db.select().from(user);
		return result;
	},

	async getUserDetails(db: DB, id: string) {
		const result = await db
			.select({
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified,
				createdAt: user.createdAt,
			})
			.from(user)
			.where(eq(user.id, id))
			.limit(1);

		return result[0] || null;
	},

	async getUserStats(db: DB, id: string) {
		const [notesPurchase, pyqPurchase, totalSupport] = await Promise.all([
			db
				.select({
					status: notesPurchases.status,
					amount: notesPurchases.amount,
				})
				.from(notesPurchases)
				.where(eq(notesPurchases.userId, id)),
			db
				.select({ status: pyqPurchases.status, amount: pyqPurchases.amount })
				.from(pyqPurchases)
				.where(eq(pyqPurchases.userId, id)),
			db
				.select({ id: contacts.id })
				.from(contacts)
				.where(eq(contacts.userId, id)),
		]);

		const paidNotesPurchases = notesPurchase.filter(
			(purchase) => purchase.status === "PAID",
		);
		const pendingNotesPurchases = notesPurchase.filter(
			(purchase) => purchase.status === "PENDING",
		);

		const paidPyqPurchases = pyqPurchase.filter(
			(purchase) => purchase.status === "PAID",
		);
		const pendingPyqPurchases = pyqPurchase.filter(
			(purchase) => purchase.status === "PENDING",
		);

		const totalSpent =
			paidNotesPurchases.reduce(
				(sum, purchase) => sum + Number(purchase.amount ?? 0),
				0,
			) +
			paidPyqPurchases.reduce(
				(sum, purchase) => sum + Number(purchase.amount ?? 0),
				0,
			);

		const totalPurchases = paidNotesPurchases.length + paidPyqPurchases.length;
		const totalPendingPurchases =
			pendingNotesPurchases.length + pendingPyqPurchases.length;

		return {
			totalPurchases,
			totalPendingPurchases,
			totalSpent,
			totalSupport: totalSupport.length,
		};
	},

	async getUserSupportById(db: DB, id: string) {
		const result = await db
			.select({
				id: contacts.id,
				name: contacts.name,
				email: contacts.email,
				subject: contacts.subject,
				message: contacts.message,
				createdAt: contacts.createdAt,
			})
			.from(contacts)
			.innerJoin(user, eq(contacts.userId, user.id))
			.where(eq(contacts.userId, id));

		return result;
	},

	async deleteById(db: DB, id: string) {
		await db.delete(user).where(eq(user.id, id));
		return true;
	},
};
