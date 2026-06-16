import { CloudUpload, FileText } from "lucide-react";
import { type Dispatch, type SetStateAction, useMemo, useRef } from "react";
import { Badge } from "~/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

interface PdfUploaderProps {
	pdfFile: File | null;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isPaid: boolean;
	setIsPaid: Dispatch<SetStateAction<boolean>>;
	setPrice: Dispatch<SetStateAction<number>>;
	price: number;
	existingPdfUrl?: string | null;
	existingPdfKey?: string | null;
}

const PdfUploader = ({
	pdfFile,
	onFileChange,
	isPaid,
	setIsPaid,
	setPrice,
	price,
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
		<div>
			<CardHeader className="px-5 py-4">
				<div className="flex items-center gap-2">
					<FileText className="h-4 w-4 text-muted-foreground" />
					<CardTitle className="font-semibold text-sm">
						PDF & Monetization
					</CardTitle>
				</div>
			</CardHeader>

			<CardContent className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
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

export default PdfUploader;
