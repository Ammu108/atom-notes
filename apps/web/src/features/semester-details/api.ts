import { api } from "~/trpc/react";

export const useGetSemesterOverview = ({
	courseSlug,
	semesterNumber,
}: {
	courseSlug: string;
	semesterNumber: number;
}) => {
	return api.courses.getSmesterOverviewById.useQuery(
		{ courseSlug, semesterNumber },
		{ enabled: !!courseSlug && !!semesterNumber },
	);
};

export const useGetAllSemestersByCourse = () => {
	return api.courses.getAllSemestersByCourse.useQuery();
};

export const useGetAllSubjectsBySemesterId = ({
	courseSlug,
	semesterNumber,
}: {
	courseSlug: string;
	semesterNumber: number;
}) => {
	return api.courses.getAllSubjectsBySemesterId.useQuery(
		{ courseSlug, semesterNumber },
		{ enabled: !!courseSlug && !!semesterNumber },
	);
};
