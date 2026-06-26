// packages/db/seed/admin.ts

import { auth } from "@repo/api/auth";
import { eq } from "drizzle-orm";
import { db, user } from ".";

async function seedAdmin() {
	const email = "admin@example.com";
	const password = "password";

	console.log("⏳ Checking admin...");

	const existing = await db.query.user.findFirst({
		where: eq(user.email, email),
	});

	if (!existing) {
		await auth.api.signUpEmail({
			body: {
				name: "Admin User",
				email,
				password,
			},
		});

		console.log("✅ Admin account created.");
	} else {
		console.log("ℹ️ Admin already exists.");
	}

	await db
		.update(user)
		.set({
			role: "ADMIN",
		})
		.where(eq(user.email, email));

	console.log(`
=================================
Admin credentials
Email:    ${email}
Password: ${password}
Role:     ADMIN
=================================
`);
}

seedAdmin()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
