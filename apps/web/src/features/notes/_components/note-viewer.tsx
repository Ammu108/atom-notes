"use client";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ResizeImage from "tiptap-extension-resize-image";

interface NoteViewerProps {
	content: JSONContent;
}

export function NoteViewer({ content }: NoteViewerProps) {
	const editor = useEditor({
		editable: false,

		extensions: [
			StarterKit,
			Highlight.configure({
				multicolor: true,
			}),
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image.configure({
				inline: true,
			}),
			ResizeImage,
		],

		content,

		immediatelyRender: false,
	});

	if (!editor) return null;

	return (
		<div className="prose dark:prose-invert max-w-none">
			<EditorContent editor={editor} />
		</div>
	);
}
