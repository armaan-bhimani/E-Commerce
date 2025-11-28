import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      if (state === "Sign Up") {
        if (!otpSent) {
          // Step 1: Register user and send OTP
          const { data } = await axios.post(
            backendUrl + "/api/auth/register",
            { name, email, password },
            { withCredentials: true }
          );

          if (!data.success) {
            return toast.error(data.message || "Registration failed");
          }

          toast.success(data.message || "Registration successful!");

          // Step 2: Automatically send OTP after successful registration
          const otpRes = await axios.post(
            backendUrl + "/api/auth/send-verify-otp",
            {},
            { withCredentials: true }
          );

          if (otpRes.data.success) {
            setOtpSent(true);
            toast.success("OTP sent to your email! Please verify.");
          } else {
            toast.error(otpRes.data.message || "OTP sending failed");
          }
        } else {
          // Step 3: Verify OTP
          const verifyRes = await axios.post(
            backendUrl + "/api/auth/verify-otp",
            { otp },
            { withCredentials: true }
          );

          if (verifyRes.data.success) {
            toast.success("Account verified! Logging you in...");
            
            // Update state and fetch user data
            setIsLoggedIn(true);
            await getUserData();
            
            // Clear form and navigate to home
            setOtpSent(false);
            setName("");
            setEmail("");
            setPassword("");
            setOtp("");
            navigate("/");
          } else {
            toast.error(verifyRes.data.message || "OTP verification failed");
          }
        }
      } else {
        // Login flow
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success(data.message || "Login successful!");
          setIsLoggedIn(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="h-12 cursor-pointer"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {state === "Sign Up" 
              ? (otpSent ? "Verify Your Email" : "Create Account") 
              : "Login"}
          </h2>
          <p className="text-gray-600 mt-2">
            {state === "Sign Up" 
              ? (otpSent ? "Enter the OTP sent to your email" : "Create your account") 
              : "Login to your account!"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && !otpSent && (
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full outline-none"
              />
            </div>
          )}

          {!otpSent && (
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <input
                type="email"
                placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none"
              />
            </div>
          )}

          {!otpSent && (
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none"
              />
            </div>
          )}

          {state === "Sign Up" && otpSent && (
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <img src={assets.lock_icon} alt="otp" className="w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full outline-none"
              />
            </div>
          )}

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-sm text-blue-600 hover:underline cursor-pointer text-right"
            >
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {state === "Sign Up" ? (otpSent ? "Verify OTP" : "Sign Up") : "Login"}
          </button>
        </form>

        {/* Toggle */}
        {!otpSent && (
          <p className="text-center text-sm text-gray-600 mt-4">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setState("Login");
                    setName("");
                    setEmail("");
                    setPassword("");
                  }}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setState("Sign Up");
                    setEmail("");
                    setPassword("");
                  }}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Sign up here
                </span>
              </>
            )}
          </p>
        )}

        {otpSent && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Didn't receive OTP?{" "}
            <span
              onClick={async () => {
                try {
                  const { data } = await axios.post(
                    backendUrl + "/api/auth/send-verify-otp",
                    {},
                    { withCredentials: true }
                  );
                  if (data.success) {
                    toast.success("OTP resent successfully!");
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  toast.error("Failed to resend OTP");
                }
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Resend OTP
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;