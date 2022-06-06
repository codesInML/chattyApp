import { Router } from "express";
import { authenticationRoutes } from "./auth-route";
import { messageRoutes } from "./message-route";

const router = Router();

router.use("/auth", authenticationRoutes);
router.use("/messages", messageRoutes);

export { router as applicationRoutes };
