import mongoose from 'mongoose';

// Define the Expense schema
const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true, // Expense category (e.g., "Diesel", "Workshop Charges")
    },
    amount: {
      type: Number,
      required: true, // Amount of the expense
    },
    description: {
      type: String,
      required: false, // Optional description of the expense
    },
    busNo: {
      type: String,
      required: true, // Bus number related to the expense
    },
    date: {
      type: Date,
      default: Date.now, // Default to the current date if not provided
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Expense model
const expense = mongoose.model('Expense', expenseSchema);

// Default export of the expense model
export default expense;
