import mongoose from 'mongoose';
import Fee from './Fee'; // Import the Fee model to calculate income

const financeSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  totalIncome: {
    type: Number,
    default: 0, // Total income will be calculated based on bus fares paid
  },
  totalSalary: {
    type: Number,
    default: 0,
  },
  workshopCharges: {
    type: Number,
    default: 0,
  },
  dieselCharges: {
    type: Number,
    default: 0,
  },
  otherExpenses: {
    type: Number,
    default: 0,
  },
  totalExpenses: {
    type: Number,
    default: function () {
      return (
        this.totalSalary +
        this.workshopCharges +
        this.dieselCharges +
        this.otherExpenses
      );
    },
  },
  netProfit: {
    type: Number,
    default: function () {
      return this.totalIncome - this.totalExpenses;
    },
  },
}, { timestamps: true });

// Function to calculate total income based on bus fare paid
financeSchema.methods.calculateIncome = async function () {
  const paidFees = await Fee.find({
    feeStatus: 'Paid',
    month: this.month,
  });

  const income = paidFees.reduce((total, fee) => total + fee.busFare, 0);
  this.totalIncome = income;
};

// Pre-save hook to calculate income before saving the finance record
financeSchema.pre('save', async function (next) {
  await this.calculateIncome(); // Calculate income before saving
  next();
});

const Finance = mongoose.model('Finance', financeSchema);

export default Finance;
