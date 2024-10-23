import { Routes, Route } from "react-router-dom";
import Navbar from "./Compononts/Navbar/Navbar";
import Basket from "./Pages/Basket";
import Product from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import Register from "./Pages/Register";
import Degişimİade from "../src/Compononts/Navbar/degisim-iade";
import Guvenliİade from "../src/Compononts/Navbar/guvenli-alisveris";
import HizliGönderi from "../src/Compononts/Navbar/hizli-gonderim";
import MusteriMemnuniyeti from "../src/Compononts/Navbar/musteri-memnuniyeti";
import User from "./Pages/User";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Top Banner  */}
        <Route path="/hizli-gonderim" element={<HizliGönderi />}></Route>
        <Route path="/guvenli-alisveris" element={<Guvenliİade />}></Route>
        <Route path="/musteri-memnuniyeti" element={<MusteriMemnuniyeti />}></Route>
        <Route path="/degisim-iade" element={<Degişimİade />}></Route>
        
        {/* Pages */}
        <Route path="/" element={<Product />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user" element={<User />}></Route>

      </Routes>
    </>
  );
}

export default App;
