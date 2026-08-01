"use client";

import { Separator } from "~/components/ui/separator";
import PyqDetailHeader from "./_components/pyq-detail-header";
import DetailedPyqSection from "./_components/pyq-detail-questions";
import PyqDetailSidebar from "./_components/pyq-detail-sidebar";
import PyqDetailSkeleton from "./_components/pyq-detail-skeleton";
import { useGetPyqsById } from "./api";

const PyqDetailPage = ({ id }: { id: string }) => {
	const { data: pyq, isLoading } = useGetPyqsById(id);

	if (isLoading) {
		return <PyqDetailSkeleton />;
	}

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
			<Separator />
			<div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
				<DetailedPyqSection question={pyq.questions} />

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
