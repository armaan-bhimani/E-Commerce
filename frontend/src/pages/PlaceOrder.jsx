import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const { products, currency, cartItems, deliveryCharge, setCartItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Form state (controlled inputs)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    contact: "",
  });

  // Load cart data
  useEffect(() => {
    const items = products.filter((product) => cartItems[product._id]);
    setCartData(items);
  }, [cartItems, products]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Calculate subtotal and total
  const subtotal = cartData.reduce((sum, item) => {
    const sizes = cartItems[item._id] || {};
    const itemTotal = Object.values(sizes).reduce((total, qty) => total + qty * item.price, 0);
    return sum + itemTotal;
  }, 0);

  const total = subtotal + deliveryCharge;

  // Place order handler
  const handlePlaceOrder = () => {
    alert("Your order has been placed successfully!");
    setCartItems({}); 
    setForm({      
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      zip: "",
      state: "",
      country: "",
      contact: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className="w-1/2 border p-2 rounded"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className="w-1/2 border p-2 rounded"
            />
          </div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="w-full border p-2 rounded"
          />
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            type="text"
            placeholder="Street Address"
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-4">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              type="text"
              placeholder="City"
              className="w-1/2 border p-2 rounded"
            />
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              type="text"
              placeholder="ZIP / Postal Code"
              className="w-1/2 border p-2 rounded"
            />
          </div>
          <div className="flex gap-4">
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              type="text"
              placeholder="State"
              className="w-1/2 border p-2 rounded"
            />
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              type="text"
              placeholder="Country"
              className="w-1/2 border p-2 rounded"
            />
          </div>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            type="tel"
            placeholder="Contact Number"
            className="w-full border p-2 rounded"
          />
        </form>

        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Cash on Delivery</li>
            <li>Easypaisa</li>
            <li>JazzCash</li>
          </ul>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full py-3 bg-green-600 text-white text-lg font-semibold rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {cartData.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartData.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  {Object.entries(cartItems[item._id] || {}).map(([size, qty]) => (
                    <p key={size} className="text-gray-600 text-sm">
                      Size {size} x {qty} — {currency}{item.price * qty}
                    </p>
                  ))}
                </div>
                <p className="font-semibold">
                  {currency}{Object.values(cartItems[item._id] || {}).reduce((total, qty) => total + qty * item.price, 0)}
                </p>
              </div>
            ))}

            <div className="border-t pt-2 space-y-2 text-lg font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>{currency}{deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span>Total</span>
                <span>{currency}{total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
