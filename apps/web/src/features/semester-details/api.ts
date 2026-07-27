import { api } from "~/trpc/react";

export const useGetAllUnits = (subjectId?: string) => {
	return api.courses.getUnitsBySubjectId.useQuery(
		{ id: subjectId ?? "" },
		{ enabled: !!subjectId },
	);
};

export const useGetRemainingSemesters = (semesterId: string) => {
	return api.courses.getRemainingSemesters.useQuery(
		{ semesterId },
		{ enabled: !!semesterId },
	);
};
