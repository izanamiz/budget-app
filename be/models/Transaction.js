import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  scheduledAt: {
    type: Date,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  note: {
    type: String,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
