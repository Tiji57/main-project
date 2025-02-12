import User from '../models/User.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

// Create token function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day
};

// Admin authentication middleware
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminUser = await User.findById(decoded.id);

    if (adminUser && adminUser.isAdmin) {
      next(); // Allow the request to proceed
    } else {
      return res.status(403).json({ success: false, message: 'You are not authorized to access this route' });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token or error verifying admin' });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!validator.isEmail(email) || !password) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User does not exist' });
    }

    // Check if the password matches
    const isMatch = bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);

      // Create response payload with the user's information
      const responsePayload = {
        success: true,
        token,
        message: 'Login successful',
        role: user.role,
        _id: user._id,
      };

      // If the user is a driver/helper, include the busNo in the response
      if (user.role === 'driver/helper') {
        responsePayload.busNo = user.busNo;
      }

      return res.status(200).json(responsePayload);
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error: ' + error.message });
  }
};


// User registration (admin only)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, className, division, busNo } = req.body;

    // Checking if the email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Validating email & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Please enter a strong password' });
    }

    // Hashing user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      className: role === 'teacher' ? className : undefined,
      division: role === 'teacher' ? division : undefined,
      busNo: role === 'driver/helper' ? busNo : undefined,
    });

    const user = await newUser.save();
    res.json({ success: true, message: 'User registered successfully', data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error: ' + error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking admin credentials from environment variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = createToken(email); // Generate a token
      res.json({ success: true, token, message: 'Admin login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.status(200).json(users); // Send back all user data
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Find and delete user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If user not found
    }
    res.status(200).json({ message: 'User deleted successfully' }); // Send success message
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
};

// Controller to update a user by ID

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, className, division, busNo, isAdmin } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Update user details only if a new value is provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.role = role || user.role;
    user.className = className || user.className;
    user.division = division || user.division;
    user.busNo = busNo || user.busNo;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    // Save the updated user details
    await user.save();

    // Respond with the updated user data
    res.status(200).json({
      message: 'User updated successfully!',
      userDetails: user,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user!' });
  }
};

export const getStatistics = async (req, res) => {
  try {
    console.log('Fetching statistics...');
    
    // Count total students
    const totalStudents = await Student.countDocuments();
    console.log('Total Students:', totalStudents);

    // Count total teachers
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    console.log('Total Teachers:', totalTeachers);

    // Count total buses
    const buses = await Student.distinct('busNo');
    console.log('Buses:', buses);
    const totalBuses = buses.length;
    console.log('Total Buses:', totalBuses);

    // Send the response
    res.json({
      totalStudents,
      totalTeachers,
      totalBuses,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





export { loginUser, registerUser, adminLogin ,getAllUsers,deleteUser, updateUser };
