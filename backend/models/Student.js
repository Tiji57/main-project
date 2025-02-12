import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  },
  guardianPhone: {
    type: String,
    required: true,
  },
  busFare: {
    type: Number,
    required: true,
  },
  droppingPoint: {
    type: String,
    required: true,
  },
  busNo: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model where teacher's info is stored
    required: true,
  },
  feesStatus: {
    type: Map,
    of: String, // Store fee status as a Map with the month as the key and "Paid" or "Pending" as the value
    default: {},
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
