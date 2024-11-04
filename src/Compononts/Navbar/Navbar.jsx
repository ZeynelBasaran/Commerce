import { useEffect, useState,useContext } from "react";
import Badge from "../Badge";
import { Link, useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Drawer from "@mui/material/Drawer";
import useToggle from "../../Hooks/useToggle";
import Banner from "./TopBanner";
import Logo from "/Public/1.webp"
import "../components.css"
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import Searchbar from "./Searchbar";
import { ContextPage } from "../../ContextApi/ContextPage";



function Navbar() {
  const { theme, setTheme, basket, addToBasket, removeFromBasket, setUserActive, userActive, setUserInfo } =
    useContext(ContextPage);

  const navigate = useNavigate()

  const { open, changeFunc } = useToggle()
  const [toplamTutar, setToplamTutar] = useState(0);




  useEffect(() => {
    toplamTutarFunc()
  }, [addToBasket, removeFromBasket])


  const changeTheme = () => {
    setTheme(!theme);
    const root = document.getElementById("root");
    if (theme) {
      root.style.backgroundColor = "black";
      root.style.color = "white";
    } else {
      root.style.backgroundColor = "white";
      root.style.color = "black";
    }
  };

  const toplamTutarFunc = () => {
    let toplam = 0;
    basket?.map((item) => {
      toplam += item.adet * item.price
    })

    setToplamTutar(toplam)
  }

  const logOut = async () => {
    await signOut(auth)
    setUserActive(false)
    setUserInfo([])
    navigate("/login")

  }

  return (
    <>
      <nav className="flex-row">
        <Banner />

        <div className="flex justify-between container">
          <ul className="flex gap-x-2 items-center py-2">

            <li>

              <Link to={"/"} className="cursor">
                <img src={Logo} alt="" width={80} />
              </Link>
            </li>
            <li>
              <Link to={"/basket"} className="cursor">
                Basket
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className="cursor">
                Kayıt ol
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="cursor">
                Giriş yap
              </Link>
            </li>
            {userActive && <li>
              <Link to={"/info"} className="cursor">
                Bilgileri Güncelle
              </Link>
            </li>}
            {userActive && <li className="cursor-pointer" onClick={logOut}>
              Çıkış Yap
            </li>}
          </ul>

          <ul className="flex items-center gap-x-4">
            <li className="">
              <Searchbar />
            </li>
            <li>
              {theme ? (
                <DarkModeIcon className="cursor-pointer" onClick={changeTheme} />
              ) : (
                <LightModeIcon className="cursor-pointer" onClick={changeTheme} />
              )}
            </li>
            <li className="cursor-pointer" onClick={changeFunc}>
              <Badge />
            </li>
          </ul>
        </div>

      </nav>

      <Drawer anchor="right" open={open} onClose={() => { changeFunc() }}>
        {basket?.map((item, idx) => {
          return (

            <ul key={`${item}${idx}`} className={` flex items-center justify-between gap-x-2 px-10 py-4  `} >
              <div className="flex items-center">
                <img
                  src={item.images}
                  alt={item.title}
                  style={{ width: "50px", height: "50px" }}

                />
                <p className="mx-1" style={{ width: "250px" }}>{`${item.title} (${item.adet})`}</p>
              </div>

              <div style={{ fontSize: "0.9rem" }}>{item.price + "₺"}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "900" }}>{item.adet * item.price}₺</div>
              <button onClick={() => { removeFromBasket(item) }}>Sil</button>
            </ul>

          );
        })}
        <div>Toplam Tutar : {toplamTutar}</div>
      </Drawer>
    </>
  );
}
export default Navbar;
