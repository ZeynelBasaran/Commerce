import * as React from "react";
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  const { addToBasket } = useContext(ContextPage);

  const { id, title, images, price, rating, reviews } = product;

  const navigate = useNavigate();

  const handleClick = () => {
    addToBasket(product);
  };

  return (
    <div style={{width: "230px", height: "350px" }} className=" bg-white border border-gray-200 rounded-lg hover:shadow-xl" >

      <div className="w-full" style={{ height: "200px" }}>
        <a onClick={() => navigate("/product/" + id)} className="cursor-pointer">
          <img className="w-full h-full" src={images[0]} alt={title} />
        </a>
      </div>

      <div className="p-3 w-full" style={{ height: "150px" }}>
        <a onClick={() => navigate("/product/" + id)} className="cursor-pointer">
          <h5 className="text-sm font-semibold tracking-tight text-gray-900 line-clamp-1	">{title}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Rating rating={rating} reviews={reviews} />
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 ">{price} $</span>
          <button onClick={handleClick} className="	cursor-pointer     text-sm  rounded-lg text-white bg-pink-700 px-5 py-2.5 font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800	">Sepete Ekle</button>
        </div>
      </div>
    </div>

  )
}









