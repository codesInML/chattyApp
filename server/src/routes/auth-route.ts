import { Router } from "express";
import {
  registerUserController,
  loginController,
  signOutController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
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

export { router as authenticationRoutes };
