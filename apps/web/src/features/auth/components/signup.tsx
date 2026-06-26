import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthClient } from "@repo/api/user-client";
import { Button, Input } from "@repo/ui";
import { type SignUpSchema, signUpSchema } from "@repo/validators";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";

const SignUp = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: SignUpSchema) => {
		try {
			setIsLoading(true);

			await userAuthClient.signUp.email({
				name: values.name,
				email: values.email,
				password: values.password,
			});

			toast.success("Login successful");
			router.push("/");
			router.refresh();
		} catch {
			toast.error("Invalid email or password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Controller
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Email</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id={field.name}
										placeholder="John Doe"
										type="text"
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
					<Button
						className="w-full"
						disabled={isLoading}
						size="xs"
						type="submit"
					>
						{isLoading ? <Spinner /> : "Sign Up"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
