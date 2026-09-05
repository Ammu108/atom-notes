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
						{
							name: "Sets, Relations and Functions",
							description:
								"Set, Set Operations, Properties of Set operations, Subset, Venn Diagrams, Cartesian Products, Relation on a Set, Properties of Relations, Representing Relations using matrices and digraphs, Types of Relations, Equivalence Relation, Equivalence relation and partition on set, Closures of Relations, Warshall’s algorithm.Functions, properties of functions (domain, range), composition of functions, surjective (onto), injective (one-to-one) and bijective functions, inverse of functions. Exponential and Logarithmic functions, Polynomial functions, Ceiling and Floor functions.",
						},
						{
							name: "Counting and Recurrence Relations",
							description:
								"Basics of counting, Pigeonhole Principle, permutations, combinations, Binomial coefficients, and Binomial Theorem. Recurrence relations, their order, and methods for solving linear recurrence relations with constant coefficients using characteristic equation roots (real roots only).Non-linear recurrence relations and generating functions.",
						},
						{
							name: "Elementary Graph Theory",
							description:
								"Basic terminologies of graphs, connected and disconnected graphs, subgraphs, paths, and cycles, complete graphs, digraphs, weighted graphs, Euler and Hamiltonian graphs, as well as trees, their properties and the concept of spanning trees, and planar graphs, along with definitions and basic results related to these topics.",
						},
						{
							name: "Matrix Algebra",
							description:
								"Types of matrices and their algebraic operations such as addition, subtraction, and multiplication.Determinants, symmetric and skew-symmetric matrices, orthogonal matrices, the rank and inverse of a matrix, and applications of matrices in solving systems of linear equations using Cramer’s Rule. Eigen values, eigenvectors, Cayley-Hamilton Theorem.",
						},
					],
				},
				{
					name: "Computer Architecture",
					units: [
						{
							name: "Digital Principles",
							description:
								"Definition of digital signals, digital logic, digital computers, Von Neumann Architecture, Boolean Laws, and Theorems. K-Map: Truth tables to K-Map, 2, 3, and 4-variable K-Map, K-Map simplifications, Don't care conditions, SOP and POS. Number Systems: Decimal, Binary, Octal, Hexadecimal number systems, number system conversions, binary arithmetic, addition and subtraction of BCD, octal arithmetic, hexadecimal arithmetic. Binary Codes: Decimal codes, error detecting and correcting codes, ASCII, EBCDIC, Excess-3 Code, Gray Code.",
						},
						{
							name: "Combinational Circuits",
							description:
								"Half Adder, Full Adder, Subtractor, Decoders, Encoder, Multiplexer, Demultiplexer. Sequential Circuits: Flip-Flops-SR Flip-Flop, D Flip-Flop, J-K Flip-Flop, T Flip-Flop. Registers: 4-bit register with parallel load, shift registers – bidirectional shift register with parallel load. Binary Counters: 4-bit synchronous and asynchronous binary counter.",
						},
						{
							name: "Basic Computer Organization",
							description:
								"Instruction codes, computer registers, computer instructions, timing and control, instruction cycle, memory-reference instructions, input-output interrupt, complete computer description, design of basic computer, design of accumulator logic. Central Processing Unit: Introduction, general register organization, stack organization, instruction formats, addressing modes, data transfer and manipulation, program control, Reduced Instruction Set Computer (RISC), RISC vs CISC.",
						},
						{
							name: "Pipeline and Vector Processing",
							description:
								"Parallel processing, pipelining, arithmetic pipeline, instruction pipeline, RISC pipeline. Input-Output Organization: Peripheral devices, input-output interface,",
						},
					],
				},
				{
					name: "Indian Knowledge System",
					units: [
						{
							name: "Introduction to IKS",
							description:
								"Caturdaśa Vidyāsthānam, 64 Kalas, Shilpa Śāstra, Four Vedas, Vedāṅga, Indian Philosophical Systems, Vedic Schools of Philosophy (Sāṃkhya and Yoga, Nyaya and Vaiśeṣika, Pūrva-Mīmāṃsā and Vedānta), Non-Vedic schools of Philosophical Systems (Cārvāka, Buddhist, Jain), Puranas (Maha-puranas, Upa-Puranas and Sthala-Puranas), Itihasa (Ramayana, Mahabharata), Nīti Sastras, Subhasitas.",
						},
						{
							name: "Foundation Concept for Science & Technology",
							description:
								"Linguistics & Phonetics in Sanskrit (panini's), Computational concepts in Astadhyayi Importance of Verbs, Role of Sanskrit in Natural Language Processing, Number System and Units of Measurement, concept of zero and its importance, Large numbers & their representation, Place Value of Numerals, Decimal System, Measurements for time, distance and weight, Unique approaches to represent numbers (Bhūta Saṃkhya System, Kaṭapayādi System), Pingala and the Binary system, Knowledge Pyramid, Prameya – A Vaiśeṣikan approach to physical reality, constituents of the physical reality, Pramāṇa, Saṃśaya.",
						},
						{
							name: "Indian Mathematics & Astronomy in IKS",
							description:
								"Indian Mathematics, Great Mathematicians and their contributions, Arithmetic Operations, Geometry (Sulba Sutras, Aryabhatiya-bhasya), value of $pi$, Trigonometry, Algebra, Chandah Sastra of Pingala, Indian Astronomy, celestial coordinate system, Elements of the Indian Calendar Aryabhatiya and the Siddhantic Tradition Pancanga – The Indian Calendar System Astronomical Instruments (Yantras) Jantar Mantar or Raja Jai Singh Sawai. ",
						},
						{
							name: "Indian Science & Technology in IKS",
							description:
								"Indian S & T Heritage, sixty-four art forms and occupational skills (64 Kalas), Metals and Metalworking technology (Copper, Gold, Zinc, Mercury, Lead and Silver), Iron & Steel, Dyes and Painting Technology, Town & Planning Architecture in India, Temple Architecture, Vastu Sastra.",
						},
						{
							name: "Humanities & Social Sciences in IKS",
							description:
								"Health, Wellness & Psychology, Ayurveda Sleep and Food, Role of water in wellbeing Yoga way of life Indian approach to Psychology, the Triguṇa System Body-Mind-Intellect-Consciousness Complex. Governance, Public Administration & Management reference to ramayana, Artha Sastra, Kauṭilyan State.",
						},
					],
				},
				{
					name: "Problem Solving Techniques",
					units: [
						{
							name: "Problem-Solving and Algorithm Development",
							description:
								"Problems And Problem Instances, Generalization and Special Cases, Types of Computational Problems, Classification of Problems, Analysis of Problems, Solution Approaches, Algorithm Development, Analysis of Algorithm, Efficiency, Correctness, Role of Data Structures in Problem Solving, Problem-Solving Steps (Understand the Problem, Plan, Execute, And Review), Breaking the Problem into Subproblems, Input/output Specification, Input Validation, Pre and Post Conditions.",
						},
						{
							name: "Structured Programming Concepts and Data Representation",
							description:
								"Sequence (Input/Output/Assignment); Selection (If, If-Else) And Repetition (For, While, Do-While) Statements, Control Structure Stacking and Nesting. Different Kinds of Repetitions: Entry Controlled, Exit Controlled, Counter Controlled, Definite, Indefinite and Sentinel-Controlled repetitions. Pseudocode and Flowcharts. Definition And Characteristics of algorithms, Standard Algorithm Format. Problems Involving Iteration and Nesting: Displaying Different Patterns and Shapes Using Symbols and Numbers, Generating Arithmetic and Geometric Progression, Fibonacci and Other Sequences, Approximate Values For n, Sin(x), Cos(x), Etc. Using Taylor Series. Different Kinds of Data in The Real World and How They are Represented in The Computer Memory. Representation of Integers: Signed Magnitude Form, 1's Complement And 2's Complement. Representation of Real Numbers: IEEE 754 Floating Point Representation. Representation of Characters: ASCII, UNICODE. C Language and Basic Programming Constructs: Introduction To Programming Languages, Different Generations of Programming Languages. Typed Vs Typeless Programming Languages, History of C Language, An Empty C Program. C Language Counterparts For Input (scanf()), Output (printf()) Statements, Assignment, Arithmetic, Relational and Logical Operators. If, If-Else Statements, For, While, Do-While Statements. Data Types. Translating Pseudocode/Algorithm to C Program. Incremental Compilation and Testing of The C Program. Simple Problems Involving Input, Output, Assignment Statement, Selection and Repetition. Good Coding Practices.",
						},
						{
							name: "Problems on Numbers and Basic Statistical Operations",
							description:
								"Extracting Digits of a Number (Left to Right and Right to Left), Palindrome, Prime Number, Prime Factors, Amicable Number, Perfect Number, Armstrong Number, Factorial, Converting Number from One Base to Another. Statistics (Maximum, Minimum, Sum and Average) on a Sequence of Numbers which are Read using Sentinel Controlled Repetition using only a few Variables. C Language: else-if Ladder, switch Case, Increment/Decrement Operators, break and continue Statements.",
						},
						{
							name: "Modular Programming, Arrays, and Debugging",
							description:
								"Modular Programming and Arrays: Modular Programming, Top-Down and Bottom-Up Approaches to Problem Solving. Recursion. Problems on Arrays: Reading and Writing of Array Elements, Maximum, Minimum, Sum, Average, Median and Mode. Sequential And Binary Search. Any one Sorting Algorithm. Matrix Operations. Implementation in C Language: Function Definition and Declaration (Prototype), Role of Return Statement, Recursion, One Dimensional and Two-Dimensional Arrays. String Functions. Other Operators, Operator Precedence and associativity. Debugging: Identify and fix errors. Different types of debugging techniques.",
						},
					],
				},
				{
					name: "General English – I",
					units: [
						{
							name: "Vocabulary Building",
							description:
								"The concept of Word Formation, Root words from foreign languages and their use in English, Acquaintance with prefixes and suffixes from foreign languages in English to form derivatives, Synonyms, antonyms, and standard abbreviations.",
						},
						{
							name: "Basic Writing Skills",
							description:
								"Sentence Structures, Use of phrases and clauses in sentences, Importance of proper punctuation, Creating coherence, Organizing principles of paragraphs in documents, Techniques for writing precisely.",
						},
						{
							name: "Identifying Common Errors in Writing",
							description:
								"Subject-verb agreement, Noun-pronoun agreement, Misplaced modifiers, Articles, Prepositions, Redundancies, Tenses.",
						},
						{
							name: "Nature and Style of Sensible Writing",
							description:
								"Describing, Defining, Classifying, providing examples or evidence, Writing introduction and conclusion.",
						},
						{
							name: "Writing Practices",
							description: "Comprehension, Précis Writing, Essay Writing.",
						},
						{
							name: "Oral Communication",
							description:
								"Listening Comprehension, Pronunciation, Intonation, Stress and Rhythm, Common Everyday Situations: Conversations and Dialogues, Communication at Workplace, Interviews, Formal Presentations.",
						},
					],
				},
				{
					name: "Environmental Science and Sustainability",
					units: [
						{
							name: "Understanding Environment, Natural Resources, and Sustainability",
							description:
								"Fundamental environmental concepts and their relevance to business operations; Components and segments of the environment, the man-environment relationship, and historical environmental movements. Concept of sustainability; Classification of natural resources, Land resources: Minerals, soil, agricultural crops, natural forest products, medicinal plants, and forest-based industries and livelihoods; Land cover, land use change, land degradation, soil erosion, and desertification; Causes of deforestation; Impacts of mining and dam building on environment, forests, biodiversity, and tribal communities. Water resources: Natural and man-made sources; Uses of water; Over exploitation of surface and ground water resources; Floods, droughts, and international & interstate conflicts over water. Energy resources: Renewable and non-renewable energy sources; Use of alternate energy sources; Growing energy needs; Energy contents of coal, petroleum, natural gas and bio gas; Agro-residues as a biomass energy source. The conservation and equitable use of resources, considering both intergenerational and intragenerational equity, and the importance of public awareness and education.",
						},
						{
							name: "Ecosystems, Biodiversity, and Sustainable Practices",
							description:
								"Various natural ecosystems, learning about their structure, functions, and ecological characteristics. The importance of biodiversity, the threats it faces, and the methods used for its conservation. Ecosystem resilience, homeostasis, and carrying capacity, emphasizing the need for sustainable ecosystem management. Strategies for in situ and ex situ conservation, nature reserves, and the significance of India as a mega diverse nation.",
						},
						{
							name: "Social Issues, Legislation, and Practical Applications",
							description:
								"Dynamic interactions between society and the environment, with a focus on sustainable development and environmental ethics. Role of businesses in achieving sustainable development goals and promoting responsible consumption. Overview of key environmental legislation and the judiciary's role in environmental protection, including the Water (Prevention and Control of Pollution) Act of 1974, the Environment (Protection) Act of 1986, and the Air (Prevention and Control of Pollution) Act of 1981. Development – Environment conflict (displacement, resettlement and rehabilitation) and compensation mechanism to project affected people (PAP); Sustainable Development Goals: India's National Action Plan on Climate Change and its major missions, human population growth, and demographic changes in India.",
						},
						{
							name: "Environmental Pollution, Waste Management, and Sustainable Development",
							description:
								"Various types of environmental pollution, including air, water, noise, soil, and marine pollution, and their impacts on businesses and communities. Causes of pollution, such as global climate change, ozone layer depletion, the greenhouse effect, and acid rain, with a particular focus on pollution episodes in India. Importance of adopting cleaner technologies; Solid waste management; Natural and man-made disasters, their management, and the role of businesses in mitigating disaster impacts.",
						},
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
						{
							name: "Logic and Methods of Proofs",
							description:
								"Propositions, logical operations (basic connectives), compound statements, construction of truth table, quantifiers, conditional statements, tautology, contradiction, logical equivalence. Conjunctive Normal Forms (CNF) and Disjunctive Normal Forms (DNF). Methods of Proofs: Rules of inference for propositional logic, modus ponens, modus tollens, syllogism, proof by contradiction, Mathematical Induction.",
						},
						{
							name: "Algebraic Structures",
							description:
								"Semi-group, Monoid, Group, Abelian Group, Subgroup, Properties of Subgroup, Cyclic group.",
						},
						{
							name: "Numerical Methods",
							description:
								"Concept and importance of errors in numerical methods. Solution of algebraic and transcendental equations: Bisection method and Newton-Raphson methods. Numerical Interpolation: Newton's Forward and Newton's Backward interpolation formula and Lagrange's formula. Numerical Integration: Quadrature Formula, Trapezoidal rule, Simpson's 1/3 rule and Simpson's 3/8 rule (only formulae and applications for all the topics mentioned in this unit)",
						},
						{
							name: "Optimization Techniques",
							description:
								"Linear programming: Introduction, LP formulation, Graphical method for solving LPs with two variables, Special cases in graphical methods, Simplex method, Duality. Transportation problem: Definition, Linear form, North-west corner method, least cost method, Vogel's approximation method for finding feasible solution, MODI method for finding optimum solution.",
						},
					],
				},
				{
					name: "Data Structures",
					units: [
						{
							name: "Definition, Classification and Operations of Data Structures",
							description:
								"Definition of data structures, Types of Data Structures: Linear and Non-Linear Data Structure, Algorithms: Complexity, Time-Space Tradeoff. Difference between algorithm and programs. Arrays: Definition and Classification of Arrays, Representation of Linear Arrays in Memory, Operations on Linear Arrays: Traversing, Inserting, Deleting, Searching, Sorting and Merging. Searching: Linear Search and Binary Search, Comparison of Methods. Sorting: Bubble Sort, Selection Sort, and Insertion Sort. Multi-Dimensional Arrays: Representation of Two-Dimensional Arrays in Memory, Matrices and Sparse Matrices, Multi-Dimensional Arrays.",
						},
						{
							name: "Linked Lists and Hashing",
							description:
								"Linked Lists: Definition, Comparison with Arrays, Representation, Types of Linked lists, Traversing, Inserting, Deleting and Searching in Singly Linked List, Doubly Linked List and Circular Linked List. Applications of Linked Lists: Addition of Polynomials. Hashing and Collision: Hashing, Hash Tables, Types of Hash Functions, Collision, Collision Resolution with Open Addressing and Chaining.",
						},
						{
							name: "Stacks, Queues, and Recursion",
							description:
								"Stacks: Definition, Representation of Stacks using Arrays and Linked List, Operations on Stacks using Arrays and Linked List. Application of Stacks: Arithmetic Expressions, Polish Notation, Conversion of Infix Expression to Postfix Expression, Evaluation of Postfix Expression. Recursion: Definition, Recursive Notation, Runtime Stack. Applications of Recursion: Factorial of Number, GCD, Fibonacci Series and Towers of Hanoi. Queues: Definition, Representation of Queues using Array and Linked List, Types of Queue: Simple Queue, Circular Queue, Double-Ended queue, Priority Queue, Operations on Simple Queues and Circular Queues using Array and Linked List. Applications of Queues: Various use cases in problem-solving.",
						},
						{
							name: "Graphs and Trees",
							description:
								"Graphs: Definition, Terminology, Representation, Traversal. Trees: Definition, Terminology, Binary Trees, Traversal of Binary Tree, Binary Tree Representation: Array Representation and Pointer (Linked List) Representation. Binary Search Tree: Inserting, Deleting and Searching in Binary Search Tree. Height Balanced Trees: AVL Trees, Insertion and Deletion in AVL Tree.",
						},
					],
				},
				{
					name: "Operating Systems",
					units: [
						{
							name: "Operating Systems (OS) Overview",
							description:
								"Definition, Evaluation of OS, Components & Services of OS, Structure, Architecture, types of Operating Systems, Batch Systems, Concepts of Multiprogramming and Time Sharing, Parallel, Distributed, and real-time Systems. Operating Systems Structures: Operating system services and system calls, system programs, operating system structure, operating systems generations.",
						},
						{
							name: "Process Management",
							description:
								"Process Definition, Process states, Process State transitions, Process Scheduling, Process Control Block, Threads, Concept of multithreads, Benefits of threads, Types of threads. Process Scheduling: Definition, Scheduling objectives, Scheduling algorithms, CPU scheduling Preemptive and Non-preemptive Scheduling algorithms (FCFS, SJF and RR), Performance evaluation of the scheduling Algorithms.",
						},
						{
							name: "Process Synchronization and Deadlocks",
							description:
								"Process Synchronization: Introduction, Inter-process Communication, Race Conditions, Critical Section Problem, Mutual Exclusion, Semaphores, problems of synchronization, readers and writers problem, dining philosophers problem, Monitors. Deadlocks: System model, deadlock characterization, deadlock prevention, avoidance, Banker's algorithm, Deadlock detection, and recovery from deadlocks.",
						},
						{
							name: "Memory Management and Virtual Memory",
							description:
								"Memory Management: Logical and Physical address map, Swapping, Memory allocation, MFT, MVT, Internal and External fragmentation and Compaction, Paging, and Segmentation. Virtual Memory: Demand paging, Page Replacement algorithms, Allocation of frames, thrashing.",
						},
					],
				},
				{
					name: "Object Oriented Programming Using Java",
					units: [
						{
							name: "Fundamentals of Object-Oriented Programming and Java Overview",
							description:
								"Fundamentals of Object-Oriented Programming – Basic Concepts of Object-Oriented Programming (OOP), Benefits and Applications of OOP. Java Evolution – Java Features, Difference between Java, C and C++, Java and Internet, Java Environment. Overview of Java Language – Setting up Java Development Environment (JDK, IDEs), Introduction to Simple Java Program, Use of Comments and Math functions, Application of two classes, Java Program Structure, Java Tokens and Statements, Implementing Java Program and JVM, Command Line Arguments.",
						},
						{
							name: "Language Constructs, Operators, and Control Statements",
							description:
								"Constants, Variables and Data Types – Constants, Variables, Primitive & Non-Primitive Data Types, Declaration of Variables, Giving values to Variables, Symbolic Constants, Typecasting. Operators & Expressions – Arithmetic operators, Relational operators, Logical operators, Assignment operators, Increment & Decrement operators, Conditional operators, Bitwise operators, Arithmetic Expressions, Evaluation of Expressions, Type Conversions in Expressions, Operator Precedence & Associativity. Decision Making, Branching & Looping – Decision Making with Control Statements (if-else, switch-case), Looping Statements (for, while, do-while), Jump in loops, Labeled loops.",
						},
						{
							name: "Classes, Objects, Arrays, and Inheritance",
							description:
								"Classes, Objects and Methods – Java Keywords, Defining Class, Instance Variables & Methods, Creating Objects, Methods Declaration, Constructors, this keyword, Static Members (Variables & Methods). Arrays, Strings and Vectors – 1D Arrays, Creating an Array, 2D Arrays, Strings, Vectors, Wrapper Classes, Enumerated Types. Inheritance – Defining Classes & Objects, Access Modifiers, Extending Classes and Implementing Interfaces, Multiple Inheritance using Interfaces and Polymorphism (Method Overloading & Overriding Methods).",
						},
						{
							name: "Packages and Exception Handling",
							description:
								"Packages – Basics of Packages, System Packages, Creating and Accessing Packages, Creating User-Defined Packages, Adding Class to a Package. Exception Handling – Using the main keywords of exception handling: try, catch, throw, throws and finally; Nested try, Multiple catch statements, Creating User-Defined Exceptions.",
						},
					],
				},
				{
					name: "Web Technologies",
					units: [
						{
							name: "HTML, CSS, Bootstrap, and WWW Fundamentals",
							description:
								"Introduction to HTML – History of HTML, objectives, basic structures of HTML, header tags, body tags, paragraph tags, and formatting tags. Tags for form creation: TABLE, FORM, TEXTAREA, SELECT, IMG, IFRAME, FIELDSET, ANCHOR, AUDIO, and VIDEO. Lists in HTML, introduction to the DIV tag, NAVBAR design. Introduction to CSS – Types of CSS, selectors, and responsiveness of a web page. Introduction to Bootstrap – Downloading/linking Bootstrap, using Bootstrap classes, understanding the grid system in Bootstrap. Bootstrap typography, Jumbotron, button group, Glyphicons, pagination, pager, list group, and carousel. Introduction to WWW – Protocols and programs, applications and development tools, web browsers, DNS, web hosting providers. Setting up Windows/Linux/Unix web servers, web hosting in the cloud, and types of web hosting.",
						},
						{
							name: "JavaScript, AJAX, XML, XHTML, and JSON",
							description:
								"Introduction to JavaScript – Functions and events, Document Object Model (DOM) traversal using JavaScript. Output systems in JavaScript: alert, throughput, input box, and console. Variables and arrays in JavaScript, date, and string handling. Manipulating CSS through JavaScript – Form validation techniques: required validator, length validator, and pattern validator. Advanced JavaScript – JavaScript error handling, JavaScript Object-Oriented Programming (OOP), JavaScript libraries and frameworks, JavaScript Browser Object Model (BOM), and ES6 features. Combining HTML, CSS, and JavaScript – Handling events and buttons, controlling the browser. Introduction to AJAX – Purpose, advantages, disadvantages, AJAX-based web applications, and alternatives to AJAX. Introduction to XML – Uses, key concepts, DTD & schemas, XSL, XSLT, XSL elements, and transforming XML using XSLT. Introduction to XHTML – Key concepts and features. Introduction to JSON – Keys and values, types of values, arrays, and objects.",
						},
					],
				},
				{
					name: "Indian Constitution",
					units: [
						{
							name: "The Constitution",
							description:
								"Introduction, The History of the Making of the Indian Constitution, Preamble and the Basic Structure, and its interpretation, Fundamental Rights and Duties and their interpretation, State Policy Principles.",
						},
						{
							name: "Union Government",
							description:
								"Structure of the Indian Union, President – Role and Power, Prime Minister and Council of Ministers, Lok Sabha, and Rajya Sabha.",
						},
						{
							name: "State Government",
							description:
								"Governor – Role and Power, Chief Minister and Council of Ministers, State Secretariat.",
						},
						{
							name: "Local Administration",
							description:
								"District Administration, Municipal Corporation, Zila Panchayat.",
						},
						{
							name: "Election Commission",
							description:
								"Role and Functioning, Chief Election Commissioner, State Election Commission.",
						},
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
						{
							name: "Basic Concepts of Statistics, Central Tendency, and Dispersion",
							description:
								"Basic Concepts of Statistics: Qualitative and Quantitative Data, Classification of Data, Construction of Frequency Distribution, Diagrammatic Representation of Data. Measures of Central Tendency: Arithmetic Mean, Median and Mode Their Properties. Measures of Dispersion: Range, Coefficient of Range, Quartiles, Quartile Deviations, Mean Deviations, Coefficient of Mean Deviations, Standard Deviation and Variance for All Types of Frequency Distribution.",
						},
						{
							name: "Correlation and Regression",
							description:
								"Correlation: Definition, Scatter Diagram, Types of Correlation, Measures—Karl Pearson's Correlation Coefficient and Spearman's Rank Correlation Coefficient. Regression: Definition of Regression, Regression Lines, Regression Coefficients",
						},
						{
							name: "Probability, Random Variables, and Standard Distributions",
							description:
								"Concepts of Probability: Experiment and Sample Space, Events and Operations with Events, Probability of an Event, Basic Probability Rules, Applications of Probability Rules, Conditional Probability. Random Variables: Discrete and Continuous Random Variable, Probability Distribution of a Random Variable, Probability Mass Function, Probability Density Function, Expectation and Variance of a Random Variable. Standard Probability Distributions: Binomial Distribution, Poisson Distribution, Mean and Variance of Binomial and Poisson Distribution, Normal Distribution. Exponential Distribution.",
						},
						{
							name: "Sampling Distribution and Hypothesis Testing",
							description:
								"Sampling Distribution: Concept of Population and Sample, Parameter and Statistic, Sampling Distribution of Sample Mean and Sample Proportion. Statistical Inference: Estimation and Hypothesis Testing (Only Concept). Hypothesis Testing for a Single Population: Concept of a Hypothesis Testing, Tests Involving a Population Mean and Population Proportion (Z Test and T Test). Chi Square Test for Independence of Attributes and Goodness of fit.",
						},
					],
				},
				{
					name: "Database Management Systems",
					units: [
						{
							name: "Introduction to Databases, Data Models, and Database Design",
							description:
								"Introduction to Databases: Definition and Importance Of DBMS, History and Evolution of DBMS, Characteristics of DBMS, Advantages and Disadvantages of DBMS, Roles of Database Users and Administrators Data Models: Introduction to Data Models, Types of Data Models (Hierarchical, Network, Relational, Object-Oriented), Importance of Data Models In DBMS Database Design: Keys: Primary Key, Candidate Key, Super Key, Foreign Key, Composite Key, Alternate Key, Unique Key, Surrogate Key, Constraints in A Table: Primary Key, Foreign Key, Unique Key, NOT NULL, CHECK, Entity-Relationship (ER) Model, Entities and Entity Sets, Attributes and Relationships, ER Diagrams, Key Constraints and Weak Entity Sets, Extended ER Features, Introduction to the Relational Model and Relational Schema",
						},
						{
							name: "Relational Algebra, SQL, and Advanced SQL",
							description:
								"Relational Algebra and Calculus: Introduction to Relational Algebra. Operations: Selection, Projection, Set Operations, Join Operations, Division, Tuple and Domain Relational Calculus Structured Query Language (SQL): SQL Basics: DDL And DML, Aggregate Functions (Min(), Max(), Sum(), Avg(), Count()), Logical Operators (AND, OR, NOT), Predicates (Like, Between, Alias, Distinct), Clauses(Group By, Having, Order By, Top/Limit), Inner Join, Natural Join, Full Outer Join, Left Outer Join, Right Outer Join, Equi Join. Advanced SQL: Analytical Queries, Hierarchical Queries, Recursive Queries, Views, Cursors, Stored Procedures and Functions, Packages, Triggers, Dynamic SQL.",
						},
						{
							name: "Normalization, Transaction Management, and Database Storage & Indexing",
							description:
								"Normalization And Database Design: Functional Dependencies: Armstrong's Axioms, Definition, Properties (Reflexivity, Augmentation, Transitivity), Types (Trivial, Non-Trivial, Partial and Full Functional Dependency), Closure of Functional Dependencies, Normal Forms (1NF, 2NF, 3NF, BCNF), Denormalization. Transaction Management: Acid Properties, Transactions and Schedules, Concurrent Execution of Transactions, Lock-Based Concurrency Control, Performance of Locking, Transaction Support In SQL, Introduction to Crash Recovery, 2pl, Serializability, And Recoverability, Introduction to Lock Management, Dealing with Deadlocks Database Storage and Indexing: Data on External Storage, File Organizations and Indexing, Index Data Structures, Comparison of File Organizations, Indexes and Performance Tuning, Guidelines for Index Selection",
						},
						{
							name: "NoSQL Databases, Big Data, and Database Security",
							description:
								"NoSQL Databases and Big Data: Introduction to NoSQL, Data Models: Document, Key Value, Column Family, Graph. Uses and Features of NO/SQL Document Databases. CAP Theorem, BASE Vs ACID, CRUD Operations, MongoDB Operators, Overview of Big Data Technologies: Hadoop, MongoDB, Cassandra. Database Security and Advanced Topics: Introduction to Database Security, Access Control, Discretionary Access Control, Introduction to Data Ware housing, OLAP, Data Mining",
						},
					],
				},
				{
					name: "Software Engineering",
					units: [
						{
							name: "Software Process Models and Agile Software Development",
							description:
								"The Evolving Role of Software, Changing Nature of Software, Layered Technology, A Process Framework, Process Models: Waterfall Model, Incremental Process Models, Evolutionary Process Models, Unified Process. Spiral Model. Agile Software Development: Agility Principles, Agile Methods, Plan-Driven and Agile Development, Extreme Programming, Scrum, A Tool Set for The Agile Process.",
						},
						{
							name: "Requirements Engineering, Risk Management, and Project Planning",
							description:
								"Software Requirements Engineering: Functional and Non-Functional Requirements, The Software Requirements Document, Requirements Specification, Requirements Engineering Processes, Requirements Elicitation and Analysis, Requirements Validation, Requirements Management. Risk Management: Reactive Vs Proactive Risk Strategies, Software Risks, Risk Identification, Risk Projection, Risk Refinement, RMMM, RMMM Plan. Project Planning- Software Pricing, Plan-Driven Development, Project Scheduling, Agile Planning, Estimation Techniques.",
						},
						{
							name: "Software Design, Implementation, Testing Strategies, and Product Metrics",
							description:
								"Design: Design Process and Design Quality, Design Concepts, The Design Model, Software Architecture, Data Design, Architectural Design, Basic Structural Modeling, Class Diagrams, Sequence Diagrams, Collaboration Diagrams, Use Case Diagrams, Component Diagrams. Software Implementation-Relationship Between Design and Implementation: Implementation Issues and Programming Support Environment; Coding the Procedural Design, Coding Style and Review of Correctness and Reliability. Testing Strategies: A Strategic Approach to Software Testing, Test Strategies for Conventional Software, Black-Box and White-Box Testing, Validation Testing, System Testing, The Art of Debugging. Product Metrics: Software Quality, Metrics for Analysis Model, Metrics for Design Model, Metrics for Source Code, Metrics for Testing, Metrics for Maintenance.",
						},
						{
							name: "Quality Management, Release Management, and Product Sustenance",
							description:
								"Quality Management: Quality Concepts, Software Quality Assurance, Software Reviews, Formal Technical Reviews, Statistical Software Quality Assurance, Software Reliability. Release Management: Release Planning, Development and Build Plans, Release Strategies, Risk Management, And Post-Deployment Monitoring. Product Sustenance: Maintenance, Updates, End of Life, Migration Strategies.",
						},
					],
				},
				{
					name: "Group-A: Elective-I – Feature Engineering",
					units: [
						{
							name: "Introduction to Feature Engineering and Preprocessing",
							description:
								"Introduction to Feature Engineering: Introduction to Data and Features: Importance of Features in Machine Learning. Data types and features: Numerical, Categorical, Ordinal, Discrete, Continuous, Interval and Ratio. Basic Feature Preprocessing: Handling Missing Data, Data Cleaning, Feature Scaling, Normalization, and Transformation.",
						},
						{
							name: "Feature Engineering Techniques, Selection, and Reduction",
							description:
								"Feature Engineering Techniques: Techniques for Numerical Data: Binning and Discretization, Polynomial and Interaction Features. Categorical Data Techniques: One Hot Encoding, Label Encoding. Feature extraction vs. feature selection, Steps in feature selection. Feature Selection Methods: Filter, Wrapper, and Hybrid. Feature Reduction: Introduction and application of Principal Components Analysis.",
						},
					],
				},
				{
					name: "Group-B: Elective-I – Basics of Data Analytics using Spreadsheet",
					units: [
						{
							name: "Introduction to Data Analytics",
							description:
								"Understanding Data and its Types (Structured, Unstructured, Semi-Structured)-What is Data Analytics, Types of Data Analytics, Importance of Data Analytics, Applications of Data Analytics, Introduction to Spreadsheet Tools (Excel/Google Sheets)",
						},
						{
							name: "Data, Ethics, and Industry : Case Studies",
							description:
								"Data Collection Methods – Different Data Sources & Format – Data Cleaning and Transformation – Handling Missing Data and Outliers, Removing Duplicates – Ethical Considerations in Data Analytics.- Real-world Applications of Data Analytics- Industry-specific Applications (Finance, Marketing, Operations, Healthcare, Manufacturing/Supply Chain) – Case Study Note: Case study is for discussion not to be considered for evaluation.",
						},
					],
				},
				{
					name: "Group-C: Elective-I – Web Programming-I",
					units: [
						{
							name: "Introduction to Web & Full-Stack Development, HTML5, CSS3, Bootstrap, and Tailwind CSS",
							description:
								"Introduction to Web & Full-Stack Development: Web Development Overview, Types of Developers: Front-End, Back-End, Full-Stack, Client-Server Architecture, HTTP/HTTPS Protocols, Modern Full-Stack Stacks: MERN, MEVN, LAMP. HTML5 – Structure of Web Pages: HTML Elements, Tags, Attributes, Semantic Tags (header, footer, section), Lists, Tables, Forms, Media Tags: <img>, <video>, <audio>, Form Validation (basic), Accessibility Basics (alt text, labels). CSS3 – Styling Web Pages: Selectors, Properties, and Values, Box Model, Display: block, inline, inline-block, flex, grid, Positioning: static, relative, absolute, fixed, CSS Units (px, %, em, rem), Pseudo-classes and pseudo-elements, Transitions & Animations, CSS Frameworks: Bootstrap: Grid System, Components(Button, Form, Grid, Link, Nav Bar etc.), Utilities. Tailwind CSS (basics)",
						},
						{
							name: "JavaScript – Programming for the Web and Introduction to React.js",
							description:
								"JavaScript – Programming for the Web: Variables: var, let, const, Data Types & Operators, Control Structures: if-else, switch, Loops: for, while, do-while, Functions & Arrow Functions, Arrays and Array Methods (map, filter, reduce), Objects and JSON, DOM Manipulation: querySelector, addEventListener, Events: onClick, onSubmit, onLoad, Basic Form Validation, Introduction to ES6 Features. Introduction to React.js (Front-End Library): What is React? Why React?, JSX Syntax, Components: Functional vs Class (focus on functional), Props and State, Handling Events, Lists and Keys, Conditional Rendering, React Developer Tools (extension)",
						},
						{
							name: "Version Control with Git & GitHub and Introduction to Back-End with Node.js & Express.js",
							description:
								"Version Control with Git & GitHub: Git Installation & Configuration, Git Commands: init, add, commit, status, log, Branching and Merging, Using GitHub for Repositories, Collaboration Workflow: fork, pull request, dd GitHub Pages (deployment). Introduction to Back-End with Node.js & Express.js: What is Node.js?, npm and Package Management, Setting Up a Server with Express, Handling Routes: GET, POST, Middleware (basic usage), Serving Static Files",
						},
						{
							name: "Database Basics with MongoDB and Mini Project",
							description:
								"Database Basics with MongoDB: Introduction to NoSQL, MongoDB vs SQL, Documents, Collections, Databases, CRUD Operations using: MongoDB Compass (GUI), Mongo Shell (CLI), Connecting MongoDB with Node.js, Mongoose Introduction and Schema Design. Mini Project : Build a small full-stack application.",
						},
					],
				},
				{
					name: "Python Programming",
					units: [
						{
							name: "Introduction, Strings, and Control Flow Statements",
							description:
								"Introduction: History and Application Areas of Python; Structure of Python Program; Identifiers and Keywords; Operators and Precedence; Basic Data Types and Type Conversion Statements and Expressions; Input/Output Statements. Strings: Creating and Storing Strings, Built-In Functions for Strings; String Operators, String Slicing and Joining; Formatting Strings. Control Flow Statements: Conditional Flow Statements; Loop Control Statements; Nested Control Flow; Continue and Break Statements, Continue, Pass and Exit.",
						},
						{
							name: "Functions and Mutable & Immutable Objects",
							description:
								"Functions: Built-In Functions, Function Definition and Call; Scope and Lifetime of Variables, Default Parameters, Command Line Arguments; Lambda Functions; Assert Statement; Importing User Defined Module; Mutable and Immutable Objects: Lists, Tuples and Dictionaries; Commonly Used Functions on Lists, Tuples and Dictionaries. Passing Lists, Tuples and Dictionaries as Arguments to Functions. Using Math and NumPy Module for List of Integers and Arrays. Python Classes/Object, Python Inheritance, Python Polymorphism, Python Regx,",
						},
						{
							name: "Files and Exception Handling",
							description:
								"Files: Types of Files; Creating, Reading and Writing on Text and Binary Files; The Pickle Module, Reading and Writing CSV Files. Reading and Writing of CSV and JSON Files. Exception Handling: Try-Except-Else-Finally Block, Raise Statement, Hierarchy of Exceptions, Adding Exceptions.",
						},
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
						{
							name: "Introduction To Entrepreneurship & Family Business",
							description:
								"Definition and Concept of Entrepreneurship, Entrepreneur Characteristics Classification of Entrepreneurs, Role of Entrepreneurship in Economic Development–Start-Ups, Knowing the Characteristics of Family Business with Discussion on Few Indian Cases of Family Business like Murugappa, Dabur, Wadia, Godrej, Kirloskar etc.",
						},
						{
							name: "Evaluating Business Opportunity",
							description:
								"Sources of Business Ideas and Opportunity Recognition, Guesstimating the Market Potential of a Business Idea, Feasibility Analysis of the Idea, Industry, Competition and Environment Analysis",
						},
						{
							name: "Building Blocks of Starting Ventures",
							description:
								"Low-Cost Marketing using Digital Technologies, Team Building from Scratch, Venture Funding, Establishing the Value-Chain and Managing Operations, Legal Aspects like IPR and Compliances",
						},
						{
							name: "Start-Up Ecosystem",
							description:
								"Components of the Start-Up Eco system Including Incubators, Accelerators, Venture Capital Funds, Angel Investors etc., Various Govt. Schemes like Start-Up India, Digital India, MSME etc., Sources of Venture Funding Available in India, Source of Technology, Intellectual Property Management",
						},
					],
				},
				{
					name: "Computer Networks",
					units: [
						{
							name: "Introduction To Computer Networks",
							description:
								"Overview of Computer Networks: Definition and Objectives, Applications and Examples of Network Components and Architecture, Data Communication Components and Characteristics, Data Representation and Data Flow. Network Models: OSI Model: Layers and Functions, TCP/IP Model: Layers and Functions, Comparison Between OSI and TCP/IP Models. Network Topologies: Physical Vs. Logical Topologies, Common Topologies: Star, Ring, Bus, Mesh, Hybrid, Advantages and Disadvantages of Each Topology. Data Transmission: Guided and Unguided Media, Analog Vs. Digital Signals, Transmission Modes: Simplex, Half-Duplex, Full-Duplex, Bandwidth and Latency. Networking Devices: Routers, Switches, Hubs, Bridges, Gateways, Functions and Configurations of Each Device.",
						},
						{
							name: "Data Link Layer and Networking Protocols",
							description:
								"Data Link Layer Fundamentals: Functions of the Data Link Layer, Framing, Error Detection, and Error Correction, Flow Control Mechanisms. Ethernet: Ethernet Standards and Frame Structure, MAC Addressing and ARP, Ethernet Switching: Basic Concepts and Methods. Network Protocols: Introduction to TCP/IP Protocol Suite, IP Addressing: IPv4 and IPv6 Sub netting and CIDR Notation. Address Resolution Protocol (ARP):ARP Operation and Table, ARP Spoofing and Security Considerations. Virtual LAN(VLAN): Concept of VLAN, VLAN Tagging and Configuration, Benefits and Use Case.",
						},
						{
							name: "Network Layer and Transport Layer",
							description:
								"Network Layer: IP Routing: Static Vs. Dynamic Routing, Routing Protocols: RIP, OSPF, BGP, Network Address Translation (NAT). Transport Layer: TCP Vs. UDP: Characteristics and Use Cases, TCP Handshake and Connection Management, Flow Control and Congestion Control in TCP. Congestion Control Algorithms: Techniques: Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery, TCP Variants: TCP Reno, TCP Vegas. Quality of Service (QOS): QOS Principles and Mechanisms, Differentiated Services (DIFFSERV) And Integrated Services (INTSERV). Network Security Fundamentals: Threats and Vulnerabilities, Basic Security Mechanisms: Firewalls, VPNS, And Encryption.",
						},
						{
							name: "Application Layer and Emerging Technologies",
							description:
								"Application Layer Protocols: HTTP/HTTPS: Structure and Operation, FTP, SMTP, POP3, IMAP: Protocols and Uses, DNS: Domain Name System and Resolution. Network Applications: Web Browsing, Email Communication, File Transfer, VOICE OVER IP (VOIP) And Streaming. Emerging Technologies: Software-Defined Networking (SDN), Network Function Virtualization (NFV), Internet of Things (IOT) and its Impact on Networking, Network Management: SNMP: Simple Network Management Protocol, Network Monitoring Tools, and Techniques. Future Trends in Networking: 5G and Beyond, Network Automation and Artificial Intelligence",
						},
					],
				},
				{
					name: "Design and Analysis of Algorithms",
					units: [
						{
							name: "Algorithm Analysis and Asymptotic Notations",
							description:
								"What is an algorithm? Design and performance analysis of algorithms, time complexity, space complexity. Asymptotic notations (O, Ω, Θ) to measure growth of a function and application to measure complexity of algorithms. Analysis of sequential search, bubble sort, selection sort, insertion sort, matrix multiplication. Recursion: Basic concept. Analysis of recursive algorithms, Master's theorem.",
						},
						{
							name: "Divide & Conquer and The Greedy Design Technique",
							description:
								"The Divide & Conquer Design Technique: The general concept. Binary search, finding the maximum and minimum, merge sort, quick sort. Best and worst case analysis for the mentioned algorithms. Strassen's matrix multiplication. Lower bound for comparison-based sorting. The Greedy Design Technique: The general concept. Applications to general Knapsack problem, finding minimum weight spanning trees: Prim's and Kruskal's algorithms, Dijkstra's algorithm for finding single source shortest paths problem.",
						},
						{
							name: "Dynamic Programming and Graphs",
							description:
								"The Dynamic Programming Design Technique: Dynamic Programming with Examples Such as Knapsack. All Pair Shortest Paths -Warshal's and Floyd, The general concept, all pair shortest paths problem (Floyd-Warshal's algorithm), 0/1 Knapsack problem, Resource Allocation Problem, Longest Common Sub-sequence. Graphs: Terminology used with Graph, Data Structure for Graph Representations: Adjacency Matrices, Adjacency List, Adjacency. Graph Traversal: Depth First Search and Breadth First Search, Connected Component.",
						},
						{
							name: "Backtracking, Branch and Bound, and Computational Intractability",
							description:
								"Backtracking, Branch and Bound with Examples such as Travelling Salesman Problem. Computational Intractability: Overview of non-deterministic algorithms, P, NP, NP-Complete and NP-hard problems.",
						},
					],
				},
				{
					name: "Artificial Intelligence",
					units: [
						{
							name: "Introduction to AI",
							description:
								"What is AI? Intelligent Agents: Agents and environment, the concept of Rationality, the nature of environment, the structure of Agents. Knowledge-Based Agents: Introduction to Knowledge-Based Agents, The Wumpus World as an Example World. Problem-solving: Problem-solving agents.",
						},
						{
							name: "Advanced Search Techniques",
							description:
								"Uninformed Search: DFS, BFS, Iterative Deepening Search. Informed Search: Best First Search, A* search, AO* search. Adversarial Search & Games: Two-player zero-sum games, Minimax Search, Alpha-Beta pruning. Constraints and Constraint Satisfaction Problems (CSPs), Backtracking search for CSP. Evolutionary Search Techniques: Introduction to evolutionary algorithms, Genetic algorithms, Applications of evolutionary search in AI.",
						},
						{
							name: "Logical Reasoning and Uncertainty",
							description:
								"Logic: Propositional logic, First-order predicate logic, Propositional versus first-order inference, Unification and lifting, Inference: Forward chaining, Backward chaining, Resolution, Truth maintenance systems. Introduction to Planning: Blocks World problem, Strips; Handling Uncertainties: Non-monotonic reasoning, Probabilistic reasoning, Introduction to Fuzzy set theory.",
						},
						{
							name: "Domains and Applications of AI",
							description:
								"Domains in AI: Introduction to Machine Learning, Computer Vision, Robotics, Natural Language Processing, Deep Neural Networks, and their Applications. Expert Systems: The architecture and role of expert systems include two case studies. Legal and Ethical Issues: Concerns related to AI.",
						},
					],
				},
				{
					name: "Group-A: Elective-II – Introduction to Machine Learning",
					units: [
						{
							name: "Introduction to Machine Learning",
							description:
								"Introduction: Definition, History and Application of Machine Learning, Types of Machine Learning: Supervised, Unsupervised, Semi-Supervised, and Reinforcement Learning. Labeled and Unlabeled Dataset. Supervised Learning Tasks: Regression vs. Classification, Learning Framework: Training, Validation and Testing of ML models. Performance Evaluation Parameters: Confusion matrix, Accuracy, Precision, Recall, F1 Score, and AUC.",
						},
						{
							name: "Supervised Learning and Unsupervised Learning",
							description:
								"Regression: Linear and Non-linear Regression, Logistic Regression. Classification: Naïve Bayes, K-Nearest Neighbors, Decision Trees. Linear model: Introduction to Artificial Neural Networks, Perceptron Learning Algorithm, Single Layer Perceptron, Introduction to Support Vector Machine for linearly separable data. Clustering: K-Means, Hierarchical Clustering, DBSCAN, Clustering Validation Measures. ML Applications: Ethical Considerations in Machine Learning, Case Study and Real-world Applications.",
						},
					],
				},
				{
					name: "Group-B: Elective-II – Data Visualization",
					units: [
						{
							name: "Introduction to Data Visualization",
							description:
								"Definition and importance of data visualization-Role of data visualization in decision making- Types of data (numerical, categorical, temporal, geographical)- Data visualization process (data collection, exploration, analysis, visualization, interpretation)- Challenges and limitations of data visualization",
						},
						{
							name: "Visualization tools & Data Story telling",
							description:
								"Overview of Visualization Tools (e.g., Excel, Tableau, PowerBI, Python)- Comparing and contrasting features and Use Cases among these tools. Principles of Data Story telling: Narrative and Context-Best Practices for Dashboard Layout and Interactivity",
						},
						{
							name: "Designing Effective Visualizations",
							description:
								"Principles of Good Visualization Design - Understanding and Using Color in Visualizations – Importance of Data Modeling in Visualization",
						},
					],
				},
				{
					name: "Group-C: Elective-II – Web Programming-II",
					units: [
						{
							name: "Advanced JavaScript & ES6+ / Advanced React.js",
							description:
								"Advanced JavaScript & ES6+: Destructuring, Spread & Rest Operator, Template Literals, Promises and Fetch API, Async/Await, Closures and Scope, Hoisting and the Execution Context, Modules: import/export. Advanced React.js: useEffect Hook, React Router: BrowserRouter, Routes, Route, Link vs NavLink, Forms in React, Controlled vs Uncontrolled Components, Lifting State Up, Context API for Global State Management, Introduction to Redux (optional)",
						},
						{
							name: "Back-End API Development with Node.js + Express / Authentication and Authorization",
							description:
								"Back-End API Development with Node.js + Express: RESTful API Principles, Route Parameters and Query Strings, Request/Response Cycle, Creating APIs with Express, Middleware (Morgan, BodyParser, Helmet), Error Handling Middleware. Authentication and Authorization: User Registration & Login, Hashing Passwords with bcrypt, JSON Web Tokens (JWT) for Auth, Protecting Routes, Session vs Token-Based Auth, Role-Based Access Control (RBAC)",
						},
						{
							name: "Advanced MongoDB + Introduction to SQL / Testing Tools & Practices / Deployment & Hosting",
							description:
								"Advanced MongoDB + Introduction to SQL: Advanced Queries: $gt, $lt, $in, $or, Indexing in MongoDB., Aggregation Pipeline Basics, Relational Database Overview, Introduction to MySQL/PostgreSQL, CRUD Operations in SQL, SQL Joins, Group By, Order By. Testing Tools & Practices: Postman for API Testing, Writing Unit Tests with Jest (Basics), Test-Driven Development (TDD) Basics. Deployment & Hosting: Hosting Front-End on Vercel / Netlify, Hosting Back-End on:Render / Railway / Cyclic, Heroku (if available), CI/CD Concepts (basic intro only), Using .env for Environment Variables, Connecting Front-End and Back-End in Production",
						},
						{
							name: "Web Security Basics / Capstone Project",
							description:
								"Web Security Basics: Common Web Vulnerabilities, XSS, CSRF, SQL Injection, Input Validation and Sanitization, HTTPS, CORS, and Secure Headers, Using Helmet and CORS in Express, Rate Limiting. Capstone Project: A full-stack application with:Front-End: React, Back-End: Express.js, Database: MongoDB (or with SQL integration), Auth: JWT or Sessions, Deployment: Live and Public",
						},
					],
				},
				{
					name: "Design Thinking and Innovation",
					units: [
						{
							name: "Basics of Design Thinking",
							description:
								"Concept of Innovation and its Significance in Business, Creative Thinking Process and Problem Solving Approaches, Design Thinking Approach and its Objective, Design Thinking and Customer Centricity - Real World Examples of Customer Challenges, Use of Design Thinking to Enhance Customer Experience, Parameters of Product Experience, Alignment of Customer Expectations with Product, Discussion on Global Success Stories like Airbnb, Apple, Ideo, Netflix etc., Four Stages of Design Thinking Process - Empathize, Define, Ideate, Prototype, Implement.",
						},
						{
							name: "Learning to Empathize and Define the Problem",
							description:
								"Know the Importance of Empathy in Innovation Process - How can students Develop Empathy Using Design Tool ?, Observing and Assimilating Information, Individual Differences & Uniqueness Group Discussion and Activities to Encourage the Understanding, Acceptance and Appreciation of Individual Differences, Wicked Problems, Identification of Wicked Problems around us and the Potential Impact of their Solutions.",
						},
						{
							name: "Ideate, Prototype, and Implement",
							description:
								"Templates of Ideation like Brainstorming, Systems Thinking, Concept of Brainstorming-How to Reach Consensus on Wicked Problems?, Mapping Customer Experience for Ideation, Know the Methods of Prototyping, Purpose of Rapid Prototyping, Implementation.",
						},
						{
							name: "Feedback, Re-Design & Re-Create",
							description:
								"Feedback Loop, Focus on User Experience, Address Ergonomic Challenges, User Focused Design, Final Concept Testing, Final Presentation - Solving Problems through Innovative Design Concepts & Creative Solution",
						},
					],
				},
			],
		},

		// ---------------- SEMESTER V ----------------
		{
			semesterNumber: 5,
			subjects: [
				{
					name: "Group-A: Elective-III – Neural Network",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-A: Elective-IV – Digital Image Processing",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-A: Elective-V – Natural Language Processing",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-B: Elective-III – Introduction to Data Science",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-B: Elective-IV – Time Series Analysis",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-B: Elective-V – Machine Learning",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Quantitative Techniques",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
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
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-A: Elective-VI – Deep Learning for Computer Vision",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-A: Elective-VI – Predictive Analytics",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-B: Elective-VI – Big Data Analytics",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
					],
				},
				{
					name: "Group-B: Elective-VII –Exploratory Data Analysis",
					units: [
						{
							name: "unit 1",
							description: "none",
						},
						{
							name: "unit 2",
							description: "none",
						},
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
