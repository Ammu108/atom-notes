"use client";

import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useCourseCreation() {
	const utils = api.useUtils();
	return api.courses.createCourse.useMutation({
		onSuccess: async (data) => {
			await utils.courses.invalidate();
			toast.success(data.message);
		},
		onError: (error) => {
			console.error("Error creating course:", error);
			toast.error(error.message);
		},
	});
}

export function useCourseUpdate() {
	const utils = api.useUtils();

	return api.courses.updateCourse.useMutation({
		onSuccess: async (data) => {
			await utils.courses.invalidate();
			toast.success(data.message);
		},
		onError: (error) => {
			console.error("Error updating course:", error);
			toast.error(error.message);
		},
	});
}

export function useDeleteCourse() {
	const utils = api.useUtils();

	return api.courses.deleteCourse.useMutation({
		onSuccess: async (data) => {
			await utils.courses.invalidate();
			toast.success(data.message);
		},
		onError: (error) => {
			console.error("Error deleting course:", error);
			toast.error(error.message);
		},
	});
}
