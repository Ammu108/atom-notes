"use client";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import {
	type Editor,
	EditorContent,
	useEditor,
	useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	BoldIcon,
	CodeIcon,
	HighlighterIcon,
	ImageIcon,
	ItalicIcon,
	LinkIcon,
	ListIcon,
	ListOrderedIcon,
	MinusIcon,
	QuoteIcon,
	RotateCcwIcon,
	RotateCwIcon,
	TableIcon,
	Trash2Icon,
	UnderlineIcon,
} from "lucide-react";
import { useCallback } from "react";
import ResizeImage from "tiptap-extension-resize-image";
import LinkComponent from "./link-component";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Toggle } from "./ui/toggle";

const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Highlight.configure({ multicolor: true }),
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image.configure({
				inline: true,
				allowBase64: true,
			}),
			ResizeImage,
		],
		content: "<p>Hello World!</p>",
		editorProps: {
			attributes: {
				class:
					"prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none",
			},
		},
		// Don't render immediately on the server to avoid SSR issues
		immediatelyRender: false,
	});

	return (
		<>
			{editor && <ToolBar editor={editor} />}
			<div className="mt-2 px-4">
				<EditorContent editor={editor} />
			</div>
		</>
	);
};

const ToolBar = ({ editor }: { editor: Editor }) => {
	const state = useEditorState({
		editor,
		selector: (ctx) => {
			return {
				isBold: ctx.editor.isActive("bold") ?? false,
				isItalic: ctx.editor.isActive("italic") ?? false,
				isUnderline: ctx.editor.isActive("underline") ?? false,
				isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
				isBulletList: ctx.editor.isActive("bulletList") ?? false,
				isOrderedList: ctx.editor.isActive("orderedList") ?? false,
				isQuote: ctx.editor.isActive("blockquote") ?? false,
				isHighlight: ctx.editor.isActive("highlight") ?? false,
				isLink: ctx.editor.isActive("link") ?? false,
				isHorizontalRule: ctx.editor.isActive("horizontalRule") ?? false,
				isTable: ctx.editor.isActive("table") ?? false,
				isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
				isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
				isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
				isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
				isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
				paragraph: ctx.editor.isActive("paragraph") ?? false,
			};
		},
	});

	const handleImageUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = () => {
				editor
					.chain()
					.focus()
					.setImage({ src: reader.result as string })
					.run();
			};
			reader.readAsDataURL(file);
		},
		[editor],
	);

	const handleHeadingChange = (value: string | null) => {
		if (!value || value === "paragraph") {
			editor.chain().focus().setParagraph().run();
		} else {
			const level = Number.parseInt(value.replace("heading", "")) as
				| 1
				| 2
				| 3
				| 4
				| 5
				| 6;
			editor.chain().focus().setHeading({ level }).run();
		}
	};

	if (!editor) return null;

	return (
		<div className="flex flex-wrap items-center gap-2 border-border border-b p-2">
			<Select
				onValueChange={handleHeadingChange}
				value={
					state.isHeading2
						? "heading2"
						: state.isHeading3
							? "heading3"
							: state.isHeading4
								? "heading4"
								: state.isHeading5
									? "heading5"
									: state.isHeading6
										? "heading6"
										: "paragraph"
				}
			>
				<SelectTrigger className="w-full max-w-48">
					<SelectValue placeholder="paragraph" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Text Style</SelectLabel>
						<SelectItem value="paragraph">Paragraph</SelectItem>
						<SelectItem value="heading2">Heading 2</SelectItem>
						<SelectItem value="heading3">Heading 3</SelectItem>
						<SelectItem value="heading4">Heading 4</SelectItem>
						<SelectItem value="heading5">Heading 5</SelectItem>
						<SelectItem value="heading6">Heading 6</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Toggle
				aria-label="Toggle bold"
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
				pressed={state.isBold}
				variant="outline"
			>
				<BoldIcon />
			</Toggle>

			<Toggle
				aria-label="Toggle italic"
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
				pressed={state.isItalic}
				variant="outline"
			>
				<ItalicIcon />
			</Toggle>

			<Toggle
				aria-label="Toggle underline"
				onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
				pressed={state.isUnderline}
				variant="outline"
			>
				<UnderlineIcon />
			</Toggle>

			<Toggle
				aria-label="Toggle code block"
				onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
				pressed={state.isCodeBlock}
				variant="outline"
			>
				<CodeIcon />
			</Toggle>

			<Toggle
				aria-label="Toggle bullet list"
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
				pressed={state.isBulletList}
				variant="outline"
			>
				<ListIcon />
			</Toggle>

			<Toggle
				aria-label="Toggle ordered list"
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
				pressed={state.isOrderedList}
				variant="outline"
			>
				<ListOrderedIcon />
			</Toggle>

			<Toggle
				aria-label="Toggle blockquote"
				onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
				pressed={state.isQuote}
				variant="outline"
			>
				<QuoteIcon />
			</Toggle>

			<Toggle
				aria-label="Toggle highlight"
				onPressedChange={() =>
					editor.chain().focus().toggleHighlight({ color: "#ff3c00" }).run()
				}
				pressed={state.isHighlight}
				variant="outline"
			>
				<HighlighterIcon />
			</Toggle>

			{state.isLink ? (
				<Toggle
					aria-label="Remove link"
					onPressedChange={() =>
						editor.chain().focus().extendMarkRange("link").unsetLink().run()
					}
					pressed={state.isLink}
					variant="outline"
				>
					<LinkIcon />
				</Toggle>
			) : (
				<LinkComponent editor={editor}>
					<Toggle aria-label="Toggle link" size="sm" variant="outline">
						<LinkIcon />
					</Toggle>
				</LinkComponent>
			)}

			<Toggle
				aria-label="Insert image"
				onPressedChange={() => document.getElementById("image-input")?.click()}
				variant="outline"
			>
				<ImageIcon />
			</Toggle>
			<input
				accept="image/*"
				className="hidden"
				id="image-input"
				onChange={handleImageUpload}
				type="file"
			/>

			<Toggle
				aria-label="Insert horizontal rule"
				onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
				variant="outline"
			>
				<MinusIcon />
			</Toggle>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<Toggle
						aria-label="Insert table"
						pressed={state.isTable}
						variant="outline"
					>
						<TableIcon />
					</Toggle>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() =>
							editor
								.chain()
								.focus()
								.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
								.run()
						}
					>
						Insert Table
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().addRowAfter().run()}
					>
						Add Row After
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().addRowBefore().run()}
					>
						Add Row Before
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().deleteRow().run()}
					>
						Delete Row
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().addColumnAfter().run()}
					>
						Add Column After
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().addColumnBefore().run()}
					>
						Add Column Before
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().deleteColumn().run()}
					>
						Delete Column
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().deleteTable().run()}
					>
						Delete Table
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().mergeCells().run()}
					>
						Merge Cells
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => editor.chain().focus().splitCell().run()}
					>
						Split Cell
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Toggle
				aria-label="Undo"
				onPressedChange={() => editor.chain().focus().undo().run()}
				variant="outline"
			>
				<RotateCcwIcon />
			</Toggle>

			<Toggle
				aria-label="Redo"
				onPressedChange={() => editor.chain().focus().redo().run()}
				variant="outline"
			>
				<RotateCwIcon />
			</Toggle>

			<Toggle
				aria-label="Clear formatting"
				onPressedChange={() =>
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}
				variant="outline"
			>
				<Trash2Icon />
			</Toggle>
		</div>
	);
};

export default Tiptap;
