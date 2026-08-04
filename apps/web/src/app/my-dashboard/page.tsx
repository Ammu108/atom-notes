import { Container } from "~/components/container";
import MyDashboardPage from "~/features/my-dashboard/page";

const MyDashboard = () => {
	return (
		<Container className="mx-auto">
			<div className="flex w-full flex-col gap-6 pt-24">
				<div>
					<h1 className="font-semibold text-3xl text-foreground">
						My Dashboard
					</h1>
					<p className="mt-1 text-muted-foreground text-sm">
						Every note pack and question paper you've bought, in one place.
					</p>
				</div>

				<div>
					<MyDashboardPage />
				</div>
			</div>
		</Container>
	);
};

export default MyDashboard;
