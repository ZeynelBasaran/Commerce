import React, { useEffect, useContext } from "react";
import ProductCard from "../Compononts/ProductsCard";
import { ContextPage } from "../ContextApi/ContextPage";
import Loading from "../Compononts/Loading"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import Filter from "../Compononts/Filter";
import { getData,getCategories } from "../Services/ApiService";









function Products() {
  const { products, loading, basket, setUserInfo, userInfo, userActive, setProducts, setLoading, totalAmount,setCategories } = useContext(ContextPage);



  const getUserİnfo = () => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        setUserInfo(userCredential)
      }
    })
  }

  const fetchData = async () => {
    try {
      const data = await getData()
      const category = await getCategories()
      setProducts(data.products)
      setCategories(category)
      setLoading(false)
    } catch (error) {
      console.error("getData Hatası", error)
    }
  }



  useEffect(() => {
    fetchData()
    getUserİnfo()
    totalAmount();
    localStorage.setItem("userActive", userActive)
  }, [basket, userActive]);



  if (loading) {
    return <Loading />
  }

  return (
    <main className="flex-grow  bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="">
        {userActive && <h1 className="container text-center p-2">Hoşgeldiniz Sayın {userInfo.displayName} Alışverişe Başlayabilirsiniz.</h1>}
      </div>
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

export default Products;



