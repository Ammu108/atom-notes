import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { useDownloadPyqPdf } from "../api";

const DownloadPyqPdf = ({ pyqId }: { pyqId: string }) => {
	const router = useRouter();
	const { mutateAsync: downloadPyqPdf, isPending: isDownloadingPyqPdf } =
		useDownloadPyqPdf({
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

	const handleDownloadPyqPdf = async () => {
		const data = await downloadPyqPdf({ pyqId });

		if (data.url) {
			window.open(data.url, "_blank");
		}
	};

	return (
		<Button
			className="w-full font-semibold"
			disabled={isDownloadingPyqPdf}
			onClick={handleDownloadPyqPdf}
			size="sm"
			variant="primary"
		>
			{isDownloadingPyqPdf ? <Spinner /> : "Download PDF"}
		</Button>
	);
};

export default DownloadPyqPdf;
