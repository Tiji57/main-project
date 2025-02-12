import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Corrected import

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required', // Simplified validation message
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Email format validation
    },
    password: {
      type: String,
      required: 'Password is required',
      minlength: [8, 'Password must be at least 8 characters'], // Min length validation
    },
    phone: {
      type: String,
      required: 'Phone number is required', // Simplified validation message
    },
    role: {
      type: String,
      required: 'Role is required',
      enum: ['teacher', 'driver/helper', 'finance_manager'], // Allowed roles
    },
    className: {
      type: String,
      required: function () {
        return this.role === 'teacher'; // Corrected role name
      },
    },
    division: {
      type: String,
      required: function () {
        return this.role === 'teacher'; // Corrected role name
      },
    },
    busNo: {
      type: String,
      required: function () {
        return this.role === 'driver/helper'; // Corrected role name
      },
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default is false for non-admin users
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hashing the password
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User; // Export the model using ES6 export
