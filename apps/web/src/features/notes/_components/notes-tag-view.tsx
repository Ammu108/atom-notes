interface NoteDetailProps {
	semester: string;
	subject: string;
	unit: string;
}

const NotesTagView = ({ semester, subject, unit }: NoteDetailProps) => {
	return (
		<div className="mt-3 mb-3 flex gap-2">
			<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
				Semester {semester}
			</span>
			<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
				{subject}
			</span>
			<span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 text-xs">
				Unit - {unit}
			</span>
		</div>
	);
};

export default NotesTagView;
