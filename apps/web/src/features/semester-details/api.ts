import { api } from "~/trpc/react";

export const useGetSemesterOverview = (semesterId: string) => {
	return api.courses.getSmesterOverviewById.useQuery(
		{ semesterId },
		{ enabled: !!semesterId },
	);
};

export const useGetAllSemestersByCourse = () => {
	return api.courses.getAllSemestersByCourse.useQuery();
};

export const useGetAllSubjectsBySemesterId = (semesterId: string) => {
	return api.courses.getAllSubjectsBySemesterId.useQuery(
		{ semesterId },
		{ enabled: !!semesterId },
	);
};
