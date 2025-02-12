import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    feeStatus: {
      type: String,
      enum: ['Paid', 'Unpaid', 'Pending'],
      required: true
    },
    month: {
      type: String,
      required: true
    },
    busFare: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
