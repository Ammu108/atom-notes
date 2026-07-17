"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@repo/ui";
import { type ContactSchema, contactSchema } from "@repo/validators";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/trpc/react";

const ContactForm = () => {
	const router = useRouter();

	const form = useForm<ContactSchema>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const contact = api.contact.create.useMutation({
		onSuccess: async (opts) => {
			toast.success(opts.message);
			form.reset();
		},
		onError: (error) => {
			if (error.data?.code === "UNAUTHORIZED") {
				toast.error("Please login first");
				router.push("/auth?tab=login");
			} else {
				toast.error(error.message);
			}
		},
	});

	const onSubmit = async (values: ContactSchema) => {
		contact.mutate(values);
	};

	return (
		<div className="animate-fadeUp-1 lg:col-span-2">
			<div className="rounded-2xl border border-border/50 bg-card p-4 md:p-8">
				<h2 className="mb-8 font-bold font-playfair text-2xl text-foreground">
					Send us a Message
				</h2>

				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											placeholder="full name"
											type="text"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>
						<div className="space-y-2">
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
					</div>

					<div className="space-y-2">
						<Controller
							control={form.control}
							name="subject"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Subject</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id={field.name}
										placeholder="what is the purpose..."
										type="text"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</div>

					<Controller
						control={form.control}
						name="message"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									id={field.name}
									placeholder="Describe your problem in brief..."
									type="text"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Button
						className="w-full"
						disabled={contact.isPending}
						size="xs"
						type="submit"
						variant="primary"
					>
						{contact.isPending ? <Spinner /> : "Send Message"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
