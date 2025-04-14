import * as React from "react";
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Rating from "./Rating";
import { useProducts, useCategoryData } from "../Services/ApiService";
import Loading from "./Loading"
import { useState,useMemo } from "react";
import FavoriteBar from "./Favorite";



export default function ProductCards() {
  const { addToBasket, filter } = useContext(ContextPage);

  const { data: allProducts, isLoading: loadingProducts } = useProducts();
  const { data: filterProduct, isLoading: loadingFilter } = useCategoryData(filter);
  const [sortOrder, setSortOrder] = useState("sırala");

  const navigate = useNavigate();

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

  
  if (loadingFilter || loadingProducts) return <Loading display={"col-span-6 md:col-span-9 min-h-ful"}/>

  return (
    <div className="col-span-6 md:col-span-9 min-h-full">

      <div className="flex justify-center md:justify-end my-4 items-center">
       
        <select
          className="text-black rounded-lg py-2 px-6 "
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="sırala" disabled selected>Sırala</option>
          <option value="default">Varsayılan</option>
          <option value="asc">Fiyat: Artan</option>
          <option value="desc">Fiyat: Azalan</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-screen">
        {sortedProducts?.map((product, i) => (
          <div className="h-[350px] max-w-[450px] min-w-[250px] bg-white border border-gray-200 rounded-lg hover:shadow-xl relative" key={`${product.title}${i}i`} >

            <div className="w-full" style={{ height: "200px" }}>
              <a onClick={() => navigate("/product/" + product.id)} className="cursor-pointer">
                <img className="w-full h-full object-contain" src={product.images[0]} alt={product.title} />
              </a>
            </div>

            <FavoriteBar productID={product.id} />

            <div className="p-3 w-full" style={{ height: "150px" }}>
              <a onClick={() => navigate("/product/" + product.id)} className="cursor-pointer">
                <h5 className="text-sm font-semibold tracking-tight text-gray-900 line-clamp-1	">{product.title}</h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Rating rating={product.rating} reviews={product.reviews} />
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 ">{product.price} $</span>
                <button onClick={() => { addToBasket(product) }} className="	cursor-pointer     text-sm  rounded-lg text-white bg-pink-700 px-5 py-2.5 font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800	">Sepete Ekle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}









