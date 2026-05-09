"use client";
import { cn } from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();
	const utils = api.useUtils();

	const login = api.auth.login.useMutation({
		onSuccess() {
			utils.auth.me.invalidate();
			console.log("admin logged in successfully.");
			router.replace("/");
			router.refresh();
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login.mutate(form);
	};

	return (
		<div
			className={cn("m-4 flex w-full max-w-sm flex-col gap-6", className)}
			{...props}
		>
			<Card>
				<CardHeader>
					<CardTitle>Login to admin dashboard</CardTitle>
					<CardDescription>
						Enter admin email below to get access of admin account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									onChange={(e) => setForm({ ...form, email: e.target.value })}
									placeholder="m@example.com"
									required
									type="email"
									value={form.email}
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Link
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										href="#"
									>
										Forgot your password?
									</Link>
								</div>
								<Input
									id="password"
									onChange={(e) =>
										setForm({ ...form, password: e.target.value })
									}
									required
									type="password"
									value={form.password}
								/>
							</Field>
							<Field>
								<Button type="submit">
									{login.isPending ? "Logging in..." : "Login"}
								</Button>
							</Field>

							<Field>
								{login.error && (
									<div className="rounded-md bg-destructive/10 p-2">
										<p className="text-destructive text-sm">
											Login failed: {login.error.message}
										</p>
									</div>
								)}
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
