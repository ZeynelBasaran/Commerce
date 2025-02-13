import React, { useEffect, useContext, useState } from "react";
import ProductCard from "../Compononts/ProductsCard";
import { ContextPage } from "../ContextApi/ContextPage";
import Loading from "../Compononts/Loading"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import Filter from "../Compononts/Filter";
import { getData, getCategories } from "../Services/ApiService";
import Hero from "../Compononts/Hero";
import { useCallback } from "react";



export default function Home() {
  const { products, loading, basket, setUserInfo, userInfo, userActive, setProducts, setLoading, totalAmount, setCategories } = useContext(ContextPage);



  const getUserİnfo = () => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        setUserInfo(userCredential)
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("getData Hatası", error);
      }
    };
  
    fetchData();
  }, []);


  useEffect(() => {
    getUserİnfo()
    localStorage.setItem("userActive", userActive)
  }, [userActive])



  if (loading) {
    return <Loading />
  }

  return (
    <main className="flex-grow  bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="">
        {userActive && <h1 className="container text-center p-2">Hoşgeldiniz Sayın {userInfo.displayName} Alışverişe Başlayabilirsiniz.</h1>}
      </div>
      <Hero randomNumber={2} />
      <div className="dark:bg-gray-900 dark:text-black p-4 ">
        <div className="container flex-col sm:flex sm:flex-row flex gap-2">
          <Filter className="" />
          <div className="flex flex-wrap justify-center sm:justify-between gap-2">
            {products?.map((product, index) => (
              <ProductCard key={`${index}pro`} product={product} />
            ))}
          </div>
        </div>
      </div>


    </main>

  );
}



