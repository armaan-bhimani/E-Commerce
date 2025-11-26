import React from 'react'
import img from "../assets/banner_img.jpg"

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 min-h-[500px]">

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8">
        <div className="text-[#414141] text-center">

          <div className="flex items-center gap-2 mb-2 justify-center">
            <p className="w-8 md:w-11 h-0.5 bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2 mt-4 justify-center">
            <p className="font-semibold text-sm md:text-base cursor-pointer">SHOP NOW</p>
            <p className="w-8 md:w-11 h-px bg-[#414141]"></p>
          </div>

        </div>
      </div>

      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img className="w-full h-full object-cover" src={img} alt="Hero" />
      </div>

    </div>
  )
}

export default Hero
