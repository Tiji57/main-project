import Fee from '../models/Fee.js'; // Assuming Fee is in the models folder
import Student from '../models/Student.js'; // Assuming Student is in the models folder
import Expense from '../models/expense.js'; 
import Income from '../models/income.js';
import FeeStatus from '../models/Fee.js';

// Fetch fee status along with student details
export const getFeeStatus = async (req, res) => {
  try {
    // Retrieve fee details and populate student data
    const feeStatus = await Fee.find()
      .populate({
        path: 'studentId', // Reference to Student model
        select: 'name busFare class division', // Fields to fetch from Student model
      })
      .select('month feeStatus busFare') // Include month, feeStatus, and busFare fields
      .exec();

    // Log feeStatus to debug
    console.log(feeStatus);

    // Return the fee status along with student data
    res.status(200).json(feeStatus);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching fee status');
  }
};


// Handle adding a new expense
export const addExpense = async (req, res) => {
  try {
    const { category, amount, description, busNo } = req.body;

    // Create a new expense document
    const newExpense = new Expense({
      category,
      amount,
      description,
      busNo,
    });

    // Save the expense to the database
    await newExpense.save();

    res.status(201).json({ message: 'Expense added successfully', data: newExpense });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
};
export const addIncome = async (req, res) => {
  const { source, amount, description } = req.body;

  if (!source || !amount || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newIncome = new Income({
      source,
      amount,
      description,
    });

    await newIncome.save();
    res.status(201).json({ message: 'Income added successfully', data: newIncome });
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
export const getIncomesAndExpenses = async (req, res) => {
  try {
    const incomes = await Income.find();
    const expenses = await Expense.find();

    res.json({ incomes, expenses });
  } catch (err) {
    console.error('Error fetching incomes and expenses:', err);
    res.status(500).send('Server Error');
  }
};

export const calculateIncome = async () => {
  try {
    // Fetch all students who have paid fees
    const paidStudents = await Student.find({ feesStatus: 'paid' });

    // Calculate the total income based on busFare of paid students
    const totalIncome = paidStudents.reduce((total, student) => total + student.busFare, 0);

    // Optional: Store this calculated income in the database (if you want to track it)
    const newIncome = new Income({
      source: 'Student Fees',
      amount: totalIncome,
      description: 'Total income from paid student fees',
      date: new Date(),
    });

    await newIncome.save();

    console.log('Total Income:', totalIncome);
  } catch (err) {
    console.error('Error calculating income:', err);
  }
};


export const fee = async (req, res) => {
  try {
    // Fetch fee status and populate studentId field
    const feeStatusData = await FeeStatus.find().populate('studentId');
    
    // Calculate the total bus fare
    const totalBusFare = feeStatusData.reduce((accum, item) => accum + (item.busFare || 0), 0);

    // Return the fee status and the total bus fare
    res.json({
      feeStatus: feeStatusData,
      totalBusFare
    });
  } catch (err) {
    console.error('Error fetching fee status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
