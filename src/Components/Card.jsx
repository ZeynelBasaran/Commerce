import React from 'react'
import FavoriteBar from "./Favorite";
import Rating from "./Rating";
import { useNavigate } from "react-router";
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext,useEffect } from "react";

const Card = ({product}) => {
    const navigate = useNavigate();
    const { addToBasket } = useContext(ContextPage);


  return (
    <div className="h-[350px] max-w-[450px] min-w-[250px] bg-white border border-gray-200 rounded-lg hover:shadow-xl relative" >
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
  )
}

export default Card