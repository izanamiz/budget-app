import { OutputType } from "../helpers/print.js";
import Budget from "../models/Budget.js";

const createBudget = async (price, all, categoryId) => {
  return await Budget.create({ price, all, categoryId });
};

const getAllBudgets = async () => {
  return await Budget.find();
};

const getBudgetById = async (budgetId) => {
  return await Budget.findById(budgetId);
};

const updateBudget = async (budgetId, price, all, categoryId) => {
  return await Budget.findByIdAndUpdate(
    budgetId,
    { price, all, categoryId },
    { new: true }
  );
};

const deleteBudget = async (budgetId) => {
  return await Budget.findByIdAndDelete(budgetId);
};

const getTotalBudget = async () => {
  return await Budget.findOne({ all: true });
};

export default {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getTotalBudget,
};
