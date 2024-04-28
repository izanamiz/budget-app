import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { budgetRepository, categoryRepository } from "../repositories/index.js";

const createBudget = async (req, res) => {
  try {
    const { price, all, categoryId } = req.body;
    let data = null;

    // Kiểm tra xem all là true và nếu là true thì không cần categoryId
    if (all) {
      // Kiểm tra xem đã tồn tại budget nào có all = true chưa
      const existingTotalBudget = await budgetRepository.getTotalBudget();
      if (existingTotalBudget) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: "Total budget already exists",
        });
      }

      // Kiểm tra nếu all = true và categoryId khác null thì trả về lỗi
      if (!!categoryId) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: "Invalid data. Category ID should be null when all is true",
        });
      }

      data = await budgetRepository.createBudget(price, all, null);
    } else {
      // Kiểm tra categoryId có tồn tại không
      const existingCategory = await categoryRepository.getCategoryById(
        categoryId
      );
      if (!existingCategory) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: "Category not found",
        });
      }

      data = await budgetRepository.createBudget(price, all, categoryId);
      await categoryRepository.updateCategoryBudgetId(categoryId, data._id);
    }

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Budget created successfully",
      data: data,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await budgetRepository.getAllBudgets();
    res.status(HttpStatusCode.OK).json({
      data: budgets,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const getBudgetById = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await budgetRepository.getBudgetById(id);
    res.status(HttpStatusCode.OK).json({
      data: budget,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, all, categoryId } = req.body;
    let data = null;

    if (all) {
      const existingTotalBudget = await budgetRepository.getTotalBudget();
      if (existingTotalBudget) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: "Total budget already exists",
        });
      }

      if (!!categoryId) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: "Invalid data. Category ID should be null when all is true",
        });
      }

      data = await budgetRepository.updateBudget(id, price, all, null);
    } else {
      // Kiểm tra categoryId có tồn tại không
      const existingCategory = await categoryRepository.getCategoryById(
        categoryId
      );
      if (!existingCategory) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: "Category not found",
        });
      }

      data = await budgetRepository.updateBudget(id, price, all, categoryId);

      await categoryRepository.updateCategoryBudgetId(categoryId, data._id);
    }

    res.status(HttpStatusCode.OK).json({
      message: "Budget updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    await budgetRepository.deleteBudget(id);
    res.status(HttpStatusCode.OK).json({
      message: "Budget deleted successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export default {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
