const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For hashing password
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// Register user (Admin only)
router.post('/register', async (req, res) => {
    try {
        // Check if the admin token is provided in the Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).json({ success: false, message: 'Access denied: No token provided' });

        // Decode the token to extract the admin ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await User.findById(decoded.id);
        if (!admin || admin.userType !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admins can create users' });
        }

        // Destructure required fields from the request body
        const { name, email, password, role, className, division, busNo, phone } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Name, email, password, and role are required' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Use hashed password
            role,
            className,
            division,
            busNo,
            phone,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});

module.exports = router;
