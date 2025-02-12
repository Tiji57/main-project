import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

// Default export of the model
const Income  = mongoose.model('Income', incomeSchema);

export default Income;