import { userAuth } from "@repo/api/user-auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(userAuth);
