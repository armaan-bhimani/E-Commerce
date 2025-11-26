import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, deliveryCharge, setCartItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // Load cart data when cartItems or products change
  useEffect(() => {
    const items = products.filter(product => cartItems[product._id]);
    setCartData(items);
  }, [cartItems, products]);

  // Remove entire product from cart
  const removeFromCart = (productId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[productId];
    setCartItems(updatedCart);
  };

  // Remove specific size from a product
  const removeSizeFromCart = (productId, size) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[productId] && updatedCart[productId][size]) {
      delete updatedCart[productId][size];
      if (Object.keys(updatedCart[productId]).length === 0) {
        delete updatedCart[productId];
      }
      setCartItems(updatedCart);
    }
  };

  // Calculate subtotal
  const subtotal = cartData.reduce((sum, item) => {
    const sizes = cartItems[item._id] || {};
    const itemTotal = Object.values(sizes).reduce((total, qty) => total + qty * item.price, 0);
    return sum + itemTotal;
  }, 0);

  const total = subtotal + deliveryCharge;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartData.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartData.map((item) => {
            // Parse images safely
            let imagesArray = [];
            if (item.images) {
              try {
                imagesArray = typeof item.images === "string" ? JSON.parse(item.images) : item.images;
              } catch (err) {
                console.error("Failed to parse images for product:", item._id, err);
              }
            }

            return (
              <div key={item._id} className="bg-white p-4 shadow rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={imagesArray[0] || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Price: {currency}{item.price}</p>

                    {/* Size-wise details */}
                    <div className="mt-2 space-y-1">
                      {Object.entries(cartItems[item._id] || {}).map(([size, qty]) => (
                        <div key={size} className="flex justify-between items-center text-gray-800">
                          <div>
                            <span className="font-medium">Size: {size}</span> — Qty: {qty} — Total: <b>{currency}{item.price * qty}</b>
                          </div>
                          <button
                            onClick={() => removeSizeFromCart(item._id, size)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                          >
                            Remove Size
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Remove entire product */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            );
          })}

          {/* Totals */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow text-lg font-semibold space-y-2">
            <div>Subtotal: {currency}{subtotal}</div>
            <div>Delivery Charges: {currency}{deliveryCharge}</div>
            <div>Total: {currency}{total}</div>
          </div>

          {/* Proceed to Order Button */}
          <button
            onClick={() => navigate("/place-order")}
            className="mt-4 w-full py-3 bg-green-600 text-white text-lg font-semibold rounded hover:bg-green-700 transition"
          >
            Proceed to Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
