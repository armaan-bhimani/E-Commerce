import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get user data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        cartData: user.cartData,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Admin login using ENV variables
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body; // GET method with query params

    if (!email || !password) {
      return res.json({ success: false, message: "Please provide email and password" });
    }

    // Compare with values from .env
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid admin credentials" });
    }

    // const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const token  = jwt.sign(email+password,process.env.JWT_SECRET);
    // const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, message: "Admin logged in", token });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
