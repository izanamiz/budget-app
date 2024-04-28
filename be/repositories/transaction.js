import Transaction from "../models/Transaction.js";
import { categoryRepository } from "./index.js";

const createTransaction = async (
  price,
  type,
  categoryId,
  scheduledAt,
  note
) => {
  // Kiểm tra xem category có tồn tại không
  const existingCategory = await categoryRepository.getCategoryById(categoryId);
  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const transactionData = {
    price,
    type,
    categoryId,
    scheduledAt: scheduledAt || new Date(), // Nếu không có scheduledAt từ client, sử dụng ngày hiện tại
    note,
  };

  return await Transaction.create(transactionData);
};

const getAllTransactions = async (type, categoryId, from, to) => {
  let query = {};
  // Kiểm tra và thêm điều kiện lọc theo từ khóa searchString
  if (type) {
    query.$or = [{ type: { $regex: type, $options: "i" } }];
  }

  if (categoryId) {
    query.$or = [{ categoryId: { $regex: categoryId, $options: "i" } }];
  }

  // Kiểm tra và thêm điều kiện lọc theo khoảng thời gian từ from đến to
  if (from && to) {
    query.create_at = { $gte: new Date(from), $lte: new Date(to) };
  } else if (from) {
    query.create_at = { $gte: new Date(from) };
  } else if (to) {
    query.create_at = { $lte: new Date(to) };
  }
  return await Transaction.find(query);
};

const getTransactionById = async (transactionId) => {
  return await Transaction.findById(transactionId);
};

const updateTransaction = async (
  transactionId,
  price,
  type,
  categoryId,
  scheduledAt,
  note
) => {
  // Kiểm tra xem category có tồn tại không
  const existingCategory = await categoryRepository.getCategoryById(categoryId);
  if (!existingCategory) {
    throw new Error("Category not found");
  }

  return await Transaction.findByIdAndUpdate(
    transactionId,
    { price, type, categoryId, scheduledAt, note },
    { new: true }
  );
};

const deleteTransaction = async (transactionId) => {
  return await Transaction.findByIdAndDelete(transactionId);
};

export default {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
