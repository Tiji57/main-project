import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Import bcrypt properly

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Username is required',
      unique: true, // Ensure unique username for each admin
    },
    password: {
      type: String,
      required: 'Password is required',
      minlength: [8, 'Password must be at least 8 characters'], // Minimum length validation
    },
    role: {
      type: String,
      required: 'Role is required',
      enum: ['Admin'], // Only 'Admin' role allowed
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save hook for password hashing
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
  }
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
