import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="w-full py-16 px-6 flex flex-col items-center">

      {/* Title */}
      <h2 className="text-4xl font-bold text-gray-800 tracking-wide text-center mb-10">
        CONTACT US
        <span className="inline-block ml-2 w-17 h-[2px] bg-black align-middle"></span>
      </h2>

      {/* Content Wrapper */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Image on Left */}
        <div className="w-full">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Contact Details on Right */}
        <div className="flex flex-col justify-center space-y-4">

          {/* Email */}
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:armaanbhimani2@gmail.com"
              className="text-blue-600 hover:underline"
            >
              armaanbhimani2@gmail.com
            </a>
          </p>

          {/* Phone */}
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Phone:</span>{" "}
            <a href="tel:+92311126742" className="text-blue-600 hover:underline">
              +92 311 126742
            </a>
          </p>

          {/* Address */}
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Address:</span>{" "}
            123 Tech Street, Lahore, Pakistan
          </p>

          {/* Office Hours */}
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Office Hours:</span>{" "}
            Monday - Friday, 9:00 AM - 6:00 PM
          </p>

          {/* Social Media (optional) */}
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Follow Us:</span>{" "}
            <a href="#" className="text-blue-600 hover:underline">Facebook</a>,{" "}
            <a href="#" className="text-blue-600 hover:underline">Twitter</a>,{" "}
            <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Contact;
