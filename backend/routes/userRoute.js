import express from 'express';
import { loginUser, registerUser, adminLogin, getAllUsers,deleteUser,updateUser, getStatistics } from '../controllers/userController.js';

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Register route (only for admin)
router.post('/register', registerUser);

// Admin login
router.post('/admin', adminLogin);

router.get('/all',getAllUsers);
router.delete('/:id', deleteUser); // DELETE request to delete user

// Route to update a user by ID
router.put('/:id', updateUser); // PUT request to update user

router.get('/statistics', getStatistics);
export default router;
