import { userAuthClient } from "@repo/api/user-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/trpc/react";

interface BuyPyqButtonProps {
	id: string | undefined;
	price: string | undefined;
}

interface RazorpayPaymentResponse {
	razorpay_order_id: string;
	razorpay_payment_id: string;
	razorpay_signature: string;
}

const BuyPyqButton = ({ id, price }: BuyPyqButtonProps) => {
	const utils = api.useUtils();
	const router = useRouter();
	const createOrder = api.pyqPayment.createOrder.useMutation({
		onSuccess: async (opts) => {
			toast.success(opts.message);
		},
		onError: (err) => {
			if (err.data?.code === "UNAUTHORIZED") {
				router.push("/auth?tab=login");
				toast.error(err.message);
				return;
			}

			toast.error(err.message);
		},
	});

	const verifyPayment = api.pyqPayment.verifyPayment.useMutation({
		onSuccess: async (opts) => {
			toast.success(opts.message);
			await utils.pyqs.getPyqsById.invalidate({ id: id });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const { data: session } = userAuthClient.useSession();
	const user = session?.user;

	const handleBuyPyq = async () => {
		if (!id) {
			toast.error("Something went wrong. Please refresh and try again.");
			return;
		}

		const order = await createOrder.mutateAsync({ id });

		const options = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

			amount: order.amount,

			currency: order.currency,

			name: "Atoms Note",

			description: "Purchase Premium Pyq",

			order_id: order.orderId,

			handler: async (response: RazorpayPaymentResponse) => {
				await verifyPayment.mutateAsync({
					razorpay_order_id: response.razorpay_order_id,

					razorpay_payment_id: response.razorpay_payment_id,

					razorpay_signature: response.razorpay_signature,
				});
			},

			prefill: {
				name: user?.name,
				email: user?.email,
			},

			theme: {
				color: "#2563eb",
			},
		};

		const razorpay = new window.Razorpay(options);

		razorpay.open();
	};

	return (
		<Button
			disabled={createOrder.isPending || verifyPayment.isPending}
			onClick={handleBuyPyq}
			size="xs"
			type="button"
		>
			{createOrder.isPending || verifyPayment.isPending ? (
				<Spinner />
			) : (
				`Buy Now · ₹${price}`
			)}
		</Button>
	);
};

export default BuyPyqButton;
