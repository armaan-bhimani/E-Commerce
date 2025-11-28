import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="w-full py-16 px-6 flex flex-col items-center">

      <h2 className="text-4xl font-bold tracking-wide text-gray-800 text-center mb-10 relative">
        ABOUT US
        <span className="inline-block ml-2 align-middle w-15 h-0.5 bg-black"></span>
      </h2>

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

        <div>
          <img
            src={assets.about_img}
            alt="About"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            Who We Are
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            We are a passionate team dedicated to delivering high-quality
            digital solutions that empower businesses to grow. Our mission is to
            create modern, intuitive, and scalable applications that truly make
            a difference.
          </p>

          <p className="text-gray-700 leading-relaxed">
            With strong focus on creativity, innovation, and customer
            satisfaction, we consistently strive to provide exceptional services
            and ensure that every project delivers meaningful results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
