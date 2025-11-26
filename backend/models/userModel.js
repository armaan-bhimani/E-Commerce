// server/models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Cart Data
    cartData: { type: Object, default: {} }, // store items in key-value or array format

    // Email Verification OTP
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },

    // Password Reset OTP
    resetPasswordOtp: { type: String, default: "" },
    resetPasswordOtpExpireAt: { type: Number, default: 0 }
  },
  { timestamps: true, minimize: false } // keep empty objects and track createdAt/updatedAt
);

// Avoid overwriting model in watch/hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
