import type { PyqsFormValues } from "@repo/validators";
import { Layers3, Trash2 } from "lucide-react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface AddPyqQuestionProps {
	form: UseFormReturn<PyqsFormValues>;
}

const AddPyqQuestion = ({ form }: AddPyqQuestionProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "questions",
	});

	return (
		<div>
			<CardHeader className="px-5 py-4">
				<div className="flex items-center gap-2">
					<Layers3 className="h-4 w-4 text-muted-foreground" />
					<CardTitle className="font-semibold text-sm">Add Questions</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="">
					{fields.map((field, index) => (
						<div className="flex items-center gap-2 p-2" key={field.id}>
							<Input
								{...form.register(`questions.${index}.question`)}
								className="w-full flex-1"
								placeholder={`Question ${index + 1}`}
							/>

							<Button
								className="border border-destructive bg-transparent text-destructive"
								onClick={() => remove(index)}
								type="button"
							>
								<Trash2 />
							</Button>
						</div>
					))}
				</div>
				<div className="flex items-center justify-end">
					<Button
						onClick={() =>
							append({
								question: "",
							})
						}
						type="button"
					>
						+ Add Question
					</Button>
				</div>
			</CardContent>
		</div>
	);
};

export default AddPyqQuestion;
