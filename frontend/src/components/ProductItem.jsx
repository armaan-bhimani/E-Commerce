import React from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = React.useContext(ShopContext)

  return (
    <Link to={`/product/${id}`} className="block group w-full">
      <div className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
        <img 
          src={Array.isArray(image) ? image[0] : image} 
          alt={name} 
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <p className="mt-3 text-gray-800 text-left">{name}</p>
      <p className="text-gray-600 text-left font-bold">{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
