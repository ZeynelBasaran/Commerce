import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

const ContextPage = createContext();

//LS'de Eleman varsa basket a ekleyecek.
const getLS = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

//LS ye item ekleme
const addLocalStorage = (item) => {
  localStorage.setItem("basket", JSON.stringify(item));
};





function ContextComp({ children }) {

  //console.log(`${import.meta.env.VITE_APP_BASE_URL}`)


  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userActive, setUserActive] = useState(false)
  const [userInfo, setUserInfo] = useState([])
 
  console.log(userInfo)
  const [alerts, setAlerts] = useState({
    type: "success",
    message: "Yükleniyor...",
  });

  const [basket, setBasket] = useState(getLS());
  const [products, setProducts] = useState([]);

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
      //setAlerts({ type: "success", message: "Ürün Eklendi" })
      addLocalStorage(newArr);
    } else {
      setBasket((prev) => [...prev, { ...product, adet: 1 }]);
      //[...basket, { ...product, adet: 1 }]
      addLocalStorage([...basket, { ...product, adet: 1 }]);
    }


  };

  //Fonksiyon ile sepette ürün silmek.Seçtigimiz itemı basket içinde bulup ilgili eleman map ile manipüle edilir. Adet 0'dan küçükse filtre edilir.
  const removeFromBasket = (product) => {
    const removeItem = basket
      .map((item) => {
        return item.id === product.id ? { ...item, adet: item.adet - 1 } : item;
      })
      .filter((item) => item.adet > 0);
    setBasket(removeItem);
    addLocalStorage(removeItem);
  };

  /*Slice ile item silme yapabilirdik. Direkt filter ile eşit olmayını yakalayıp yeni listeden çıkardık.
  setBasket((prev) => prev.filter((item) => item.id !== product.id));
  */
  const getData = async () => {
    await axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        //setAlerts({ type: "error", message: "Fetching Hatası" })
      });
  };


  console.log(basket)


  return (
    //Value ile metodlar ve veriler gönderilmekte
    <ContextPage.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        getData,
        products,
        loading,
        setLoading,
        alerts,
        setLoading,
        setTheme,
        theme,
        addLocalStorage,
        userActive,
        setUserActive, userInfo, setUserInfo
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextComp; //Provider Compo exportu
export { ContextPage }; //ContextExportu
