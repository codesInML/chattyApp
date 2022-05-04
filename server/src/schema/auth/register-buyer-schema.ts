import { body, check } from "express-validator";

export const registerUserSchema = () => {
  return [
    body("fullName").notEmpty().withMessage("Please provide your full name"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .notEmpty()
      .withMessage("password cannot be empty")
      .trim()
      .isLength({ min: 5, max: 25 })
      .withMessage("Password must be between 5 to 25 characters"),
    check("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password should not be empty")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match with password");
        }
        return true;
      }),
  ];
};
