import { authRouter } from "./auth/routes/auth-route";
import { contactRouter } from "./contact/routes/contact-route";
import { courseRouter } from "./courses/routes/course-route";
import { notesRouter } from "./notes/routes/notes-route";
import { notesDownloadRouter } from "./notes-download/routes/notes-download-route";
import { notesPaymentRouter } from "./notes-payment/routes/notes-payment-route";
import { notesPurchaseRouter } from "./notes-purchases/routes/notes-purchase-route";
import { pyqDownloadRouter } from "./pyq-download/routes/pyq-download-route";
import { pyqPaymentRouter } from "./pyq-payment/routes/pyq-payment-route";
import { pyqPurchaseRouter } from "./pyq-purchases/routes/pyq-purchases-route";
import { pyqRouter } from "./pyqs/routes/pyq-route";
import { createCallerFactory, createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	auth: authRouter,
	courses: courseRouter,
	notes: notesRouter,
	contact: contactRouter,
	pyqs: pyqRouter,
	notesPayment: notesPaymentRouter,
	notesPurchases: notesPurchaseRouter,
	notesDownload: notesDownloadRouter,
	pyqDownload: pyqDownloadRouter,
	pyqPayment: pyqPaymentRouter,
	pyqPurchases: pyqPurchaseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
