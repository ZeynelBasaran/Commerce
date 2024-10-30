import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextComp from "./ContextApi/ContextPage.jsx";




createRoot(document.getElementById("root")).render(
  <ContextComp>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextComp>
);
