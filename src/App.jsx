import { Routes, Route } from "react-router-dom";
import Navbar from "./Compononts/Navbar/Navbar";
import Basket from "./Pages/Basket";
import Home from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import Degişimİade from "../src/Compononts/Navbar/degisim-iade";
import Guvenliİade from "../src/Compononts/Navbar/guvenli-alisveris";
import HizliGönderi from "../src/Compononts/Navbar/hizli-gonderim";
import MusteriMemnuniyeti from "../src/Compononts/Navbar/musteri-memnuniyeti";
import SingUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Compononts/Footer";
import Error from "./Compononts/Error";






function App() {

  return (
    <>
      <Navbar />
      <Routes >
        {/* Top Banner  */}
        <Route path="/hizli-gonderim" element={<HizliGönderi />}></Route>
        <Route path="/guvenli-alisveris" element={<Guvenliİade />}></Route>
        <Route path="/musteri-memnuniyeti" element={<MusteriMemnuniyeti />}></Route>
        <Route path="/degisim-iade" element={<Degişimİade />}></Route>

        {/* Pages */}
       
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path={`/search/:keyword`} element={<Home />}></Route>
        <Route path="/signup" element={<SingUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Error />}></Route>

      </Routes>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;

/*
<Route path="/basket/product/:id" element={<ProductPage />}></Route>
*/
