import express from "express";
import authenticateUser from "../middleware/auth.js";
import categoryController from "../controller/category.controller.js";

const router = express.Router();

router.post("/category/add", authenticateUser, categoryController.create);
router.get("/category/lists", authenticateUser, categoryController.lists);

export default router;
