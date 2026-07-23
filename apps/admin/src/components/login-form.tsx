"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminAuthClient } from "@repo/api/admin-client";
import { cn } from "@repo/ui";
import { type AdminLoginSchema, adminLoginSchema } from "@repo/validators";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Spinner } from "./ui/spinner";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<AdminLoginSchema>({
		resolver: zodResolver(adminLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: AdminLoginSchema) => {
		try {
			setIsLoading(true);

			const { error } = await adminAuthClient.signIn.email({
				email: values.email,
				password: values.password,
			});

			if (error) {
				toast.error(error.message ?? "Invalid email or password");
				return;
			}

			toast.success("Login successful");
			router.push("/");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
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
										<div className="relative">
											<Input
												{...field}
												aria-invalid={fieldState.invalid}
												className="pr-10"
												id={field.name}
												placeholder="Enter your password"
												type={showPassword ? "text" : "password"}
											/>

											<button
												className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
												onClick={() => setShowPassword((prev) => !prev)}
												type="button"
											>
												{showPassword ? (
													<Eye className="h-4 w-4" />
												) : (
													<EyeOff className="h-4 w-4" />
												)}
											</button>
										</div>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Field>
								<Button disabled={isLoading} type="submit">
									{isLoading ? <Spinner /> : "Login"}
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
