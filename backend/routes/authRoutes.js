import express from "express";
import { 
  register, 
  login, 
  logout, 
  sendVerifyOtp, 
  verifyAccount, 
  isAuthenticated, 
  sendResetOtp, 
  resetPassword 
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// OTP verification for account
router.post("/send-verify-otp", userAuth, sendVerifyOtp);
router.post("/verify-otp", userAuth, verifyAccount); 

// Authentication check
router.get("/is-auth", userAuth, isAuthenticated);

// Password reset routes
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;
