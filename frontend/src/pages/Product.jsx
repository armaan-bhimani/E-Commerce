import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'; // stars

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProduct] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Load product by ID
  const fetchProduct = () => {
    const product = products.find(p => p._id === productId);

    if (product) {
      // Parse images safely
      let imagesArray = [];
      if (product.images) {
        try {
          imagesArray = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
        } catch (err) {
          console.error('Failed to parse images for product:', product._id, err);
        }
      }

      setProduct({ ...product, images: imagesArray });
      setImage(imagesArray[0] || ''); // set first image
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    } else {
      setProduct(null);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="text-center py-10 text-gray-500 text-xl">
        Product not found...
      </div>
    );
  }

  const rating = productData.rating || 4;
  const totalRatings = productData.totalRatings || 122;

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Left: Images */}
        <div className="w-full md:w-1/2 flex gap-4">
          <div className="flex flex-col gap-2">
            {productData.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`w-16 h-16 object-cover rounded cursor-pointer border 
                  ${image === img ? "border-black" : "border-gray-300"}`}
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={image}
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{productData.name}</h1>

          <p className="text-2xl font-semibold text-gray-900">
            {currency}{productData.price}
          </p>

          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(num => (
              <img
                key={num}
                src={rating >= num ? assets.star_icon : assets.star_dull_icon}
                className="w-5 h-5"
              />
            ))}
            <span className="ml-2 text-gray-600">({totalRatings})</span>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {productData.description || "No description available."}
          </p>

          {productData.sizes && productData.sizes.length > 0 && (
            <div>
              <p className="font-medium mb-2">Select Size:</p>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg 
                      ${selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="w-full mt-4 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>

          <hr className="border-gray-300 my-4" />

          <div className="text-gray-600 text-sm space-y-1">
            <p>✔ Easy 7-day exchange</p>
            <p>✔ Premium packaging</p>
            <p>✔ 100% quality guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
