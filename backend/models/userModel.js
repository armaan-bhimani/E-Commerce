import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    cartData: { type: Object, default: {} },

    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },

    resetPasswordOtp: { type: String, default: "" },
    resetPasswordOtpExpireAt: { type: Number, default: 0 }
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
