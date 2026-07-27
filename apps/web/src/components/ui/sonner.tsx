"use client";

import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			richColors
			style={
				{
					// Base Toast Styles
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "1rem",

					// Error (Destructive) - Fixed syntax and clear red text fallback
					"--error-bg":
						"color-mix(in srgb, var(--destructive, #ef4444) 12%, var(--popover))",
					"--error-text": "var(--destructive, #dc2626)",
					"--error-border":
						"color-mix(in srgb, var(--destructive, #ef4444) 30%, transparent)",

					// Success
					"--success-bg":
						"color-mix(in srgb, var(--success, #10b981) 12%, var(--popover))",
					"--success-text": "var(--success, #059669)",
					"--success-border":
						"color-mix(in srgb, var(--success, #10b981) 30%, transparent)",

					// Warning
					"--warning-bg":
						"color-mix(in srgb, var(--warning, #f59e0b) 12%, var(--popover))",
					"--warning-text": "var(--warning, #d97706)",
					"--warning-border":
						"color-mix(in srgb, var(--warning, #f59e0b) 30%, transparent)",

					// Info
					"--info-bg":
						"color-mix(in srgb, var(--info, #3b82f6) 12%, var(--popover))",
					"--info-text": "var(--info, #2563eb)",
					"--info-border":
						"color-mix(in srgb, var(--info, #3b82f6) 30%, transparent)",
				} as React.CSSProperties
			}
			theme={theme as ToasterProps["theme"]}
			toastOptions={{
				classNames: {
					toast: "cn-toast",
					error: "!text-red-600 dark:!text-red-400", // Guarantees red text even if CSS variables lag
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
