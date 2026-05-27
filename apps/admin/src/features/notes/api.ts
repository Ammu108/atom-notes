import { api } from "~/trpc/react";

export const useGetAllCourses = () => {
	return api.courses.getAllCourses.useQuery();
};

export const useGetAllSemesters = (courseId?: string) => {
	return api.courses.getCourseById.useQuery(
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
