import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 w-full">
      <hr className="border-t border-gray-200" />

      <div className="py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-start">
            <img src={assets.logo} alt="Company Logo" className="w-36 mb-6" />
            <p className="text-gray-700 text-lg leading-relaxed font-sans">
              We provide the best products and services to our customers with reliable delivery and support.
            </p>
          </div>

          <div></div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-12">
            <div>
              <h4 className="font-semibold text-xl mb-4 font-sans">Company</h4>
              <ul className="text-gray-700 text-lg font-sans">
                <li><p className="hover:text-gray-900 transition-colors cursor-pointer">Home</p></li>
                <li><p className="hover:text-gray-900 transition-colors cursor-pointer">About Us</p></li>
                <li><p className="hover:text-gray-900 transition-colors cursor-pointer">Delivery</p></li>
                <li><p className="hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</p></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-4 font-sans">Get in Touch</h4>
              <p className="text-gray-700 text-lg font-sans">
                Mobile: <span className="font-medium">03111267462</span>
              </p>
              <p className="text-gray-700 text-lg font-sans">
                Email: <span className="font-medium">armaanbhimani2@gmail.com</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      <hr className="border-t border-gray-200" />

      <div className="py-6 text-center text-gray-600 text-lg font-sans">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
