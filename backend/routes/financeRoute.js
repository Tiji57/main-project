import express from 'express';
import {getFeeStatus} from '../controllers/financeController.js';
import {addExpense} from '../controllers/financeController.js';
import {addIncome} from '../controllers/financeController.js';
import {getIncomesAndExpenses,calculateIncome,fee} from '../controllers/financeController.js';


const router = express.Router();

// router.post('/expense', addExpense);
// router.get('/expenses', getExpenses);
// router.post('/income', addIncome);
// router.get('/income', getIncome);
router.get('/feestatus', getFeeStatus);
router.post('/expense', addExpense);
router.post('/income', addIncome);
router.get('/FeeManagement', getIncomesAndExpenses);
router.get('/calculate', calculateIncome);
router.get('/fee', fee);

export default router;
