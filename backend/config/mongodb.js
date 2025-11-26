import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    });
    
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
    
    // Fixed: Use "ecommerce" without hyphen (MongoDB doesn't allow hyphens in DB names via this method)
    await mongoose.connect(`${process.env.MONGODB_URI}ecommerce`);
};

export default connectDB;