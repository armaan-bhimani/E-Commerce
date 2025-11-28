import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    });
    
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
    
    await mongoose.connect(`${process.env.MONGODB_URI}ecommerce`);
};

export default connectDB;