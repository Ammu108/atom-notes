import { authRouter } from "./auth/routes/auth-route";
import { contactRouter } from "./contact/routes/contact-route";
import { courseRouter } from "./courses/routes/course-route";
import { notesRouter } from "./notes/routes/notes-route";
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
