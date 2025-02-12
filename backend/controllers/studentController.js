import Student from '../models/Student.js';
import Attendance from '../models/Attendence.js';




// Add a new student
export const addStudent = async (req, res) => {
  try {
    const { name, class: studentClass, division, guardianName, guardianPhone, busFare, droppingPoint, busNo, teacherId } = req.body;

    const newStudent = new Student({
      name,
      class: studentClass,
      division,
      guardianName,
      guardianPhone,
      busFare,
      droppingPoint,
      busNo,
      teacherId,
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
};
export const getStudentsByTeacherId = async (req, res) => {
  const { teacherId } = req.query; // Get teacherId from query params

  try {
    // Find all students with the matching teacherId
    const students = await Student.find({ teacherId });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found for this teacher' });
    }

    // Send students data in the response
    res.status(200).json({ data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    console.log(students); // Log the students array to check the format
    res.status(200).json(students); // Send the students as a response
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};

export const markAttendance = async (req, res) => {
  const { studentId, status, userId } = req.body;

  // Validate input fields
  if (!studentId || !status || !userId) {
    return res.status(400).json({ message: 'Student ID, status, and user ID are required' });
  }

  try {
    // Find the student by studentId
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get the current date in the form of Date objects (Start and End of today)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);  // Start of today

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);  // End of today

    // Check if an attendance record for this student already exists today
    const existingAttendance = await Attendance.findOne({
      studentId: student._id,
      timestamp: { $gte: todayStart, $lt: todayEnd },  // Compare using Date objects
    });

    if (existingAttendance) {
      // If an attendance record exists for today, update it
      existingAttendance.status = status;
      existingAttendance.userId = userId;  // Optional: If you want to track which user marked the attendance
      existingAttendance.timestamp = new Date();  // Update the timestamp
      await existingAttendance.save();

      return res.status(200).json({
        message: 'Attendance updated successfully',
      });
    } else {
      // If no record exists, create a new attendance record
      const attendance = new Attendance({
        studentId: student._id,
        status,
        userId,
        timestamp: new Date(),  // Automatically set the current date and time
      });

      // Save the attendance to the database
      await attendance.save();

      return res.status(200).json({
        message: 'Attendance marked successfully',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while marking attendance' });
  }
};

export const getAttendanceByUserId = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameters

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Fetch attendance records filtered by userId
    const attendanceRecords = await Attendance.find({ userId: userId })
      .populate('studentId', 'name busNo') // Populate student details
      .populate('userId', 'name') // Populate user details
      .sort({ timestamp: -1 }); // Sort by timestamp (most recent first)

    res.json({ data: attendanceRecords });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching attendance records' });
  }
};

export const getStudentsByBusNo = async (req, res) => {
  const { busNo } = req.query; // Retrieve the bus number from query parameters

  console.log('Received Bus Number:', busNo); // Log the bus number received

  if (!busNo) {
    return res.status(400).json({ message: 'Bus number is required.' });
  }

  try {
    // Fetch students based on the bus number
    const students = await Student.find({ busNo: busNo });
    console.log('Students Found:', students); // Log the students array

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found for the given bus number.' });
    }
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students by bus number:', error);
    res.status(500).json({ message: 'Error fetching students.' });
  }
};
