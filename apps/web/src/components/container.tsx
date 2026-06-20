import { cn } from "@repo/ui";
import type React from "react";

export function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("flex w-full max-w-7xl px-4 md:px-6", className)}>
			{children}
		</div>
	);
}
