import React, { useEffect, useContext } from "react";
import ProductCard from "../Compononts/ProductsCard";
import { ContextPage } from "../ContextApi/ContextPage";
import Loading from "../Compononts/Loading"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";




function Products() {
  const { products, getData, loading, basket,setUserInfo,userInfo,userActive } = useContext(ContextPage);
  
  const getUserİnfo = () => {
    onAuthStateChanged(auth,(userCredential)=>{
      if(userCredential){
        console.log(userCredential)
        setUserInfo(userCredential)   
      }
    })
  }

  useEffect(() => {
    getData()
    getUserİnfo()
  }, [basket]);

  if (loading) {
    return <Loading />
  }
  return (
    <>
       {userActive && <h1>Hoşgeldiniz sayın {userInfo.displayName}</h1>}
      <div className="container flex flex-wrap justify-between gap-2">

        {products?.map((product, index) => ( 
          <ProductCard key={`${index}pro`} product={product} />
        ))}
      </div>
    </>

  );
}

export default Products;

//{<Alert message={alerts.message} type={alerts.type} />}
