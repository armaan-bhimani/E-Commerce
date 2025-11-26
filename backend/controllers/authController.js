import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import transporter from '../nodemailer/nodemailer.js';

// ====================== REGISTER ======================
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Please enter all the fields" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send welcome email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to Our Service',
      text: `Hello ${newUser.name},\n\nThank you for registering at our service!\n\nBest regards,\nTeam`
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// ====================== LOGIN ======================
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Please enter all the fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Check if account is verified
    if (!existingUser.isVerified) {
      return res.json({ 
        success: false, 
        message: "Please verify your email before logging in. Check your inbox for OTP." 
      });
    }

    // Generate token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isVerified: existingUser.isVerified
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// ====================== LOGOUT ======================
export const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    });
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ====================== SEND VERIFY OTP ======================
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = otpExpireAt;
    await user.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Your Verification OTP',
      html: `
        <h2>Email Verification</h2>
        <p>Hello ${user.name},</p>
        <p>Your OTP for email verification is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email" });

  } catch (error) {
    console.error("Send OTP error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// ====================== VERIFY ACCOUNT ======================
export const verifyAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const { otp } = req.body;

    if (!otp) {
      return res.json({ success: false, message: "Please provide OTP" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.json({ success: false, message: "OTP expired. Please request a new one." });
    }

    // Verify the account
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ 
      success: true, 
      message: "Account verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error("Verify account error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// ====================== IS AUTHENTICATED ======================
export const isAuthenticated = async (req, res) => {
  try {
    if (!req.userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "User is authenticated",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error("Auth check error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// ====================== SEND RESET OTP ======================
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.json({ success: false, message: "Please provide email" });
  }

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpireAt = otpExpireAt;
    await user.save();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Your Password Reset OTP',
      html: `
        <h2>Password Reset</h2>
        <p>Hello ${user.name},</p>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 15 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Send reset OTP error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// ====================== RESET PASSWORD ======================
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Please provide all the fields" });
  }

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.resetPasswordOtpExpireAt) {
      return res.json({ success: false, message: "OTP expired. Please request a new one." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOtp = "";
    user.resetPasswordOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset password error:", error);
    return res.json({ success: false, message: error.message });
  }
};