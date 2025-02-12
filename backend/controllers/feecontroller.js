// backend/controllers/feeController.js
import Fee from '../models/Fee.js';
import Student from '../models/Student.js';

// Add new fee record
export const addFee = async (req, res) => {
  try {
    const { studentId, feeStatus, month, busFare } = req.body;

    // Ensure that the student exists before adding the fee
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a new fee record
    const newFee = new Fee({
      studentId,
      feeStatus,
      month,
      busFare
    });

    // Save the new fee record to the database
    await newFee.save();

    // Return the new fee record
    res.status(201).json({ message: 'Fee record added successfully', fee: newFee });
  } catch (error) {
    // Log the error for server-side debugging
    console.error(error);
    res.status(500).json({ message: 'Error adding fee record', error: error.message });
  }
};

// Get all fee records for a student
export const getStudentFees = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch the fees for the student, populate student details (name, busfare)
    const fees = await Fee.find({ studentId }).populate('studentId', 'name', 'busfare');

    // If no fees found, return an empty array
    if (!fees || fees.length === 0) {
      return res.status(404).json({ message: 'No fee records found for this student' });
    }

    // Return the fees records
    res.status(200).json(fees);
  } catch (error) {
    // Log the error for server-side debugging
    console.error(error);
    res.status(500).json({ message: 'Error fetching fees', error: error.message });
  }
};
// backend/controllers/feeController.js
export const getFeeDetailsForTeacher = async (req, res) => {
  const teacherId = req.query.teacherId; // Get teacher ID from query parameters

  if (!teacherId) {
    return res.status(400).json({
      success: false,
      message: 'Teacher ID is required.',
    });
  }

  try {
    // Find all students assigned to the teacher
    const students = await Student.find({ teacherId: teacherId }); // Assuming students have teacherId field

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found for this teacher.',
      });
    }

    // Find fee records for the students
    const feeDetails = await Fee.find({
      studentId: { $in: students.map(student => student._id) }, // Fetch fee records for these students
    }).populate('studentId', 'name busFare status'); // Populate studentId to get student name and busFare

    // Prepare the response with student names and fee status
    const feeRecords = feeDetails.map(fee => ({
      _id: fee._id,
      studentName: fee.studentId.name, // Use populated studentId to get the student name
      month: fee.month,
      feeStatus: fee.status, // Ensure feeStatus is correct (from Fee model)
      busFare: fee.studentId.busFare, // Get busFare from populated student data
    }));

    return res.status(200).json({
      success: true,
      data: feeRecords,
    });
  } catch (error) {
    console.error('Error fetching fee details:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching fee details. Please try again later.',
    });
  }
};
