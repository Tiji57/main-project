import mongoose from 'mongoose';
import Admin from './models/Admin.js'; // Ensure '.js' extension is included

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://tijimolgeorge7543:ZXu2FskeXFpFZc28@cluster0.i94wc.mongodb.net', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const ensureAdminExists = async () => {
    try {
        const admin = await Admin.findOne({ role: 'admin' });
        if (!admin) {
            const newAdmin = new Admin({
                username: 'admin@gmail.com',
                password: 'Password@12', // Replace with a securely hashed password
                role: 'Admin',
            });
            await newAdmin.save();
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error ensuring admin exists:', error);
    }
};

connectDB().then(() => {
    ensureAdminExists();
});
