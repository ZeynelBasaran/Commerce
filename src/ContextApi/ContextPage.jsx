import { useEffect } from "react";
import { createContext, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

const ContextPage = createContext();


//LocalStorage'dan veri çekmek için fonksiyon
const getFromLocalStorage = (key, defaultValue = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};
//LocalStorage'da veri saklamak için fonksiyon
const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};


function ContextComp({ children }) {
  const [isDarkMode, setİsDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [searchValue, setSearchValue] = useState("");
  const [userActive, setUserActive] = useState(localStorage.getItem("userActive") === "true" || false);

  const [userInfo, setUserInfo] = useState([]);


  const [basketPrice, setBasketPrice] = useState(0);
  const [filter, setFilter] = useState([])
  const [sortOrder, setSortOrder] = useState("sırala");



  //Sepet ve Favoriler için localStorage'dan veri çekiyoruz.
  const [basket, setBasket] = useState(() => getFromLocalStorage("basket"));
  const [favorites, setFavorites] = useState(() => getFromLocalStorage("favorites"));


  //Fonksiyon ile sepete eleman ekleme
  const addToBasket = (product) => {
    //Önce basket da mevcut mu kontrol ? False ise direkt adet ekleyerek itemi ekliyoruz True ise daha önce eklenmiş map ile manipüle ediyoruz.
    const findProduct = basket.find((item) => {
      return item.id === product.id;
    });

    if (findProduct) {
      const newArr = basket.map((item) => {
        return item.id === findProduct.id
          ? { ...item, adet: item.adet + 1 }
          : item;
      });
      setBasket(newArr);
      setToLocalStorage("basket", newArr);
      toast("Ürün Sepete Eklendi.");
    } else {
      setBasket((prev) => [...prev, { ...product, adet: 1 }]);
      setToLocalStorage("basket", [...basket, { ...product, adet: 1 }]);
      toast("Ürün Sepete Eklendi.");
    }
  };

  //Fonksiyon ile sepette ürün silmek.Seçtigimiz itemı basket içinde bulup ilgili eleman map ile manipüle edilir. Adet 0'dan küçükse filtre edilir.
  const decreaseFromBasket = (product) => {
    const removeItem = basket
      .map((item) => {
        return item.id === product.id ? { ...item, adet: item.adet - 1 } : item;
      })
      .filter((item) => item.adet > 0);
    setBasket(removeItem);
    setToLocalStorage("basket", removeItem);
    toast("1 Adet Ürün Sepetten Çıkarıldı.");
  };

  const removeItemFromBasket = (product) => {
    const filterList = basket.filter((items) => items.id !== product.id);
    setBasket(filterList);
    setToLocalStorage("basket", filterList);
    toast("Ürün Sepetten kaldırıldı.");
  };

  //Basket USD Toplamı
  const totalAmount = () => {
    let toplam = 0;
    basket?.map((item) => {
      toplam += item.adet * item.price;
    });
    setBasketPrice(toplam);
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      // Eğer ürün favorilerde varsa çıkar
      if (prevFavorites.find((productID) => productID === id)) {
        updatedFavorites = prevFavorites.filter(
          (productID) => productID !== id
        );
      } else {
        // Yeni bir favori eklerken önceki state'i koruyoruz
        updatedFavorites = [...prevFavorites, id];
      }

      setToLocalStorage("favorites", updatedFavorites);
      return updatedFavorites;
    });
  };

  return (
    <ContextPage.Provider
      value={{
        sortOrder, setSortOrder,
        basket,
        addToBasket,
        decreaseFromBasket,
        removeItemFromBasket,
        userActive,
        setUserActive,
        userInfo,
        setUserInfo,
        isDarkMode,
        setİsDarkMode,
        setBasket,
        basketPrice,
        totalAmount,
        searchValue,
        setSearchValue,
        filter, setFilter, favorites, setFavorites, toggleFavorite
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextComp;
export { ContextPage }; 
