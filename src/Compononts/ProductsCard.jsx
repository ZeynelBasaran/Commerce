import * as React from "react";

import { ContextPage } from "../ContextApi/ContextPage";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  const { addToBasket } = useContext(ContextPage);

  const { id, title, images, description, price, rating } = product;

  const navigate = useNavigate();

  const handleClick = () => {
    addToBasket(product);
  };

  return (
    <div className="flex-col">
      <div
        className="cursor-pointer shadow-lg"
        onClick={() => navigate("product/" + id)}
        style={{ width: "200px", height: "400px" }}
      >
        <div style={{ width: "150px", height: "250px" }}>
          <img
            src={images[0]}
            alt={title}
            style={{ width: "100%", height: "300px" }}
            className="object-contain"
          />
          <h6> {title} </h6>
          <Rating rating={rating} />
          <p>{price} ₺</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg" onClick={handleClick}>
        Sepete Ekle
      </button>
    </div>




  )
}