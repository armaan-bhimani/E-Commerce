import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Update from "./pages/Update"; // NEW
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backend_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Persist token in localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // If not logged in, show login page
  if (!token) {
    return (
      <>
        <ToastContainer />
        <Login setToken={setToken} />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col h-full bg-gray-50">
        {/* Navbar */}
        <Navbar setToken={setToken} />
        <hr />

        {/* Main container */}
        <div className="flex flex-1 h-full">
          {/* Sidebar */}
          <div className="h-full w-64 bg-white shadow-md">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route path="/update/:id" element={<Update token={token} />} /> {/* NEW */}
              <Route path="*" element={<List token={token} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
