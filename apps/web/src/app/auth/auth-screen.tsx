"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DialogHeader } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Login from "~/features/auth/components/login";
import SignUp from "~/features/auth/components/signup";

const AuthPage = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const activeTab = searchParams.get("tab") === "signup" ? "signup" : "login";

	const onTabChange = (nextTab: "login" | "signup") => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", nextTab);
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
			<div className="rounded-2xl border-2 border-border p-4 sm:min-w-sm">
				{/* Header */}
				<DialogHeader className="mb-5 text-left">
					<h2 className="font-extrabold text-2xl text-gray-900">
						{activeTab === "signup" ? "Create a free acount" : "Welcome back"}
					</h2>
					<p className="text-gray-500 text-sm">
						{activeTab === "signup"
							? "Sign up to start saving and managing your notes."
							: "Login to download notes and PYQ answer PDFs."}
					</p>
				</DialogHeader>

				{/* Shadcn Tabs */}
				<Tabs
					defaultValue="login"
					onValueChange={onTabChange}
					value={activeTab}
				>
					<TabsList className="mb-6 h-auto w-full rounded-none border-b bg-transparent p-0">
						<TabsTrigger
							className="rounded-none border-transparent border-b-2 data-active:border-primary data-active:bg-transparent data-active:text-primary data-active:shadow-none"
							value="login"
						>
							Login
						</TabsTrigger>
						<TabsTrigger
							className="rounded-none border-transparent border-b-2 data-active:border-primary data-active:bg-transparent data-active:text-primary data-active:shadow-none"
							value="signup"
						>
							Sign Up
						</TabsTrigger>
					</TabsList>

					{/* Login */}
					<TabsContent className="mt-0 flex flex-col gap-3" value="login">
						<Login />
					</TabsContent>

					{/* Sign Up */}
					<TabsContent className="mt-0 flex flex-col gap-3" value="signup">
						<SignUp />
					</TabsContent>
				</Tabs>

				{/* Footer */}
				<p className="mt-5 text-center text-gray-400 text-xs">
					By continuing, you agree to our{" "}
					<a
						className="underline transition-colors hover:text-gray-600"
						href="/terms"
					>
						Terms of Service
					</a>
					.
				</p>
			</div>
		</div>
	);
};

export default AuthPage;
