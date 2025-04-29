import React, { useEffect, useContext, useState } from "react";
import ProductCards from "../Components/ProductsCard";
import { ContextPage } from "../ContextApi/ContextPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import Filter from "../Components/Filter";
import Hero from "../Components/Hero";




export default function Home() {
  const { setUserInfo, userInfo, userActive } = useContext(ContextPage);

  const getUserİnfo = () => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        setUserInfo(userCredential)
      }
    })
  }

  useEffect(() => {
    getUserİnfo()
    localStorage.setItem("userActive", userActive)
  }, [userActive])

  

  return (
    <main className="flex-grow bg-white dark:bg-gray-900 text-black dark:text-white py-4">
      <section className="container">
        {userActive && <h1 className="container text-center p-2">Hoşgeldiniz Sayın {userInfo.displayName} Alışverişe Başlayabilirsiniz.</h1>}
      </section>
      <Hero />
      <section className="container grid grid-col-6  md:grid-cols-12 gap-4">
          <Filter />
          <ProductCards />
      </section>
    </main>

  );
}


