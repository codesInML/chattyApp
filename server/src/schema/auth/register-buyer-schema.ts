import { body } from "express-validator";

export const registerUserSchema = () => {
  return [
    body("fullName").notEmpty().withMessage("Please provide your full name"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .notEmpty()
      .trim()
      .isLength({ min: 5, max: 25 })
      .withMessage("Password must be between 5 to 25 characters"),
  ];
};
