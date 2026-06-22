"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@repo/ui";
import { type AdminLoginSchema, adminLoginSchema } from "@repo/validators";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { Spinner } from "./ui/spinner";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();

	const login = api.authAdmin.login.useMutation({
		onSuccess(opts) {
			toast.success(opts.message);
			router.replace("/");
			router.refresh();
		},
		onError: (error) => {
			console.error("Login failed:", error);
			toast.error(error.message);
		},
	});

	const form = useForm<AdminLoginSchema>({
		resolver: zodResolver(adminLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: AdminLoginSchema) => {
		login.mutate(values);
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
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								control={form.control}
								name="email"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											placeholder="m@example.com"
											type="email"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="password"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Password</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											placeholder="password"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Field>
								<Button disabled={login.isPending} type="submit">
									{login.isPending ? <Spinner /> : "Login"}
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
