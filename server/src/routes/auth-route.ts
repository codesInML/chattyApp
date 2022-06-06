import { Router } from "express";
import {
  registerUserController,
  loginController,
  signOutController,
  currentUserController,
  setAvatarController,
  getAllUsersController,
  getUserController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import { registerUserSchema, loginSchema } from "../schema/auth";

const router = Router();

// Registration route
router
  .route("/register")
  .post(
    registerUserSchema(),
    validateRequestMiddleware,
    registerUserController
  );

// sign in route
router
  .route("/signin")
  .post(loginSchema(), validateRequestMiddleware, loginController);

// sign out route
router.route("/signout").get(signOutController);

// current user route
router.route("/current-user").get(currentUserMiddleware, currentUserController);

// make the remaining routes protected
router.use(currentUserMiddleware);
router.use(requireAuthMiddleware);

// set user's avatar
router.route("/set-avatar/:id").post(setAvatarController);

// get all users
router.route("/users").get(getAllUsersController);

// get a user
router.route("/user").get(getUserController);

export { router as authenticationRoutes };
