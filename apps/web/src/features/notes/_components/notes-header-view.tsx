import { ChevronDown } from "lucide-react";

interface NotesHeaderView {
	title: string;
	price: string;
}

const NotesHeaderView = ({ title, price }: NotesHeaderView) => {
	return (
		<div className="flex flex-col gap-2">
			<div>
				<h1 className="mb-2 font-extrabold text-4xl text-gray-900 leading-tight">
					{title}
				</h1>
			</div>
			{/* Preview Banner */}
			<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-gray-700 text-sm">
				<p className="text-base text-green-500">✅</p>
				<p>
					You're reading the{" "}
					<span className="font-semibold text-green-700">free preview</span>.
					The full note is available for download at ₹{price}.
				</p>
				<a className="md:hidden" href="#buyPdf">
					<ChevronDown className="size-6" />
				</a>
			</div>
		</div>
	);
};

export default NotesHeaderView;
