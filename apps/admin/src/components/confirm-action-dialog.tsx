"use client";

import { cn } from "@repo/ui";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "./ui/dialog";

type ConfirmActionDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	onConfirm: () => void;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
	confirmLoading?: boolean;
	confirmDisabled?: boolean;
};

export function ConfirmActionDialog({
	open,
	onOpenChange,
	title,
	description,
	onConfirm,
	onCancel,
	confirmText = "Continue",
	cancelText = "Cancel",
	confirmLoading = false,
	confirmDisabled = false,
}: ConfirmActionDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent className={cn("max-w-md p-5")} showCloseButton={false}>
				<DialogTitle className="font-semibold text-base">{title}</DialogTitle>
				<DialogDescription className="text-muted-foreground text-sm">
					{description}
				</DialogDescription>

				<div className="flex justify-end gap-2">
					<DialogClose
						render={
							<Button onClick={onCancel} type="button" variant="outline">
								{cancelText}
							</Button>
						}
					/>
					<Button
						disabled={confirmDisabled || confirmLoading}
						onClick={onConfirm}
						type="button"
						variant="destructive"
					>
						{confirmLoading ? "Processing..." : confirmText}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
