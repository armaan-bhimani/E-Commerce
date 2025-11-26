import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">

        {/* Logo */}
        <img 
          src={assets.logo} 
          alt="logo" 
          className="w-32 md:w-40 object-contain cursor-pointer"
        />

        {/* Logout Button */}
        <button 
          onClick={() => setToken('')}
          className="bg-gray-700 text-white px-5 py-2 rounded-xl font-medium 
                     hover:bg-black transition-all"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;
