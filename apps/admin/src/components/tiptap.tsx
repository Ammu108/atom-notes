"use client";

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
	ItalicIcon,
	LinkIcon,
	ListIcon,
	ListOrderedIcon,
	QuoteIcon,
	RotateCcwIcon,
	RotateCwIcon,
	Trash2Icon,
} from "lucide-react";
import { Toggle } from "./ui/toggle";

const Tiptap = () => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Hello World!</p>",
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
				isCode: ctx.editor.isActive("code") ?? false,
				isBullet: ctx.editor.isActive("bulletList") ?? false,
				isOrdered: ctx.editor.isActive("orderedList") ?? false,
				isQuote: ctx.editor.isActive("blockquote") ?? false,
			};
		},
	});

	if (!editor) return null;

	return (
		<div className="flex flex-wrap items-center gap-2 border-border border-b p-2">
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
				aria-label="Toggle code"
				onPressedChange={() => editor.chain().focus().toggleCode().run()}
				pressed={state.isCode}
				variant="outline"
			>
				<CodeIcon />
			</Toggle>

			<Toggle
				aria-label="Bullet list"
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
				pressed={state.isBullet}
				variant="outline"
			>
				<ListIcon />
			</Toggle>

			<Toggle
				aria-label="Ordered list"
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
				pressed={state.isOrdered}
				variant="outline"
			>
				<ListOrderedIcon />
			</Toggle>

			<Toggle
				aria-label="Block quote"
				onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
				pressed={state.isQuote}
				variant="outline"
			>
				<QuoteIcon />
			</Toggle>

			<button
				aria-label="Insert link"
				className="btn-outline rounded p-2"
				onClick={() => {
					const url = window.prompt("Enter URL");
					if (url) editor.chain().focus().setLink({ href: url }).run();
				}}
				type="button"
			>
				<LinkIcon />
			</button>

			<button
				aria-label="Undo"
				className="btn-outline rounded p-2"
				onClick={() => editor.chain().focus().undo().run()}
				type="button"
			>
				<RotateCcwIcon />
			</button>

			<button
				aria-label="Redo"
				className="btn-outline rounded p-2"
				onClick={() => editor.chain().focus().redo().run()}
				type="button"
			>
				<RotateCwIcon />
			</button>

			<button
				aria-label="Clear formatting"
				className="btn-outline rounded p-2"
				onClick={() =>
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}
				type="button"
			>
				<Trash2Icon />
			</button>
		</div>
	);
};

export default Tiptap;
