import { Container } from "~/components/container";
import PyqDetailPage from "~/features/pyqs/pyq-detail-page";

type PageProps = {
	params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
	const { id } = await params;

	return (
		<Container className="mx-auto">
			<PyqDetailPage id={id} />
		</Container>
	);
};

export default page;
