import { Router } from "express";
import { createMessageController, getMessagesController } from "../controllers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";

const router = Router();

router.use(currentUserMiddleware);
router.use(requireAuthMiddleware);

router.route("/").post(createMessageController);
router.route("/:to").get(getMessagesController);
export { router as messageRoutes };
