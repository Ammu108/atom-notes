import { FileText } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import PdfUploader from "~/components/pdf-uploader";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface pyqQuestionPdfUploaderProps {
	pdfFile: File | null;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isPaid: boolean;
	setIsPaid: Dispatch<SetStateAction<boolean>>;
	setPrice: Dispatch<SetStateAction<number>>;
	price: number;
	existingPdfUrl?: string | null;
	existingPdfKey?: string | null;
}

const PyqQuestionPdfUploader = ({
	pdfFile,
	onFileChange,
	existingPdfUrl,
	existingPdfKey,
}: pyqQuestionPdfUploaderProps) => {
	return (
		<div>
			<CardHeader className="px-5 py-4">
				<div className="flex items-center gap-2">
					<FileText className="h-4 w-4 text-muted-foreground" />
					<CardTitle className="font-semibold text-sm">
						Upload Question Paper PDF
					</CardTitle>
				</div>
			</CardHeader>

			<CardContent className="flex-1">
				<PdfUploader
					existingPdfKey={existingPdfKey}
					existingPdfUrl={existingPdfUrl}
					onFileChange={onFileChange}
					pdfFile={pdfFile}
				/>
			</CardContent>
		</div>
	);
};

export default PyqQuestionPdfUploader;
