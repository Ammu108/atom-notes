import { coursesService } from "@repo/api/course-service";
import { eq } from "drizzle-orm";
import { courses, db } from ".";

const bcaCourseSeed = {
	name: "Bachelor of Computer Applications",
	slug: "bca",
	semesters: [
		// ---------------- SEMESTER I ----------------
		{
			semesterNumber: 1,
			subjects: [
				{
					name: "Mathematical Foundation for Computer Science – I",
					units: [
						{ name: "Sets, Relations and Functions" },
						{ name: "Mathematical Logic" },
						{ name: "Matrices and Determinants" },
						{ name: "Combinatorics" },
						{ name: "Number Theory Basics" },
					],
				},
				{
					name: "Computer Architecture",
					units: [
						{ name: "Number Systems and Boolean Algebra" },
						{ name: "Digital Logic Circuits" },
						{ name: "Processor Organization" },
						{ name: "Memory Organization" },
						{ name: "Input/Output Organization" },
					],
				},
				{
					name: "Indian Knowledge System",
					units: [
						{ name: "Introduction to Indian Knowledge Systems" },
						{ name: "Indian Philosophy and Ethics" },
						{ name: "Science and Mathematics in Ancient India" },
						{ name: "Indian Art, Literature and Culture" },
						{ name: "Yoga and Wellness Traditions" },
					],
				},
				{
					name: "Problem Solving Techniques",
					units: [
						{ name: "Introduction to Problem Solving" },
						{ name: "Algorithms and Flowcharts" },
						{ name: "Programming Fundamentals" },
						{ name: "Data Types and Control Structures" },
						{ name: "Functions and Modular Programming" },
					],
				},
				{
					name: "General English – I",
					units: [
						{ name: "Grammar and Usage" },
						{ name: "Reading Comprehension" },
						{ name: "Writing Skills" },
						{ name: "Vocabulary Building" },
						{ name: "Communication Skills" },
					],
				},
				{
					name: "Environmental Science and Sustainability",
					units: [
						{ name: "Ecosystems and Biodiversity" },
						{ name: "Natural Resources" },
						{ name: "Environmental Pollution" },
						{ name: "Sustainable Development" },
						{ name: "Environmental Policies and Laws" },
					],
				},
			],
		},

		// ---------------- SEMESTER II ----------------
		{
			semesterNumber: 2,
			subjects: [
				{
					name: "Mathematical Foundation for Computer Science – II",
					units: [
						{ name: "Calculus and Limits" },
						{ name: "Differentiation and Applications" },
						{ name: "Integration and Applications" },
						{ name: "Differential Equations" },
						{ name: "Probability Theory Basics" },
					],
				},
				{
					name: "Data Structures",
					units: [
						{ name: "Introduction to Data Structures" },
						{ name: "Arrays and Linked Lists" },
						{ name: "Stacks and Queues" },
						{ name: "Trees and Graphs" },
						{ name: "Sorting and Searching Algorithms" },
					],
				},
				{
					name: "Operating Systems",
					units: [
						{ name: "Introduction to Operating Systems" },
						{ name: "Process Management" },
						{ name: "Memory Management" },
						{ name: "File Systems" },
						{ name: "Deadlocks and Synchronization" },
					],
				},
				{
					name: "Object Oriented Programming Using Java",
					units: [
						{ name: "Introduction to OOP and Java" },
						{ name: "Classes and Objects" },
						{ name: "Inheritance and Polymorphism" },
						{ name: "Exception Handling" },
						{ name: "Multithreading and Collections" },
					],
				},
				{
					name: "Web Technologies",
					units: [
						{ name: "HTML and CSS Fundamentals" },
						{ name: "JavaScript Basics" },
						{ name: "Client Side Scripting" },
						{ name: "Server Side Concepts" },
						{ name: "Web Design Principles" },
					],
				},
				{
					name: "Indian Constitution",
					units: [
						{ name: "Introduction to the Constitution" },
						{ name: "Fundamental Rights and Duties" },
						{ name: "Directive Principles of State Policy" },
						{ name: "Union and State Government" },
						{ name: "Judiciary and Local Governance" },
					],
				},
			],
		},

		// ---------------- SEMESTER III ----------------
		{
			semesterNumber: 3,
			subjects: [
				{
					name: "Probability & Statistics",
					units: [
						{ name: "Probability Theory" },
						{ name: "Random Variables and Distributions" },
						{ name: "Sampling Theory" },
						{ name: "Correlation and Regression" },
						{ name: "Hypothesis Testing" },
					],
				},
				{
					name: "Database Management Systems",
					units: [
						{ name: "Introduction to DBMS" },
						{ name: "Relational Model and ER Diagrams" },
						{ name: "SQL and Query Processing" },
						{ name: "Normalization" },
						{ name: "Transaction Management and Concurrency" },
					],
				},
				{
					name: "Software Engineering",
					units: [
						{ name: "Introduction to Software Engineering" },
						{ name: "Software Development Life Cycle" },
						{ name: "Requirements Engineering" },
						{ name: "Software Design" },
						{ name: "Software Testing and Maintenance" },
					],
				},
				{
					name: "Group-A: Elective-I – Feature Engineering",
					units: [
						{ name: "Introduction to Feature Engineering" },
						{ name: "Data Cleaning and Preprocessing" },
						{ name: "Feature Selection Techniques" },
						{ name: "Feature Extraction and Transformation" },
						{ name: "Dimensionality Reduction" },
					],
				},
				{
					name: "Group-B: Elective-I – Basics of Data Analytics using Spreadsheet",
					units: [
						{ name: "Introduction to Data Analytics" },
						{ name: "Spreadsheet Functions and Formulas" },
						{ name: "Data Visualization in Spreadsheets" },
						{ name: "Pivot Tables and Data Summarization" },
						{ name: "What-If Analysis and Solver" },
					],
				},
				{
					name: "Group-C: Elective-I – Web Programming-I",
					units: [
						{ name: "HTML5 and CSS3" },
						{ name: "JavaScript and DOM Manipulation" },
						{ name: "Responsive Web Design" },
						{ name: "Introduction to PHP" },
						{ name: "Form Handling and Validation" },
					],
				},
				{
					name: "Python Programming",
					units: [
						{ name: "Introduction to Python" },
						{ name: "Data Types and Control Structures" },
						{ name: "Functions and Modules" },
						{ name: "File Handling" },
						{ name: "Object Oriented Programming in Python" },
					],
				},
				{
					name: "Yoga and Physical Fitness / Sports / Disaster Management / NSS / NCC",
					units: [
						{ name: "Introduction and Orientation" },
						{ name: "Fitness and Wellness Practices" },
						{ name: "Practical Sessions I" },
						{ name: "Practical Sessions II" },
						{ name: "Assessment and Evaluation" },
					],
				},
			],
		},

		// ---------------- SEMESTER IV ----------------
		{
			semesterNumber: 4,
			subjects: [
				{
					name: "Entrepreneurship and Startup Ecosystem",
					units: [
						{ name: "Introduction to Entrepreneurship" },
						{ name: "Business Model Development" },
						{ name: "Startup Funding and Finance" },
						{ name: "Legal Aspects of Startups" },
						{ name: "Marketing and Growth Strategies" },
					],
				},
				{
					name: "Computer Networks",
					units: [
						{ name: "Introduction to Computer Networks" },
						{ name: "Network Models and Protocols" },
						{ name: "Data Link and Network Layer" },
						{ name: "Transport and Application Layer" },
						{ name: "Network Security Basics" },
					],
				},
				{
					name: "Design and Analysis of Algorithms",
					units: [
						{ name: "Algorithm Analysis and Complexity" },
						{ name: "Divide and Conquer" },
						{ name: "Greedy Algorithms" },
						{ name: "Dynamic Programming" },
						{ name: "Graph Algorithms and NP-Completeness" },
					],
				},
				{
					name: "Artificial Intelligence",
					units: [
						{ name: "Introduction to AI" },
						{ name: "Problem Solving and Search Techniques" },
						{ name: "Knowledge Representation" },
						{ name: "Machine Learning Basics" },
						{ name: "Expert Systems and Applications" },
					],
				},
				{
					name: "Group-A: Elective-II – Introduction to Machine Learning",
					units: [
						{ name: "Introduction to Machine Learning" },
						{ name: "Supervised Learning" },
						{ name: "Unsupervised Learning" },
						{ name: "Model Evaluation and Validation" },
						{ name: "Ensemble Methods" },
					],
				},
				{
					name: "Group-B: Elective-II – Data Visualization",
					units: [
						{ name: "Principles of Data Visualization" },
						{ name: "Visualization Tools and Libraries" },
						{ name: "Chart Types and Their Uses" },
						{ name: "Interactive Dashboards" },
						{ name: "Storytelling with Data" },
					],
				},
				{
					name: "Group-C: Elective-II – Web Programming-II",
					units: [
						{ name: "Advanced JavaScript and Frameworks" },
						{ name: "Server Side Programming" },
						{ name: "RESTful APIs" },
						{ name: "Database Integration" },
						{ name: "Deployment and Hosting" },
					],
				},
				{
					name: "Design Thinking and Innovation",
					units: [
						{ name: "Introduction to Design Thinking" },
						{ name: "Empathize and Define" },
						{ name: "Ideation Techniques" },
						{ name: "Prototyping" },
						{ name: "Testing and Implementation" },
					],
				},
			],
		},

		// ---------------- SEMESTER V ----------------
		{
			semesterNumber: 5,
			subjects: [
				{
					name: "Group-A Elective-III: Neural Network",
					units: [
						{ name: "Introduction to Neural Networks" },
						{ name: "Perceptron and Multilayer Networks" },
						{ name: "Backpropagation Algorithm" },
						{ name: "Convolutional Neural Networks" },
						{ name: "Recurrent Neural Networks" },
					],
				},
				{
					name: "Group-A Elective-IV: Digital Image Processing",
					units: [
						{ name: "Introduction to Digital Image Processing" },
						{ name: "Image Enhancement Techniques" },
						{ name: "Image Segmentation" },
						{ name: "Image Compression" },
						{ name: "Morphological Image Processing" },
					],
				},
				{
					name: "Group-A Elective-V: Natural Language Processing",
					units: [
						{ name: "Introduction to NLP" },
						{ name: "Text Preprocessing Techniques" },
						{ name: "Syntax and Parsing" },
						{ name: "Semantic Analysis" },
						{ name: "Language Models and Applications" },
					],
				},
				{
					name: "Group-B Elective-III: Introduction to Data Science",
					units: [
						{ name: "Introduction to Data Science" },
						{ name: "Data Collection and Cleaning" },
						{ name: "Exploratory Data Analysis" },
						{ name: "Data Science Tools" },
						{ name: "Case Studies in Data Science" },
					],
				},
				{
					name: "Group-B Elective-IV: Time Series Analysis",
					units: [
						{ name: "Introduction to Time Series" },
						{ name: "Trend and Seasonality Analysis" },
						{ name: "ARIMA Models" },
						{ name: "Forecasting Techniques" },
						{ name: "Time Series Applications" },
					],
				},
				{
					name: "Group-B Elective-V: Machine Learning",
					units: [
						{ name: "Introduction to Advanced Machine Learning" },
						{ name: "Support Vector Machines" },
						{ name: "Decision Trees and Random Forests" },
						{ name: "Neural Network Basics" },
						{ name: "Model Optimization Techniques" },
					],
				},
				{
					name: "Quantitative Techniques",
					units: [
						{ name: "Linear Programming" },
						{ name: "Transportation and Assignment Problems" },
						{ name: "Decision Theory" },
						{ name: "Queuing Theory" },
						{ name: "Inventory Management" },
					],
				},
			],
		},

		// ---------------- SEMESTER VI ----------------
		{
			semesterNumber: 6,
			subjects: [
				{
					name: "Generative AI",
					units: [
						{ name: "Introduction to Generative AI" },
						{ name: "Generative Adversarial Networks" },
						{ name: "Variational Autoencoders" },
						{ name: "Transformer Models" },
						{ name: "Applications of Generative AI" },
					],
				},
				{
					name: "Group-A Elective-VI: Deep Learning for Computer Vision",
					units: [
						{ name: "Introduction to Computer Vision" },
						{ name: "CNN Architectures" },
						{ name: "Object Detection" },
						{ name: "Image Segmentation Techniques" },
						{ name: "Advanced Vision Applications" },
					],
				},
				{
					name: "Group-A Elective-VII: Predictive Analysis",
					units: [
						{ name: "Introduction to Predictive Analytics" },
						{ name: "Regression Techniques" },
						{ name: "Classification Techniques" },
						{ name: "Model Evaluation" },
						{ name: "Predictive Analytics Applications" },
					],
				},
				{
					name: "Group-B Elective-VI: Big Data Analytics",
					units: [
						{ name: "Introduction to Big Data" },
						{ name: "Hadoop Ecosystem" },
						{ name: "MapReduce Programming" },
						{ name: "Spark and Real-time Processing" },
						{ name: "Big Data Applications" },
					],
				},
				{
					name: "Group-B Elective-VII: Exploratory Data Analysis",
					units: [
						{ name: "Introduction to EDA" },
						{ name: "Data Summarization Techniques" },
						{ name: "Data Visualization for EDA" },
						{ name: "Outlier Detection" },
						{ name: "Multivariate Analysis" },
					],
				},
				{
					name: "Major Project (Started in 5th Semester)",
					units: [
						{ name: "Project Planning and Proposal" },
						{ name: "Literature Review and Requirement Analysis" },
						{ name: "Design and Development" },
						{ name: "Implementation and Testing" },
						{ name: "Documentation and Presentation" },
					],
				},
				{
					name: "Soft Skills",
					units: [
						{ name: "Communication Skills" },
						{ name: "Interpersonal Skills" },
						{ name: "Resume Writing and Interview Skills" },
						{ name: "Group Discussion and Presentation Skills" },
						{ name: "Time Management and Leadership" },
					],
				},
			],
		},
	],
};

async function seedCourse() {
	const { name, slug } = bcaCourseSeed;

	console.log("⏳ Checking course...");

	const existing = await db.query.courses.findFirst({
		where: eq(courses.slug, slug),
	});

	if (!existing) {
		await coursesService.createCourse(bcaCourseSeed, db);

		console.log("✅ Course created.");
	} else {
		console.log("ℹ️ Course already exists.");
	}

	console.log(`
=================================
Course seed summary
Name:      ${name}
Slug:      ${slug}
Semesters: ${bcaCourseSeed.semesters.length}
=================================
`);
}

seedCourse()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
