import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

console.log({
	keyIdExists: !!process.env.RAZORPAY_KEY_ID,
	keySecretExists: !!process.env.RAZORPAY_KEY_SECRET,
	keyIdPrefix: process.env.RAZORPAY_KEY_ID?.substring(0, 8),
});

if (!key_id || !key_secret) {
	throw new Error("Razorpay credentials are missing.");
}

export const razorPay = new Razorpay({
	key_id: key_id,
	key_secret: key_secret,
});
