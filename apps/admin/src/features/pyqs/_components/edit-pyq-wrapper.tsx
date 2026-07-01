"use client";

import { useGetPyqsById } from "../api";
import CreatePyqForm from "./create-pyq-form";

interface EditNotesWrapperProps {
	pyqId: string;
}

export default function EditPyqWrapper({ pyqId }: EditNotesWrapperProps) {
	const { data: pyq, isPending, isError } = useGetPyqsById(pyqId);

	if (isPending) return <div className="py-8 text-center">Loading pyq...</div>;
	if (isError)
		return (
			<div className="py-8 text-center text-red-500">Error loading pyq.</div>
		);

	return <CreatePyqForm pyq={pyq} pyqId={pyqId} />;
}
