import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className="py-25 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
        
        {/* Policy Item 1 */}
        <div className="flex flex-col items-center text-center p-4">
          <img src={assets.exchange_icon} alt="Exchange Icon" className="w-13 h-13 mb-4" />
          <p className="text-lg font-semibold text-gray-800 mb-1">Easy Exchange Possible</p>
          <p className="text-gray-600 text-sm">We offer hassle-free exchange policy</p>
        </div>

        {/* Policy Item 2 */}
        <div className="flex flex-col items-center text-center p-4">
          <img src={assets.quality_icon} alt="Return Icon" className="w-13 h-13 mb-4" />
          <p className="text-lg font-semibold text-gray-800 mb-1">7 Days Return Policy</p>
          <p className="text-gray-600 text-sm">We provide 7 days free return policy</p>
        </div>

        {/* Policy Item 3 */}
        <div className="flex flex-col items-center text-center p-4">
          <img src={assets.support_img} alt="Support Icon" className="w-13 h-13 mb-4" />
          <p className="text-lg font-semibold text-gray-800 mb-1">Best Customer Support</p>
          <p className="text-gray-600 text-sm">We provide 24/7 customer support</p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
