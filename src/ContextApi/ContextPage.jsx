import axios from "axios";
import { createContext, useState } from "react";
import React from "react";
import { toast } from "react-toastify";


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

  const [basket, setBasket] = useState(getLS());
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


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
      addLocalStorage(newArr);
    } else {
      setBasket((prev) => [...prev, { ...product, adet: 1 }]);
      //[...basket, { ...product, adet: 1 }]
      addLocalStorage([...basket, { ...product, adet: 1 }]);
    }
    toast("Ürün Sepete Eklendi.")
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
    toast("Ürün Sepetten kaldırıldı.")
  };

  console.log(products)

  return (

    <ContextPage.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        products,
        loading,
        
        setLoading,
        setTheme,
        theme,
        addLocalStorage,
        userActive,
        setUserActive, userInfo, setUserInfo, setProducts, setCategories, categories

      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextComp; //Provider Compo exportu
export { ContextPage }; //ContextExportu


