import React from "react";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const location = useLocation();
  const order = location.state;

  // If no order data was passed
  if (!order) {
    return <p className="p-6 text-xl">No order data found.</p>;
  }

  const {
    items = [],
    cartItems = {},
    currency = "Rs ",
    subtotal = 0,
    deliveryCharge = 0,
    total = 0,
  } = order;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {/* Items Section */}
      <div className="space-y-5">
        {items.length === 0 ? (
          <p className="text-gray-600">No items in this order.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow bg-white"
            >
              <h3 className="font-semibold text-xl">{item.name}</h3>

              {/* Sizes & Quantities */}
              {Object.entries(cartItems[item._id] || {}).map(
                ([size, qty]) => (
                  <p key={size} className="text-gray-700">
                    Size: <b>{size}</b> — Qty: <b>{qty}</b> — Total:{" "}
                    <b>
                      {currency}
                      {qty * item.price}
                    </b>
                  </p>
                )
              )}
            </div>
          ))
        )}
      </div>

      {/* Totals */}
      <div className="mt-6 p-4 bg-gray-200 rounded-lg font-semibold text-lg">
        <p>
          Subtotal: {currency}
          {subtotal}
        </p>
        <p>
          Delivery Charge: {currency}
          {deliveryCharge}
        </p>
        <p className="text-xl mt-2">
          Total: {currency}
          {total}
        </p>
      </div>
    </div>
  );
};

export default Orders;
