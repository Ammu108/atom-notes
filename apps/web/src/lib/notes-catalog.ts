export type Subject = {
	slug: string;
	name: string;
	chapters: string[];
};

export type Semester = {
	slug: string;
	name: string;
	subjects: Subject[];
};

export const semesters: Semester[] = [
	{
		slug: "semester-1",
		name: "Semester 1",
		subjects: [
			{
				slug: "engineering-mathematics-1",
				name: "Engineering Mathematics I",
				chapters: [
					"Matrices and Determinants",
					"Differential Calculus",
					"Integral Calculus",
					"Differential Equations",
				],
			},
			{
				slug: "programming-fundamentals",
				name: "Programming Fundamentals",
				chapters: [
					"C Basics",
					"Control Flow",
					"Functions and Arrays",
					"Pointers and Structures",
				],
			},
		],
	},
	{
		slug: "semester-2",
		name: "Semester 2",
		subjects: [
			{
				slug: "data-structures",
				name: "Data Structures",
				chapters: [
					"Time Complexity",
					"Stacks and Queues",
					"Linked Lists",
					"Trees and Graphs",
				],
			},
			{
				slug: "digital-logic",
				name: "Digital Logic",
				chapters: [
					"Boolean Algebra",
					"Combinational Circuits",
					"Sequential Circuits",
					"Memory and Registers",
				],
			},
		],
	},
	{
		slug: "semester-3",
		name: "Semester 3",
		subjects: [
			{
				slug: "object-oriented-programming",
				name: "Object Oriented Programming",
				chapters: [
					"Classes and Objects",
					"Inheritance",
					"Polymorphism",
					"Exception Handling",
				],
			},
			{
				slug: "database-management-systems",
				name: "Database Management Systems",
				chapters: [
					"Relational Model",
					"Normalization",
					"SQL Queries",
					"Transactions",
				],
			},
		],
	},
	{
		slug: "semester-4",
		name: "Semester 4",
		subjects: [
			{
				slug: "operating-systems",
				name: "Operating Systems",
				chapters: [
					"Process Management",
					"CPU Scheduling",
					"Deadlocks",
					"Memory Management",
				],
			},
			{
				slug: "computer-networks",
				name: "Computer Networks",
				chapters: [
					"OSI Model",
					"Transport Layer",
					"Routing Protocols",
					"Network Security Basics",
				],
			},
		],
	},
	{
		slug: "semester-5",
		name: "Semester 5",
		subjects: [
			{
				slug: "operating-systems",
				name: "Operating Systems",
				chapters: [
					"Process Management",
					"CPU Scheduling",
					"Deadlocks",
					"Memory Management",
				],
			},
			{
				slug: "computer-networks",
				name: "Computer Networks",
				chapters: [
					"OSI Model",
					"Transport Layer",
					"Routing Protocols",
					"Network Security Basics",
				],
			},
		],
	},
	{
		slug: "semester-6",
		name: "Semester 6",
		subjects: [
			{
				slug: "operating-systems",
				name: "Operating Systems",
				chapters: [
					"Process Management",
					"CPU Scheduling",
					"Deadlocks",
					"Memory Management",
				],
			},
			{
				slug: "computer-networks",
				name: "Computer Networks",
				chapters: [
					"OSI Model",
					"Transport Layer",
					"Routing Protocols",
					"Network Security Basics",
				],
			},
		],
	},
];
