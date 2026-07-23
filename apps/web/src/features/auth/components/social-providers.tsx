import { userAuthClient } from "@repo/api/user-client";
import Image from "next/image";
import { Button } from "~/components/ui/button";

const SocialProviders = () => {
	const handleGoogleLogin = async () => {
		await userAuthClient.signIn.social({
			provider: "google",
			callbackURL: "/",
		});
	};

	return (
		<Button
			className="flex w-full cursor-pointer items-center justify-center gap-2 p-2"
			onClick={handleGoogleLogin}
			size="xs"
			variant="outline"
		>
			<div className="relative h-5 w-5">
				<Image
					alt="logo"
					className="h-full w-full"
					fill
					src="/google-img.webp"
				/>
			</div>
			<p>Continue With Google</p>
		</Button>
	);
};

export default SocialProviders;
