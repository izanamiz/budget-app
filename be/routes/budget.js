import express from "express";
import { budgetController } from "../controllers/index.js";

const router = express.Router();

router.post("/", budgetController.createBudget);
router.get("/", budgetController.getAllBudgets);
router.get("/:id", budgetController.getBudgetById);
router.put("/:id", budgetController.updateBudget);
router.delete("/:id", budgetController.deleteBudget);

export default router;
