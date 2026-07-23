import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthClient } from "@repo/api/user-client";
import { Input } from "@repo/ui";
import { type LoginSchema, loginSchema } from "@repo/validators";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";

const Login = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginSchema) => {
		try {
			setIsLoading(true);

			const { error } = await userAuthClient.signIn.email({
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
		<div className="w-full">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4">
					<div className="grid gap-2">
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
					</div>
					<div className="grid gap-2">
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
								</Field>
							)}
						/>
					</div>
					<Button
						disabled={isLoading}
						size="xs"
						type="submit"
						variant="primary"
					>
						{isLoading ? <Spinner /> : "Login"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Login;
