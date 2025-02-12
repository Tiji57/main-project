import express from 'express';
import { addStudent, getAttendanceByUserId} from '../controllers/studentController.js';
import { getStudentsByTeacherId } from '../controllers/studentController.js';
import { getAllStudents } from '../controllers/studentController.js';
import {markAttendance} from '../controllers/studentController.js';
import {getStudentsByBusNo} from '../controllers/studentController.js';
const router = express.Router();

// Route for adding a student
router.post('/addStudent', addStudent);

// Route for getting students based on teacherId
// router.get('/Display', getStudents);

router.get('/', getStudentsByTeacherId);
router.get('/all',getAllStudents); 
router.post('/mark', markAttendance);
router.get('/attendance', getAttendanceByUserId);
router.get('/bus',getStudentsByBusNo );
export default router;
