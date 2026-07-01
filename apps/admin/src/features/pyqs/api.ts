import { toast } from "sonner";
import { api } from "~/trpc/react";

export const useGetAllPyqs = () => {
	return api.pyqs.getAllPyqs.useQuery();
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

export const useGetPyqsById = (pyqId: string) => {
	return api.pyqs.getPyqsById.useQuery({ id: pyqId });
};

export const useDeletePyqs = () => {
	const utils = api.useUtils();

	return api.pyqs.deletePyq.useMutation({
		onSuccess: async (data) => {
			await utils.pyqs.invalidate();
			toast.success(data.message);
		},
		onError: (error) => {
			console.error("Error deleting pyq:", error);
			toast.error(error.message);
		},
	});
};
