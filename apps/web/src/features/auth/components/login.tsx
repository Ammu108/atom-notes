import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@repo/ui";
import { type LoginSchema, loginSchema } from "@repo/validators";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/trpc/react";

const Login = () => {
	const router = useRouter();

	const login = api.auth.login.useMutation({
		onSuccess: async (opts) => {
			toast.success(opts.message);
			router.push("/");
			router.refresh();
		},
		onError: (error) => {
			console.error("Login failed:", error);
			toast.error(error.message);
		},
	});

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: LoginSchema) => {
		login.mutate(values);
	};

	return (
		<div className="w-full">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
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
						disabled={login.isPending}
						size="xs"
						type="submit"
					>
						{login.isPending ? <Spinner /> : "Login"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Login;
