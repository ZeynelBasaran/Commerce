import { Routes, Route } from "react-router-dom";
import Navbar from "./Compononts/Navbar";
import Basket from "./Pages/Basket";
import Product from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";




function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        
      </Routes>
    </>
  );
}

export default App;
