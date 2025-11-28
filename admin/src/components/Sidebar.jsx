import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="min-h-screen fixed h-full w-64 bg-white shadow-lg p-6">

      <div className="space-y-4">

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl cursor-pointer 
            transition-all ${
              isActive
                ? "bg-pink-200 text-black"   
                : "bg-gray-100 text-black hover:bg-pink-200" 
            }`
          }
        >
          <img src={assets.add_icon} alt="" className="w-6" />
          <p className="text-lg font-medium">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl cursor-pointer 
            transition-all ${
              isActive
                ? "bg-pink-200 text-black"
                : "bg-gray-100 text-black hover:bg-pink-200"
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="w-6" />
          <p className="text-lg font-medium">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl cursor-pointer 
            transition-all ${
              isActive
                ? "bg-pink-200 text-black"
                : "bg-gray-100 text-black hover:bg-pink-200"
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="w-6" />
          <p className="text-lg font-medium">Orders</p>
        </NavLink>

      </div>

    </div>
  );
};

export default Sidebar;
