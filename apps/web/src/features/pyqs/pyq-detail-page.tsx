"use client";

import PdfViewer from "~/components/pdf/pdf-viewer";
import PyqDetailHeader from "./_components/pyq-detail-header";
import PyqDetailSidebar from "./_components/pyq-detail-sidebar";
import PyqDetailSkeleton from "./_components/pyq-detail-skeleton";
import { useGetPyqsById } from "./api";

const PyqDetailPage = ({ id }: { id: string }) => {
	const { data: pyq, isLoading } = useGetPyqsById(id);

	if (isLoading) {
		return <PyqDetailSkeleton />;
	}

	console.log("PYQ URL", pyq?.pdfUrl);

	if (!pyq) {
		return (
			<div className="w-full pt-20 md:pt-24">
				<div className="rounded-xl border border-destructive bg-destructive/10 p-4">
					<p className="text-center font-medium text-base text-destructive">
						PYQ not found.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full pt-20 md:pt-24">
			<PyqDetailHeader
				course={pyq.course}
				questionsCount={pyq.questionCount}
				semester={pyq.semester}
				subject={pyq.subjectName}
				title={pyq.title}
				year={pyq.year}
			/>
			<div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
				{/* <DetailedPyqSection question={pyq.questions} /> */}
				{pyq.pdfUrl ? (
					<PdfViewer src={pyq.pdfUrl} />
				) : (
					<div className="rounded-xl border p-4 text-center text-muted-foreground text-sm">
						No PDF available for this PYQ.
					</div>
				)}

				{/* h-fit prevents grid stretch; top-24 adjusts sticky offset */}
				<div className="sticky top-24 h-fit">
					<PyqDetailSidebar
						course={pyq.course}
						hasPurchased={pyq.hasPurchased}
						isPaid={pyq.isPaid}
						price={pyq.price}
						pyqId={pyq.id}
						semester={pyq.semester}
						subject={pyq.subjectName}
						year={pyq.year}
					/>
				</div>
			</div>
		</div>
	);
};

export default PyqDetailPage;
