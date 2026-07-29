"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";

export function BackButton() {
	const router = useRouter();

	return (
		<button
			className={buttonVariants({ variant: "default", size: "lg" })}
			onClick={() => {
				if (window.history.length > 1) {
					router.back();
				} else {
					router.push("/purchases");
				}
			}}
			type="button"
		>
			<ArrowLeft className="size-4" />
			Back
		</button>
	);
}
