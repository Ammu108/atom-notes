export type NoteType = {
	chapterId: string;
	title: string;
	slug: string;
	metaTitle: string;
	metaDescription: string;
	content: any;
	pdfUrl?: string | null;
	pdfKey?: string | null;
	isPaid: boolean;
	price: string;
};
