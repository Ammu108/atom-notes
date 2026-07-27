import { razorPay } from "../lib/razorpay";

interface CreateOrderInput {
	amount: string;
}

export const paymentService = {
	async createOrder(input: CreateOrderInput) {
		const order = await razorPay.orders.create({
			amount: Math.round(Number(input.amount) * 100),
			currency: "INR",
			receipt: `receipt_${Date.now()}`,
		});

		return order;
	},
};
