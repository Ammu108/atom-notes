import { api } from "~/trpc/server";

export async function getCourseById(courseId: string) {
	return await api.courses.getCourseById({ id: courseId });
}
