import { Container } from "~/components/container";
import NoteDetailPage from "~/features/notes/page";

type NoteDetailPageProps = {
	params: Promise<{ slug: string }>;
};

const NotePage = async ({ params }: NoteDetailPageProps) => {
	const { slug } = await params;

	return (
		<Container className="mx-auto">
			<NoteDetailPage slug={slug} />
		</Container>
	);
};

export default NotePage;
