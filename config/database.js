import mongoose from "mongoose";

const connectDB = async () => {
  // Check if mongoose is already connected
  if (mongoose.connection.readyState) {
    console.log("MongoDB already connected");
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return false;
  }
};

export default connectDB;
