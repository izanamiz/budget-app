import { CategoryImage, Category } from "../models/index.js";
import { categoryRepository } from "./index.js";

const getAllCategoryImages = async (type) => {
  return await CategoryImage.aggregate([
    {
      $match: {
        $or: [
          {
            type: { $regex: `.*${type}.*`, $options: "i" }, // ignore case
          },
        ],
      },
    },
  ]);
};

const insertCategoryImage = async (type, imageUrl) => {
  return await CategoryImage.create({ type, imageUrl });
};

const getAllCategories = async (type) => {
  return await Category.aggregate([
    {
      $match: {
        $or: [
          {
            type: { $regex: `.*${type}.*`, $options: "i" }, // ignore case
          },
        ],
      },
    },
  ]);
};

const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

const createCategory = async (name, type, imageUrl) => {
  const existingCategory = await Category.findOne({ name });
  if (!!existingCategory) {
    throw new Error("Category already exists");
  }

  const existingImage = await CategoryImage.findOne({ imageUrl });
  if (!existingImage) {
    throw new Error("Category image not found");
  }

  return await Category.create({ name, type, imageUrl });
};

const updateCategory = async (categoryId, name, type, imageUrl) => {
  const existingCategory = await Category.findOne({ name });
  if (!!existingCategory) {
    throw new Error("Category already exists");
  }

  const existingImage = await CategoryImage.findOne({ imageUrl });
  if (!existingImage) {
    throw new Error("Category image not found");
  }

  return await Category.findByIdAndUpdate(
    categoryId,
    { name, type, imageUrl },
    { new: true }
  );
};

const deleteCategoryById = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

const updateCategoryBudgetId = async (categoryId, budgetId) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    { budgetId },
    { new: true }
  );
};

export default {
  getAllCategoryImages,
  insertCategoryImage,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
  updateCategoryBudgetId,
};
