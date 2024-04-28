import express from "express";
import { categoryController } from "../controllers/index.js";

const router = express.Router();

router.get("/images", categoryController.getAllCategoryImages);
router.post("/generate", categoryController.generateCategoryImages);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategoryById);

export default router;
