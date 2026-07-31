import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

if (!key_id || !key_secret) {
	throw new Error("Razorpay credentials are missing.");
}

export const razorPay = new Razorpay({
	key_id: key_id,
	key_secret: key_secret,
});
