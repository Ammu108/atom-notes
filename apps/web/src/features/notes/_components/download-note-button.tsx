import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { cn } from "~/lib/utils";
import { useDownloadNotePdf } from "../api";

const DownloadNotePdf = ({
	noteId,
	className,
}: {
	noteId: string;
	className?: string;
}) => {
	const router = useRouter();
	const { mutateAsync: downloadNote, isPending: isDownloadingNote } =
		useDownloadNotePdf({
			onSuccess: (opt) => {
				toast.success(opt.message);
			},
			onError: (err) => {
				if (err.data?.code === "UNAUTHORIZED") {
					router.push("/auth?tab=login");
					toast.error(err.message);
					return;
				}
				toast.error(err.message);
			},
		});

	const handleDownloadNote = async () => {
		const data = await downloadNote({ noteId });

		if (data.url) {
			window.open(data.url, "_blank");
		}
	};

	return (
		<Button
			className={cn("font-semibold", className)}
			disabled={isDownloadingNote}
			onClick={handleDownloadNote}
			size="sm"
			variant="primary"
		>
			{isDownloadingNote ? <Spinner /> : "Download PDF"}
		</Button>
	);
};

export default DownloadNotePdf;
