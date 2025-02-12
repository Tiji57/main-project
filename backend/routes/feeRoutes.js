import express from 'express';
import { addFee, getFeeDetailsForTeacher } from '../controllers/feecontroller.js';

const router = express.Router();

// Routes

router.get('/feestatus',getFeeDetailsForTeacher);
router.post('/fees', addFee);  // Add new fee record


export default router;
