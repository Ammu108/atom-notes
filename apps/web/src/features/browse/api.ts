import { toast } from "sonner";
import { api } from "~/trpc/react";

export const useGetAllNotes = () => {
	return api.notes.getAllNotes.useQuery();
};

export const useGetAllCourses = () => {
	return api.courses.getAllCourses.useQuery();
};

export const useGetAllSemesters = (courseId?: string) => {
	return api.courses.getSemestersByCourseId.useQuery(
		{ id: courseId ?? "" },
		{ enabled: !!courseId },
	);
};

export const useGetAllSubjects = (semesterId?: string) => {
	return api.courses.getSubjectsBySemesterId.useQuery(
		{ id: semesterId ?? "" },
		{ enabled: !!semesterId },
	);
};

export const useGetAllUnits = (subjectId?: string) => {
	return api.courses.getUnitsBySubjectId.useQuery(
		{ id: subjectId ?? "" },
		{ enabled: !!subjectId },
	);
};

export const useGetNotesById = (noteId: string) => {
	return api.notes.getNoteById.useQuery({ id: noteId });
};

export const useDeleteNote = () => {
	const utils = api.useUtils();

	return api.notes.deleteNote.useMutation({
		onSuccess: async (data) => {
			await utils.notes.invalidate();
			toast.success(data.message);
		},
		onError: (error) => {
			console.error("Error deleting course:", error);
			toast.error(error.message);
		},
	});
};
