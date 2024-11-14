import React, { useEffect, useContext } from "react";
import ProductCard from "../Compononts/ProductsCard";
import { ContextPage } from "../ContextApi/ContextPage";
import Loading from "../Compononts/Loading"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import Filter from "../Compononts/Filter";
import { getData } from "../Services/ApiService";






function Products() {
  const { products, loading, basket, setUserInfo, userInfo, userActive,setProducts,setLoading,totalAmount } = useContext(ContextPage);



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
        const data = await getData()
        setProducts(data.products)
        setLoading(false)
      } catch (error) {
        console.error("getData Hatası", error)
      }
    }
    fetchData()
    getUserİnfo()
    totalAmount()
  }, [basket]);

  if (loading) {
    return <Loading />
  }
  
  return (
    <>
    
      {userActive && <h1 className="container bg-white dark:bg-gray-800 text-black dark:text-white">Hoşgeldiniz sayın {userInfo.displayName}</h1>}
      {userActive && <h1 className="container bg-white dark:bg-gray-800 text-black dark:text-white">Hoşgeldiniz sayın {userInfo.displayName}</h1>}
      <div className="container flex flex-col sm:flex sm:flex-row gap-1 ">
        <Filter />
        <div className="flex flex-wrap justify-center sm:justify-between gap-2 ">
          {products?.map((product, index) => (
            <ProductCard key={`${index}pro`} product={product} />
          ))}
        </div>
      </div>

    </>

  );
}

export default Products;




