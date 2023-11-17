import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

expenseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

export const ExpenseModel = mongoose.model("Expense", expenseSchema);
