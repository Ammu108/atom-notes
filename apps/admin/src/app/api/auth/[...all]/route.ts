import { adminAuth } from "@repo/api/admin-auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(adminAuth);
