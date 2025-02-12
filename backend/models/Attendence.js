import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  timestamp: { type: Date, default: Date.now }, // Stores both date and time
  status: { type: String, enum: ['present', 'absent'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Default export
export default Attendance;
