import mongoose, { Schema } from "mongoose";
import validator from "validator";

const BudgetSchema = new Schema({
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be greater than 0"],
  },
  all: {
    type: Boolean,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;
