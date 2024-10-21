import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import BasketComp from "./ContextApi/ContextPage.jsx";



createRoot(document.getElementById("root")).render(
  <BasketComp>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BasketComp>
);
