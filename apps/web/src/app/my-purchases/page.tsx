import { Container } from "~/components/container";
import MyPurchasesContent from "~/features/my-purchases/_components/my-purchases-content";

const MyPurchases = async () => {
	return (
		<Container className="mx-auto">
			<div className="flex w-full flex-col gap-6 pt-24">
				<MyPurchasesContent />
			</div>
		</Container>
	);
};

export default MyPurchases;
