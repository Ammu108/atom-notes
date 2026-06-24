export interface Unit {
	id: string;
	name: string;
}

export interface Subject {
	id: string;
	name: string;
	units: Unit[];
}

export interface Semester {
	id: string;
	number: string;
	subjects: Subject[];
}

export function createEmptyUnit(): Unit {
	return {
		id: crypto.randomUUID(),
		name: "",
	};
}

export function createEmptySubject(): Subject {
	return {
		id: crypto.randomUUID(),
		name: "",
		units: [],
	};
}

export function createSemester(number: string): Semester {
	return {
		id: `sem-${number}`,
		number,
		subjects: [],
	};
}

export function initializeSemesters(
	count: number,
	previousSemesters: Semester[],
): Semester[] {
	const semesters: Semester[] = [];

	for (let index = 1; index <= count; index++) {
		const existingSemester = previousSemesters.find(
			(semester) => semester.number === index.toString(),
		);

		semesters.push(existingSemester || createSemester(index.toString()));
	}

	return semesters;
}

export function addSubjectToSemester(
	semesters: Semester[],
	semesterId: string,
): Semester[] {
	return semesters.map((sem) => {
		if (sem.id === semesterId) {
			return {
				...sem,
				subjects: [
					...sem.subjects,
					{
						id: crypto.randomUUID(),
						name: "",
						units: [],
					},
				],
			};
		}

		return sem;
	});
}

export function updateSubjectName(
	semesters: Semester[],
	semesterId: string,
	subjectId: string,
	name: string,
): Semester[] {
	return semesters.map((semester) => {
		if (semester.id !== semesterId) {
			return semester;
		}

		return {
			...semester,
			subjects: semester.subjects.map((subject) => {
				if (subject.id !== subjectId) {
					return subject;
				}

				return { ...subject, name };
			}),
		};
	});
}

export function removeSubject(
	semesters: Semester[],
	semesterId: string,
	subjectId: string,
): Semester[] {
	return semesters.map((semester) => {
		if (semester.id !== semesterId) {
			return semester;
		}

		return {
			...semester,
			subjects: semester.subjects.filter((subject) => subject.id !== subjectId),
		};
	});
}

export function addUnitToSubject(
	semesters: Semester[],
	semesterId: string,
	subjectId: string,
): Semester[] {
	return semesters.map((semester) => {
		if (semester.id !== semesterId) {
			return semester;
		}

		return {
			...semester,
			subjects: semester.subjects.map((subject) => {
				if (subject.id !== subjectId) {
					return subject;
				}

				return {
					...subject,
					units: [...subject.units, createEmptyUnit()],
				};
			}),
		};
	});
}

export function updateUnitName(
	semesters: Semester[],
	semesterId: string,
	subjectId: string,
	unitId: string,
	name: string,
): Semester[] {
	return semesters.map((semester) => {
		if (semester.id !== semesterId) {
			return semester;
		}

		return {
			...semester,
			subjects: semester.subjects.map((subject) => {
				if (subject.id !== subjectId) {
					return subject;
				}

				return {
					...subject,
					units: subject.units.map((unit) => {
						if (unit.id !== unitId) {
							return unit;
						}

						return { ...unit, name };
					}),
				};
			}),
		};
	});
}

export function removeUnit(
	semesters: Semester[],
	semesterId: string,
	subjectId: string,
	unitId: string,
): Semester[] {
	return semesters.map((semester) => {
		if (semester.id !== semesterId) {
			return semester;
		}

		return {
			...semester,
			subjects: semester.subjects.map((subject) => {
				if (subject.id !== subjectId) {
					return subject;
				}

				return {
					...subject,
					units: subject.units.filter((unit) => unit.id !== unitId),
				};
			}),
		};
	});
}
