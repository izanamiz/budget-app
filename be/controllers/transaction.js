import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { transactionRepository } from "../repositories/index.js";

const createTransaction = async (req, res) => {
  const { price, type, categoryId, scheduledAt, note } = req.body;
  try {
    const transaction = await transactionRepository.createTransaction(
      price,
      type,
      categoryId,
      scheduledAt,
      note
    );
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const { type, categoryId, from, to } = req.query;

    const transactions = await transactionRepository.getAllTransactions(
      type,
      categoryId,
      from,
      to
    );
    res.status(HttpStatusCode.OK).json({
      data: transactions,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await transactionRepository.getTransactionById(id);
    res.status(HttpStatusCode.OK).json({
      data: transaction,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { price, type, categoryId, scheduledAt, note } = req.body;
  try {
    const updatedTransaction = await transactionRepository.updateTransaction(
      id,
      price,
      type,
      categoryId,
      scheduledAt,
      note
    );
    res.status(HttpStatusCode.OK).json({
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await transactionRepository.deleteTransaction(id);
    res.status(HttpStatusCode.OK).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export default {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
