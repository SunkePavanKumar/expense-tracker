import express from "express";
import userController from "../controller/user.controller.js";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.get("/users/profile", authenticateUser, userController.profile);
export default router;
