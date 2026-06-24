import { Layers2, Plus, Trash2 } from "lucide-react";
import { memo } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
	addSubjectToSemester,
	addUnitToSubject,
	removeSubject,
	removeUnit,
	updateSubjectName,
	updateUnitName,
} from "../utils/course-form-utils";

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

const CreateSemesterCard = memo(function CreateSemesterCard({
	semester,
	setSemesters,
}: {
	semester: Semester;
	setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>;
}) {
	const addSubject = (semesterId: string) => {
		setSemesters((prev) => addSubjectToSemester(prev, semesterId));
	};

	const addUnit = (semesterId: string, subjectId: string) => {
		setSemesters((prev) => addUnitToSubject(prev, semesterId, subjectId));
	};

	const updateSubject = (
		semesterId: string,
		subjectId: string,
		name: string,
	) => {
		setSemesters((prev) =>
			updateSubjectName(prev, semesterId, subjectId, name),
		);
	};

	const deleteSubject = (semesterId: string, subjectId: string) => {
		setSemesters((prev) => removeSubject(prev, semesterId, subjectId));
	};

	const updateUnit = (
		semesterId: string,
		subjectId: string,
		unitId: string,
		name: string,
	) => {
		setSemesters((prev) =>
			updateUnitName(prev, semesterId, subjectId, unitId, name),
		);
	};

	const deleteUnit = (
		semesterId: string,
		subjectId: string,
		unitId: string,
	) => {
		setSemesters((prev) => removeUnit(prev, semesterId, subjectId, unitId));
	};

	// console.log(`Semester ${semester.number} rerender`);

	return (
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
											updateSubject(semester.id, subject.id, e.target.value)
										}
										placeholder="e.g., Mathematics, Physics"
										type="text"
										value={subject.name}
									/>
								</div>
								<Button
									className="text-destructive hover:bg-destructive/10 hover:text-destructive"
									onClick={() => deleteSubject(semester.id, subject.id)}
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
											<div className="flex items-center gap-2" key={unit.id}>
												<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">
													{index + 1}
												</div>
												<Input
													className="h-9 text-sm"
													onChange={(e) =>
														updateUnit(
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
														deleteUnit(semester.id, subject.id, unit.id)
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
	);
});

export default CreateSemesterCard;
