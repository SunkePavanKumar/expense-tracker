import express from "express";
import authenticateUser from "../middleware/auth.js";
import transactionController from "../controller/transaction.controller.js";

const router = express.Router();

router.post("/transaction/add", authenticateUser, transactionController.create);
router.get("/transaction/lists", authenticateUser, transactionController.lists);

export default router;
