import type { EditorContent } from "@repo/shared";

export type NoteType = {
	unitId: string;
	title: string;
	slug: string;
	metaTitle: string;
	metaDescription: string;
	content: EditorContent;
	pdfUrl?: string | null;
	pdfKey?: string | null;
	isPaid: boolean;
	price: string;
};
