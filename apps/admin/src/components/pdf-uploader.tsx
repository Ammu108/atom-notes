import { CloudUpload } from "lucide-react";
import { useMemo, useRef } from "react";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";

interface PdfUploaderProps {
	pdfFile: File | null;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	existingPdfUrl?: string | null;
	existingPdfKey?: string | null;
}

const PdfUploader = ({
	pdfFile,
	onFileChange,
	existingPdfUrl,
	existingPdfKey,
}: PdfUploaderProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const hasPdf = Boolean(pdfFile || existingPdfUrl);

	const displayFileName = useMemo(() => {
		if (pdfFile) {
			return pdfFile.name;
		}

		if (!existingPdfKey) {
			return null;
		}

		const fileName = existingPdfKey.split("/").pop() ?? existingPdfKey;

		return fileName.replace(/^[0-9a-f-]{36}-/, "");
	}, [pdfFile, existingPdfKey]);

	return (
		<div className="flex flex-col justify-between rounded-lg border border-input border-dashed p-4 dark:bg-input/30">
			<div className="mb-3 flex flex-row items-center justify-between">
				<Label className="font-medium text-muted-foreground text-sm">
					PDF Upload
				</Label>

				<Badge className="rounded-full bg-background" variant="secondary">
					PDF
				</Badge>
			</div>

			<input
				accept=".pdf"
				className="hidden"
				onChange={onFileChange}
				ref={fileInputRef}
				type="file"
			/>

			<button
				className="w-full"
				onClick={() => fileInputRef.current?.click()}
				type="button"
			>
				<div className="flex min-h-32 cursor-pointer items-center justify-center rounded-lg border border-input border-dashed p-4 text-center">
					{hasPdf ? (
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-11 w-11 items-center justify-center rounded-full bg-background">
								<CloudUpload className="h-5 w-5" />
							</div>

							<div className="font-medium text-muted-foreground text-sm">
								{displayFileName}
							</div>

							{pdfFile && (
								<div className="text-muted-foreground text-xs">
									{(pdfFile.size / 1024 / 1024).toFixed(2)} MB
								</div>
							)}

							<div className="text-green-600 text-xs">Ready</div>
						</div>
					) : (
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-11 w-11 items-center justify-center rounded-full bg-background">
								<CloudUpload className="h-5 w-5" />
							</div>

							<div className="font-medium text-muted-foreground text-sm">
								Click to upload PDF
							</div>

							<div className="text-muted-foreground text-xs">
								PDF files only
							</div>
						</div>
					)}
				</div>
			</button>
		</div>
	);
};

export default PdfUploader;
