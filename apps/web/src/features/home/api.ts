import { api } from "~/trpc/react";

export const useGetAllSemesterDetails = () => {
	return api.courses.getAllSemestersAndResources.useQuery();
};

export const useGetAllSemesters = () => {
	return api.courses.getAllSemestersByCourse.useQuery();
};
