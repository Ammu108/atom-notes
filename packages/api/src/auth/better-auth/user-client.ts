import { createAuthClient } from "better-auth/react";

export const userAuthClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_USER_API_URL, // e.g. https://api.yourapp.com
	fetchOptions: {
		credentials: "include",
	},
});
