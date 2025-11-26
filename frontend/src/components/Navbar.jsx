import React, { useState, useContext } from 'react';
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AppContext } from '../context/appContext';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Get cart count from ShopContext
  const { getCartCount } = useContext(ShopContext);
  
  // Get auth state from AppContext
  const { isLoggedIn, logout, user } = useContext(AppContext);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium px-4">

        <Link to='/'>
          <img src={assets.logo} className="w-28" alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
          <NavLink to="/" className="relative group">
            <p className="hover:text-gray-500">HOME</p>
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gray-700 
              scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </NavLink>

          <NavLink to="/collection" className="relative group">
            <p className="hover:text-gray-500">COLLECTION</p>
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gray-700 
              scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </NavLink>

          <NavLink to="/about" className="relative group">
            <p className="hover:text-gray-500">ABOUT</p>
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gray-700 
              scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </NavLink>

          <NavLink to="/contact" className="relative group">
            <p className="hover:text-gray-500">CONTACT</p>
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gray-700 
              scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">

          {/* Profile Dropdown */}
          <div className="relative group cursor-pointer">
            <img src={assets.profile_icon} className="w-5 h-5" alt="profile" />
            
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg 
                            text-gray-700 opacity-0 invisible group-hover:opacity-100 
                            group-hover:visible transition-all duration-300 z-50">
              
              {isLoggedIn ? (
                <>
                  {user && (
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-xs text-gray-500">Hello,</p>
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                    </div>
                  )}
                  <Link to="/profile">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</p>
                  </Link>
                  <Link to="/orders">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</p>
                  </Link>
                  <p 
                    onClick={handleLogout} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  >
                    Logout
                  </p>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Login</p>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 h-5" alt="cart" />
            <p className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
              {getCartCount()}
            </p>
          </Link>

          {/* Hamburger Menu */}
          <img
            src={assets.menu_icon}
            className="sm:hidden w-4 h-4 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            alt="menu"
          />
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center p-4 border-b">
            <img src={assets.logo} className="w-28" alt="logo" />
            <button onClick={() => setSidebarOpen(false)} className="text-gray-700 text-2xl font-bold">&times;</button>
          </div>

          {/* User Info in Sidebar */}
          {isLoggedIn && user && (
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm font-semibold">{user.name}</p>
            </div>
          )}

          <nav className="flex flex-col mt-4 gap-4 px-4 text-gray-700">
            <NavLink to="/" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
              HOME
            </NavLink>
            <NavLink to="/collection" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
              COLLECTION
            </NavLink>
            <NavLink to="/about" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
              ABOUT
            </NavLink>
            <NavLink to="/contact" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
              CONTACT
            </NavLink>
            
            <hr className="my-2" />
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
                  My Profile
                </Link>
                <Link to="/orders" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
                  Orders
                </Link>
                <button 
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }} 
                  className="text-left hover:text-red-500 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
                  Login
                </Link>
                <Link to="/login" onClick={() => setSidebarOpen(false)} className="hover:text-gray-500">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Overlay */}
        {sidebarOpen &&
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        }

      </div>

      {/* HR at the bottom of Navbar */}
      <hr className="border-t border-gray-300 mt-2" />
    </>
  );
};

export default Navbar;