import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
});

export const IncomeModel = mongoose.model("Income", incomeSchema);
