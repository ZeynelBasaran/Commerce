import { useEffect, useState, useContext } from "react";
import Badge from "../Badge";
import { Link, useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Drawer from "@mui/material/Drawer";
import useToggle from "../../Hooks/useToggle";
import Banner from "./TopBanner";
import Logo from "/Public/1.webp";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import Searchbar from "./Searchbar";
import { ContextPage } from "../../ContextApi/ContextPage";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";

function Navbar() {
  const {
    isDarkMode,
    setİsDarkMode,
    basket,
    setUserActive,
    userActive,
    setUserInfo,
    basketPrice,
    isVisible,
    setIsVisible,
    removeItemFromBasket,
  } = useContext(ContextPage);

  const navigate = useNavigate();

  const { open, changeFunc } = useToggle();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const logOut = async () => {
    await signOut(auth);
    setUserActive(false);
    setUserInfo([]);
    navigate("/login");
    toast.success("Çıkış Yapıldı.");
    
  };

  const changeTheme = () => {
    setİsDarkMode(!isDarkMode);
  };

  const formatToCurrency = (num) => {
    // Sayıyı virgülden sonra 2 basamakla sınırlayıp USD simgesi ekler ve binlik ayraç kullanır
    return (
      "$" +
      num
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  };

  return (
    <>
      <nav className="flex-row bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-b-2 border-b-2 border-white dark:border-white">
        <Banner />

        <div className="flex justify-between container">
          <ul className="flex gap-x-4 items-center py-2">
            <li>
              <Link to={"/"} className="cursor">
                <img src={Logo} alt="" width={80} />
              </Link>
            </li>

            <li>
              <Link to={"/basket"} className="cursor-pointer">
                Sepet
              </Link>
            </li>

            {userActive ? (
              <>
                <li>
                  <Link className="cursor-pointer" onClick={logOut}>
                    Çıkış Yap
                  </Link>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>

          <ul className="flex items-center gap-x-4">
            <li className="">
              <Searchbar />
            </li>
            <li className="hidden sm:block">
              {isDarkMode ? (
                <LightModeIcon
                  className="cursor-pointer"
                  onClick={changeTheme}
                />
              ) : (
                <DarkModeIcon
                  className="cursor-pointer "
                  onClick={changeTheme}
                />
              )}
            </li>
            <li
              className="cursor-pointer  hidden sm:block"
              onClick={changeFunc}
            >
              <Badge />
            </li>
            <li className="cursor-pointer sm:hidden">
              <MenuIcon
                onClick={() => {
                  setIsVisible(isVisible === "" ? "hidden" : "");
                }}
              />
            </li>
          </ul>
        </div>
      </nav>

      <Drawer
        sx={{}}
        anchor="right"
        open={open}
        onClose={() => {
          changeFunc();
        }}
      >
        {basket?.map((item, idx) => {
          return (
            <ul
              key={`${item}${idx}`}
              className={`flex items-center justify-between gap-x-2 px-4 py-4`}
            >
              <div className="flex items-center">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{ width: "50px", height: "50px" }}
                />
                <p className="mx-1" style={{ width: "200px" }}>
                  {item.title.substring(0, 40)}({item.adet})
                </p>
              </div>

              <div className="font-light text-base">{item.price}</div>
              <div className="font-extrabold mx-2 text-lg">
                {formatToCurrency(item.adet * item.price)}
              </div>
              <button
                onClick={() => {
                  removeItemFromBasket(item);
                }}
                type="button"
                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500 item-cursor"
              >
                <svg
                  className="me-1.5 h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </button>
            </ul>
          );
        })}
        <div className="px-4 ">Toplam Tutar : ${basketPrice}</div>
      </Drawer>
    </>
  );
}
export default Navbar;
