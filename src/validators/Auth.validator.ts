import { check } from "express-validator";

export const sign_up_validator = [
	check("user.first_name").not().isEmpty().withMessage("First Name is required"),
	check("user.last_name").not().isEmpty().withMessage("Last Name is required"),
	check("user.email").isEmail().withMessage("Email must be valid"),
	check("user.password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const sign_in_validator = [
	check("user.email").isEmail().withMessage("Email must be valid"),
	check("user.password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
