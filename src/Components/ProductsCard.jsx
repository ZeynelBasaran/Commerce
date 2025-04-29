
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext, useEffect } from "react";
import { useProducts, useCategoryData, useSearch } from "../Services/ApiService";
import Loading from "./Loading"
import { useState, useMemo } from "react";
import Card from "./Card";



export default function ProductCards() {

  const { filter,searchValue,sortOrder, setSortOrder } = useContext(ContextPage);
  
  console.log(searchValue)

  const { data: allProducts, isLoading: loadingProducts } = useProducts();
  const { data: filterProduct, isLoading: loadingFilter } = useCategoryData(filter);
 
  //Data display durumunu belirle
  const productsToDisplay = filter.length > 0 ? filterProduct : allProducts;

  const sortedProducts = useMemo(() => {
    if (!productsToDisplay) return [];

    const sorted = [...productsToDisplay];

    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [productsToDisplay, sortOrder]);


  if (loadingProducts || loadingFilter) return <Loading display={"col-span-6 md:col-span-9 min-h-ful"} />



  return (
    <div className="col-span-6 md:col-span-9 min-h-full">

      <div className="flex justify-center md:justify-end my-4 items-center">

        <select
          className="text-black rounded-lg py-2 px-6 "
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="sırala" disabled>Sırala</option>
          <option value="default">Varsayılan</option>
          <option value="asc">Fiyat: Artan</option>
          <option value="desc">Fiyat: Azalan</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-screen">
        {sortedProducts?.map((product, i) => (
          <Card product={product} key={i} />
        ))}
      </div>
    </div>
  )
}









