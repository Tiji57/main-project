import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen to connection events
    mongoose.connection.on('connected', () => {
      console.log("DB Connected");
    });

    // Connecting to the MongoDB database named 'Bus'
    await mongoose.connect(`${process.env.MONGODB_URI}/Bus`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
