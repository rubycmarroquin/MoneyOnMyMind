import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Auth0WithNavigate from "./auth/Auth0WithNavigate";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0WithNavigate>
      <App />
    </Auth0WithNavigate>
  </BrowserRouter>
);
