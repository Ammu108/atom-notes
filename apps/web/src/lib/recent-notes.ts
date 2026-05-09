export type NoteSection = {
	title: string;
	content: string[];
};

export type RecentNote = {
	slug: string;
	title: string;
	subject: string;
	semester: string;
	updatedAt: string;
	readTime: string;
	chapterCount: number;
	pdfUrl: string;
	sections: NoteSection[];
};

export const recentNotes: RecentNote[] = [
	{
		slug: "dbms-normalization-quick-revision",
		title: "DBMS Normalization Quick Revision",
		subject: "Database Management Systems",
		semester: "Semester 3",
		updatedAt: "Updated 2 days ago",
		readTime: "8 min read",
		chapterCount: 4,
		pdfUrl: "/pdf/dbms-normalization-quick-revision.pdf",
		sections: [
			{
				title: "What Is Normalization?",
				content: [
					"Normalization is the process of organizing data in relational tables to reduce redundancy and improve integrity.",
					"Each normal form introduces stricter rules that minimize update, insert, and delete anomalies.",
				],
			},
			{
				title: "First to Third Normal Form",
				content: [
					"1NF ensures atomic values and no repeating groups.",
					"2NF removes partial dependency on composite keys.",
					"3NF removes transitive dependencies to keep non-key attributes dependent only on candidate keys.",
				],
			},
			{
				title: "Exam Tips",
				content: [
					"Always identify candidate keys first before deciding normal form.",
					"Show table decomposition step-by-step for full marks.",
				],
			},
		],
	},
	{
		slug: "os-cpu-scheduling-complete-notes",
		title: "OS CPU Scheduling Complete Notes",
		subject: "Operating Systems",
		semester: "Semester 4",
		updatedAt: "Updated 5 days ago",
		readTime: "12 min read",
		chapterCount: 5,
		pdfUrl: "/pdf/os-cpu-scheduling-complete-notes.pdf",
		sections: [
			{
				title: "Scheduling Fundamentals",
				content: [
					"CPU scheduling decides which ready process gets CPU time and for how long.",
					"Main goals are high throughput, low turnaround time, and fair resource allocation.",
				],
			},
			{
				title: "Core Algorithms",
				content: [
					"FCFS is simple but can cause convoy effect.",
					"SJF gives optimal average waiting time if burst estimates are accurate.",
					"Round Robin improves responsiveness by time-slicing.",
				],
			},
			{
				title: "Numerical Problem Strategy",
				content: [
					"Create a Gantt chart first, then compute waiting and turnaround times.",
					"Double-check arrival times when preemption is involved.",
				],
			},
		],
	},
	{
		slug: "dsa-graphs-and-traversal-notes",
		title: "DSA Graphs and Traversal Notes",
		subject: "Data Structures",
		semester: "Semester 2",
		updatedAt: "Updated 1 week ago",
		readTime: "10 min read",
		chapterCount: 6,
		pdfUrl: "/pdf/dsa-graphs-and-traversal-notes.pdf",
		sections: [
			{
				title: "Graph Representation",
				content: [
					"Adjacency matrix is simple but memory heavy for sparse graphs.",
					"Adjacency list is efficient and preferred in most interview and exam problems.",
				],
			},
			{
				title: "DFS and BFS",
				content: [
					"DFS explores depth-wise and is useful for cycle detection and topological sort.",
					"BFS explores level-wise and gives shortest path in unweighted graphs.",
				],
			},
			{
				title: "Important Patterns",
				content: [
					"Model grid questions as graphs to reuse BFS/DFS templates.",
					"Track visited nodes carefully to avoid infinite traversal.",
				],
			},
		],
	},
];

export const getRecentNoteBySlug = (slug: string) =>
	recentNotes.find((note) => note.slug === slug);
