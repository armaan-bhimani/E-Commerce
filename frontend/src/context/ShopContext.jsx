import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryCharge = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]); // fetched products
  const [cartItems, setCartItems] = useState({});
  const [orderSummary, setOrderSummary] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/products/list`);
      if (res.data.success && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        console.error("Failed to fetch products:", res.data);
      }
    } catch (err) {
      console.error("Error fetching products from backend:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add to cart function
  const addToCart = (productId, size) => {
    let cardData = structuredClone(cartItems);
    if (cardData[productId]) {
      if (cardData[productId][size]) {
        cardData[productId][size] += 1;
      } else {
        cardData[productId][size] = 1;
      }
    } else {
      cardData[productId] = {};
      cardData[productId][size] = 1;
    }
    setCartItems(cardData);
  };

  // Get total cart count
  const getCartCount = () => {
    let total = 0;
    Object.values(cartItems).forEach((productSizes) => {
      Object.values(productSizes).forEach((qty) => (total += qty));
    });
    return total;
  };

  useEffect(() => {
    console.log("Cart Items Updated:", cartItems);
    console.log("Cart Count:", getCartCount());
  }, [cartItems]);

  const shopData = {
    products,
    currency,
    deliveryCharge,
    cartItems,
    addToCart,
    getCartCount,
    setCartItems,
    orderSummary,
    setOrderSummary,
    backendUrl,
  };

  return <ShopContext.Provider value={shopData}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
