"use client";

import { BookOpen, Layers2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

interface Unit {
	id: string;
	name: string;
}

interface Subject {
	id: string;
	name: string;
	units: Unit[];
}

interface Semester {
	id: string;
	number: number;
	subjects: Subject[];
}

const CreateCoursesForm = () => {
	const [courseName, setCourseName] = useState("");
	const [semesterCount, setSemesterCount] = useState<number | "">(1);
	const [semesters, setSemesters] = useState<Semester[]>([
		{ id: "sem-1", number: 1, subjects: [] },
	]);

	const handleSemesterCountChange = (count: number) => {
		setSemesterCount(count);
		const newSemesters: Semester[] = [];
		for (let i = 1; i <= count; i++) {
			const existing = semesters.find((s) => s.number === i);
			newSemesters.push(
				existing || { id: `sem-${i}`, number: i, subjects: [] },
			);
		}
		setSemesters(newSemesters);
	};

	const addSubject = (semesterId: string) => {
		setSemesters(
			semesters.map((sem) => {
				if (sem.id === semesterId) {
					return {
						...sem,
						subjects: [
							...sem.subjects,
							{
								id: `subj-${Date.now()}`,
								name: "",
								units: [],
							},
						],
					};
				}
				return sem;
			}),
		);
	};

	const updateSubjectName = (
		semesterId: string,
		subjectId: string,
		name: string,
	) => {
		setSemesters(
			semesters.map((sem) => {
				if (sem.id === semesterId) {
					return {
						...sem,
						subjects: sem.subjects.map((subj) => {
							if (subj.id === subjectId) {
								return { ...subj, name };
							}
							return subj;
						}),
					};
				}
				return sem;
			}),
		);
	};

	const removeSubject = (semesterId: string, subjectId: string) => {
		setSemesters(
			semesters.map((sem) => {
				if (sem.id === semesterId) {
					return {
						...sem,
						subjects: sem.subjects.filter((s) => s.id !== subjectId),
					};
				}
				return sem;
			}),
		);
	};

	const addUnit = (semesterId: string, subjectId: string) => {
		setSemesters(
			semesters.map((sem) => {
				if (sem.id === semesterId) {
					return {
						...sem,
						subjects: sem.subjects.map((subj) => {
							if (subj.id === subjectId) {
								return {
									...subj,
									units: [
										...subj.units,
										{ id: `unit-${Date.now()}`, name: "" },
									],
								};
							}
							return subj;
						}),
					};
				}
				return sem;
			}),
		);
	};

	const updateUnitName = (
		semesterId: string,
		subjectId: string,
		unitId: string,
		name: string,
	) => {
		setSemesters(
			semesters.map((sem) => {
				if (sem.id === semesterId) {
					return {
						...sem,
						subjects: sem.subjects.map((subj) => {
							if (subj.id === subjectId) {
								return {
									...subj,
									units: subj.units.map((unit) => {
										if (unit.id === unitId) {
											return { ...unit, name };
										}
										return unit;
									}),
								};
							}
							return subj;
						}),
					};
				}
				return sem;
			}),
		);
	};

	const removeUnit = (
		semesterId: string,
		subjectId: string,
		unitId: string,
	) => {
		setSemesters(
			semesters.map((sem) => {
				if (sem.id === semesterId) {
					return {
						...sem,
						subjects: sem.subjects.map((subj) => {
							if (subj.id === subjectId) {
								return {
									...subj,
									units: subj.units.filter((u) => u.id !== unitId),
								};
							}
							return subj;
						}),
					};
				}
				return sem;
			}),
		);
	};

	return (
		<div className="space-y-5">
			{/* Basic Course Info */}
			<Card>
				<CardHeader className="px-5 py-4">
					<div className="flex items-center gap-2">
						<BookOpen className="h-4 w-4" />
						<CardTitle className="font-semibold text-sm">
							Course Information
						</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="grid gap-5 p-5 lg:grid-cols-2">
					<div className="space-y-2">
						<Field>
							<FieldLabel htmlFor="course-name">Course Name</FieldLabel>
							<Input
								id="course-name"
								onChange={(e) => setCourseName(e.target.value)}
								placeholder="e.g., B.Tech, BCA, MCA"
								type="text"
								value={courseName}
							/>
						</Field>
					</div>

					<div className="space-y-2">
						<Field>
							<FieldLabel htmlFor="semester-count">
								Number of Semesters
							</FieldLabel>
							<Input
								id="semester-count"
								max="16"
								min="1"
								onChange={(e) =>
									handleSemesterCountChange(
										e.target.value ? parseInt(e.target.value) : 1,
									)
								}
								placeholder="e.g., 8"
								type="number"
								value={semesterCount}
							/>
							<FieldDescription>Maximum 16 semesters</FieldDescription>
						</Field>
					</div>
				</CardContent>
			</Card>

			{/* Semesters and Subjects */}
			{semesters.map((semester) => (
				<Card key={semester.id}>
					<CardHeader className="px-5 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Layers2 className="h-4 w-4" />
								<CardTitle className="font-semibold text-sm">
									Semester {semester.number}
								</CardTitle>
							</div>
							<Button
								className="gap-2"
								onClick={() => addSubject(semester.id)}
								size="sm"
								variant="outline"
							>
								<Plus className="h-4 w-4" />
								Add Subject
							</Button>
						</div>
					</CardHeader>

					<CardContent className="space-y-4 p-5">
						{semester.subjects.length === 0 ? (
							<p className="py-4 text-center text-muted-foreground text-sm">
								No subjects added yet. Click "Add Subject" to get started.
							</p>
						) : (
							semester.subjects.map((subject) => (
								<div
									className="rounded-lg border border-input p-4 dark:bg-input/30"
									key={subject.id}
								>
									<div className="mb-4 flex items-end gap-3">
										<div className="flex-1 space-y-2">
											<FieldLabel htmlFor={`subject-name-${subject.id}`}>
												Subject Name
											</FieldLabel>
											<Input
												id={`subject-name-${subject.id}`}
												onChange={(e) =>
													updateSubjectName(
														semester.id,
														subject.id,
														e.target.value,
													)
												}
												placeholder="e.g., Mathematics, Physics"
												type="text"
												value={subject.name}
											/>
										</div>
										<Button
											className="text-destructive hover:bg-destructive/10 hover:text-destructive"
											onClick={() => removeSubject(semester.id, subject.id)}
											size="sm"
											variant="ghost"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>

									{/* Units for Subject */}
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<p className="font-medium text-muted-foreground text-sm">
												Units
											</p>
											<Button
												className="gap-1"
												onClick={() => addUnit(semester.id, subject.id)}
												size="sm"
												variant="outline"
											>
												<Plus className="h-3 w-3" />
												Add Unit
											</Button>
										</div>

										{subject.units.length === 0 ? (
											<p className="text-muted-foreground text-xs">
												No units added for this subject yet.
											</p>
										) : (
											<div className="space-y-2">
												{subject.units.map((unit, index) => (
													<div
														className="flex items-center gap-2"
														key={unit.id}
													>
														<div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">
															{index + 1}
														</div>
														<Input
															className="h-9 text-sm"
															onChange={(e) =>
																updateUnitName(
																	semester.id,
																	subject.id,
																	unit.id,
																	e.target.value,
																)
															}
															placeholder="e.g., Unit 1, Chapter 1"
															type="text"
															value={unit.name}
														/>
														<Button
															className="h-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
															onClick={() =>
																removeUnit(semester.id, subject.id, unit.id)
															}
															size="sm"
															variant="ghost"
														>
															<Trash2 className="h-3 w-3" />
														</Button>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							))
						)}
					</CardContent>
				</Card>
			))}

			{/* Submit Button */}
			<div className="flex gap-3">
				<Button className="w-full">Create Course</Button>
			</div>
		</div>
	);
};

export default CreateCoursesForm;
