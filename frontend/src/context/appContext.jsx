import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create context
export const AppContext = createContext();

// AppContextProvider component
export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Configure axios globally
  axios.defaults.baseURL = backendUrl;
  axios.defaults.withCredentials = true; 

  // Check authentication state
  const getAuthState = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      console.log("Auth State Response:", data);

      if (data.success) {
        setIsLoggedIn(true);
        if (data.data) {
          setUser(data.data);
        } else {
          await getUserData();
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error.response?.data || error.message);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  // Fetch user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      console.log("User Data Response:", data);

      if (data.success) {
        setUser(data.data);
      } else {
        toast.error(data.message || "Failed to fetch user data");
        setUser(null);
      }
    } catch (error) {
      console.error("User fetch failed:", error.response?.data || error.message);
      setUser(null);
    }
  };

  // Logout
  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUser(null);
        toast.success("Logged out successfully");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    getUserData,
    getAuthState,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
