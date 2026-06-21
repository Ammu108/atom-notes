import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@repo/ui";
import { type SignUpSchema, signUpSchema } from "@repo/validators";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/trpc/react";

const SignUp = () => {
	const router = useRouter();

	const signUp = api.auth.signUp.useMutation({
		onSuccess: async (opts) => {
			toast.success(opts.message);
			router.push("/");
			router.refresh();
		},
		onError: (error) => {
			console.error("Signup failed:", error);
			toast.error(error.message);
		},
	});

	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: SignUpSchema) => {
		signUp.mutate(values);
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
						disabled={signUp.isPending}
						size="xs"
						type="submit"
					>
						{signUp.isPending ? <Spinner /> : "Sign Up"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
