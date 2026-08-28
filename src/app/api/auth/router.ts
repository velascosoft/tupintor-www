import { AuthController } from "@/backend/controllers/auth";
import { createNextRoute } from "@velascosoftware/next-api-router";

export const authRouter = createNextRoute(new AuthController(), "/auth");