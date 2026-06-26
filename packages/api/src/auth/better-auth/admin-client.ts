import { createAuthClient } from "better-auth/react";

export const adminAuthClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL, // e.g. https://admin-api.yourapp.com
	fetchOptions: {
		credentials: "include",
	},
});
