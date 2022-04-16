import express from "express";
import UserRouter from "./User.route";

const router = express.Router();

router.use("/user", UserRouter);

export default router;
