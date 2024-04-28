import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { categoryRepository } from "../repositories/index.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { CategoryImage } from "../models/Category.js";
import Budget from "../models/Budget.js";

const getAllCategoryImages = async (req, res) => {
  try {
    let { type = "" } = req.query;
    const categoryImages = await categoryRepository.getAllCategoryImages(type);
    res.status(HttpStatusCode.OK).json({
      message: "Get all category images successfully",
      type: type,
      data: categoryImages,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const generateCategoryImages = async (req, res) => {
  try {
    debugger;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const incomeImages = fs.readdirSync(
      path.join(__dirname, "../media/categories/income")
    );
    const expenseImages = fs.readdirSync(
      path.join(__dirname, "../media/categories/expense")
    );

    for (const imageUrl of incomeImages) {
      if (!(await CategoryImage.findOne({ imageUrl }))) {
        await categoryRepository.insertCategoryImage("income", imageUrl);
      }
    }

    for (const imageUrl of expenseImages) {
      if (!(await CategoryImage.findOne({ imageUrl }))) {
        await categoryRepository.insertCategoryImage("expense", imageUrl);
      }
    }

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Category images generated successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    let { type = "" } = req.query;
    const categories = await categoryRepository.getAllCategories(type);
    res.status(HttpStatusCode.OK).json({
      message: "Get all categories successfully",
      data: categories,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req?.params?.id;
    const category = await categoryRepository.getCategoryById(categoryId);
    res.status(HttpStatusCode.OK).json({
      message: "Successfully",
      data: category,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const { name, type, imageUrl, budgetId } = req.body;
  try {
    if (budgetId && !mongoose.isValidObjectId(budgetId)) {
      throw new Error("Invalid budgetId");
    }

    // Kiểm tra xem budget với id có tồn tại không
    if (budgetId) {
      const existingBudget = await Budget.findById(budgetId);
      if (!existingBudget) {
        throw new Error("Budget not found");
      }
    }

    const category = await categoryRepository.createCategory(
      name,
      type,
      imageUrl
    );
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type, imageUrl, budgetId } = req.body;
  try {
    if (budgetId && !mongoose.isValidObjectId(budgetId)) {
      throw new Error("Invalid budgetId");
    }

    // Kiểm tra xem budget với id có tồn tại không
    if (budgetId) {
      const existingBudget = await Budget.findById(budgetId);
      if (!existingBudget) {
        throw new Error("Budget not found");
      }
    }

    const updatedCategory = await categoryRepository.updateCategory(
      id,
      name,
      type,
      imageUrl
    );
    res.status(HttpStatusCode.OK).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    await categoryRepository.deleteCategoryById(id);
    res.status(HttpStatusCode.OK).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export default {
  getAllCategoryImages,
  generateCategoryImages,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
};
