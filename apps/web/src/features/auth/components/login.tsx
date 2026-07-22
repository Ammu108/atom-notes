import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthClient } from "@repo/api/user-client";
import { Button, Input } from "@repo/ui";
import { type LoginSchema, loginSchema } from "@repo/validators";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";

const Login = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

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
					</div>
					<Button disabled={isLoading} size="xs" type="submit">
						{isLoading ? <Spinner /> : "Login"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Login;
