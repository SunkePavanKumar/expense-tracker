import express from "express";
import userController from "../controller/user.controller.js";
const router = express.Router();

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
export default router;
