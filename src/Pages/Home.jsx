import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../Compononts/ProductsCard";
import axios from "axios";
import { ContextPage } from "../ContextApi/ContextPage";
import Alert from "../Compononts/Alert";
import Loading from "../Compononts/Loading"




function Products() {
  const { products, getData, loading, alerts, basket } = useContext(ContextPage);

  useEffect(() => {
    getData()
  /*
    const timer = setTimeout(() => {
      setLoading(false)
      setAlerts({
        type: "",
        message: "",
      });

    }, 3000);
    return () => clearTimeout(timer);
*/
  }, [basket]);

  if(loading){
   return <Loading />
  }
  return (
    <>
    
     <div className="container flex flex-wrap justify-between gap-2">
      
      {products?.map((product, index) => (
        <ProductCard key={`${index}pro`} product={product}/>
      ))}
    </div>
    </>
   
  );
}

export default Products;

//{<Alert message={alerts.message} type={alerts.type} />}
