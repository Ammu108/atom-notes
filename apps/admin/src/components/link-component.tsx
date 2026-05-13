"use client";

import type { Editor } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { type ReactNode, useEffect, useId, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "~/components/ui/popover";

type LinkComponentProps = {
	children?: ReactNode;
	defaultValue?: string;
	description?: string;
	editor?: Editor;
	onCancel?: () => void;
	onSave?: (value: string) => void;
	placeholder?: string;
	title?: string;
	trigger?: React.ReactElement;
};

const LinkComponent = ({
	children,
	defaultValue = "",
	description = "Paste a URL and save it.",
	editor,
	onCancel,
	onSave,
	placeholder = "https://example.com",
	title = "Add link",
	trigger,
}: LinkComponentProps) => {
	const inputId = useId();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		if (open) {
			setValue(defaultValue);
		}
	}, [defaultValue, open]);

	const closePopover = () => {
		setOpen(false);
	};

	const handleCancel = () => {
		closePopover();
		onCancel?.();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return;
		}

		// If editor is provided, use it to set the link
		if (editor) {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: trimmedValue })
				.run();
		}

		onSave?.(trimmedValue);
		closePopover();
	};

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger>
				{trigger || children || (
					<Button
						aria-label={title}
						size="icon-sm"
						variant={open ? "secondary" : "outline"}
					>
						<LinkIcon />
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent align="start" className="w-80 p-4" sideOffset={8}>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<PopoverHeader>
						<PopoverTitle>{title}</PopoverTitle>
						<PopoverDescription>{description}</PopoverDescription>
					</PopoverHeader>

					<div className="space-y-2">
						<Label htmlFor={inputId}>URL</Label>
						<Input
							autoFocus
							id={inputId}
							onChange={(event) => setValue(event.target.value)}
							placeholder={placeholder}
							type="url"
							value={value}
						/>
					</div>

					<div className="flex justify-end gap-2">
						<Button onClick={handleCancel} type="button" variant="outline">
							Cancel
						</Button>
						<Button disabled={!value.trim()} type="submit">
							Save
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
};

export default LinkComponent;
