import { api } from "~/trpc/react";

export const useGetAllNotes = ({
	search,
	course,
	sem,
	sub,
}: {
	search?: string;
	course?: string;
	sem?: string;
	sub?: string;
}) => {
	return api.notes.getAllNotes.useQuery({
		search,
		course,
		semester: sem,
		subject: sub,
	});
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

export const useGetNotesById = (noteId: string) => {
	return api.notes.getNoteById.useQuery({ id: noteId });
};
