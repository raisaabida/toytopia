import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./contexts/AuthContext";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
