import mongoose, { Schema } from "mongoose";

const CategoryImageSchema = new Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
  },
});

export const CategoryImage = mongoose.model(
  "CategoryImage",
  CategoryImageSchema
);
export const Category = mongoose.model("Category", CategorySchema);
