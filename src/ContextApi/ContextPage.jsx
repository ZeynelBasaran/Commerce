import { useEffect } from "react";
import { createContext, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { getCategories } from "../Services/ApiService";
const ContextPage = createContext();

//LS'de Eleman varsa basket a ekleyecek.
const getLSBasket = () => {
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
  const [isDarkMode, setİsDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const [userActive, setUserActive] = useState(localStorage.getItem("userActive") === "true" || false);

  const [userInfo, setUserInfo] = useState([]);
  const [isVisible, setIsVisible] = useState("hidden");

  const [basket, setBasket] = useState(getLSBasket());
  const [basketPrice, setBasketPrice] = useState(0);
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
      toast("Ürün Sepete Eklendi.");
    } else {
      setBasket((prev) => [...prev, { ...product, adet: 1 }]);
      addLocalStorage([...basket, { ...product, adet: 1 }]);
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
    addLocalStorage(removeItem);
    toast("1 Adet Ürün Sepetten Çıkarıldı.");
  };

  const removeItemFromBasket = (product) => {
    const filterList = basket.filter((items) => items.id !== product.id);
    setBasket(filterList);
    addLocalStorage(filterList);
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


  useEffect(()=>{
    const getCat = async () => {
    try {
      const category = await getCategories()
      setCategories(category)
    } catch (error) {
      console.error("getCategories Hatası", error)
    }
  }
    getCat()
  },[])
  
  return (
    <ContextPage.Provider
      value={{
        basket,
        addToBasket,
        decreaseFromBasket,
        products,
        loading,
        setLoading,
        removeItemFromBasket,
        addLocalStorage,
        userActive,
        setUserActive,
        userInfo,
        setUserInfo,
        setProducts,
        setCategories,
        categories,
        isDarkMode,
        setİsDarkMode,
        setBasket,
        basketPrice,
        totalAmount,
        isVisible,
        setIsVisible,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextComp; //Provider Compo exportu
export { ContextPage }; //ContextExportu
