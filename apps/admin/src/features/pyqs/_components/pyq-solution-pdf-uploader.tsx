import { FileText } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import PdfUploader from "~/components/pdf-uploader";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";

interface pyqSolutionPdfUploaderProps {
	pdfFile: File | null;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isPaid: boolean;
	setIsPaid: Dispatch<SetStateAction<boolean>>;
	setPrice: Dispatch<SetStateAction<number>>;
	price: number;
	existingPdfUrl?: string | null;
	existingPdfKey?: string | null;
}

const PyqSolutionPdfUploader = ({
	pdfFile,
	onFileChange,
	isPaid,
	setIsPaid,
	setPrice,
	price,
	existingPdfUrl,
	existingPdfKey,
}: pyqSolutionPdfUploaderProps) => {
	return (
		<div>
			<CardHeader className="px-5 py-4">
				<div className="flex items-center gap-2">
					<FileText className="h-4 w-4 text-muted-foreground" />
					<CardTitle className="font-semibold text-sm">
						Upload Solution PDF
					</CardTitle>
				</div>
			</CardHeader>

			<CardContent className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
				<PdfUploader
					existingPdfKey={existingPdfKey}
					existingPdfUrl={existingPdfUrl}
					onFileChange={onFileChange}
					pdfFile={pdfFile}
				/>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between rounded-lg border border-input px-4 py-3 dark:bg-input/30">
						<div>
							<p className="font-medium text-muted-foreground text-sm">Paid?</p>
						</div>

						<Switch checked={isPaid} id="isPaid" onCheckedChange={setIsPaid} />
					</div>

					<div className="flex flex-col gap-4">
						<div className="rounded-lg border border-input p-4 dark:bg-input/30">
							<p className="mb-2 font-medium text-muted-foreground text-sm">
								Price (INR)
							</p>

							<Input
								className="h-11 rounded-lg border border-input px-4 text-sm dark:bg-input/30"
								disabled={!isPaid}
								min="0"
								onChange={(e) => setPrice(Number(e.target.value))}
								placeholder="49"
								type="number"
								value={price}
							/>
						</div>
					</div>

					<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
						Automatic watermark protection will be applied to the PDF.
					</div>
				</div>
			</CardContent>
		</div>
	);
};

export default PyqSolutionPdfUploader;
