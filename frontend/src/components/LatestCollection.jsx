import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLatestProducts(products.slice(0, 5)); // take first 10 products
  }, [products]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); 
  };

  // Helper function to get first image safely
  const getFirstImage = (product) => {
    if (!product.images) return null;
    try {
      const imagesArray =
        typeof product.images === "string" ? JSON.parse(product.images) : product.images;
      return imagesArray.length > 0 ? imagesArray[0] : null;
    } catch (err) {
      console.error("Failed to parse images for product:", product._id, err);
      return null;
    }
  };

  return (
    <div className="py-20 px-4 sm:px-8 lg:px-16 bg-white flex flex-col items-center">
    
      <div className="text-center flex flex-col items-center mb-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3 inline-flex items-center relative">
          <span className="w-16 h-[3px] bg-gray-800 mr-4 hidden sm:inline-block"></span>
          LATEST COLLECTIONS
        </h3>
        <p className="text-gray-600 text-sm md:text-base max-w-md mt-2">
          Discover our newest arrivals for this season.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-[1600px]">
        {latestProducts.map((product, index) => {
          const imageUrl = getFirstImage(product);

          return (
            <div
              key={product._id ?? index}
              onClick={() => handleProductClick(product._id)}
              className="cursor-pointer flex flex-col items-start p-2 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name || "Product Image"}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-2">
                  No Image
                </div>
              )}
              <h3 className="text-gray-800 font-semibold">{product.name}</h3>
              <p className="text-gray-600 font-medium">${product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
