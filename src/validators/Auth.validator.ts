import { check } from "express-validator";

export const sign_up_validator = [
	check("first_name").not().isEmpty().withMessage("First Name is required"),
	check("last_name").not().isEmpty().withMessage("Last Name is required"),
	check("email").isEmail().withMessage("Email must be valid"),
];

export const sign_in_validator = [check("email").isEmail().withMessage("Email must be valid")];
