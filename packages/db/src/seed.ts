import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { env } from "../env";
import { db, users } from ".";

async function seed() {
	const adminEmail = env.ADMIN_EMAIL;
	const adminPassword = env.ADMIN_PASSWORD;
	const adminName = env.ADMIN_NAME;

	if (!adminEmail || !adminPassword || !adminName) {
		throw new Error("Missing ADMIN env variables");
	}

	// 🔍 Check if admin already exists
	const existingAdmin = await db
		.select()
		.from(users)
		.where(eq(users.email, adminEmail))
		.limit(1);

	if (existingAdmin.length > 0) {
		console.log("✅ Admin already exists");
		return;
	}

	// 🔐 Hash password
	const hashedPassword = await bcrypt.hash(adminPassword, 10);

	// 💾 Insert admin
	await db.insert(users).values({
		name: adminName,
		email: adminEmail,
		password: hashedPassword,
		role: "admin",
	});

	console.log("🚀 Admin seeded successfully");
}

seed()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("❌ Seeding failed:", err);
		process.exit(1);
	});
