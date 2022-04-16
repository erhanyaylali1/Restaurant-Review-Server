import express from "express";
import UserController from "../controllers/User.controller";
import { sign_up_validator, sign_in_validator } from "../validators/Auth.validator";
import validators from "../validators/index";

const router = express.Router();

const userController = new UserController();

router.post("/sign-up", sign_up_validator, validators, userController.signUp);
router.post("/sign-in", sign_in_validator, validators, userController.signIn);

export default router;
