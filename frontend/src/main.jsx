import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { AppProvider } from "./context/appContext.jsx"; // your auth/backend context

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
