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
<div className="flex flex-col justify-center shadow-lg">
      <div
        onClick={() => navigate("product/" + id)}
        style={{ maxWidth: "200px", maxHeight: "250px" }}
      >
        <img
          src={images[0]}
          alt={title}
          style={{ width: "100%", height: "100%" }}
          className="object-contain"
        />
      </div>

      <div onClick={() => navigate("product/" + id)}>
        <Rating rating={rating} />
        <h6> {title} </h6>
        <p>{price} $ </p>
      </div>

      <div className="flex justify-center">
        <button className="btn1 rounded-lg w-50" onClick={handleClick}>
          Sepete Ekle
        </button>
      </div>
    </div >
    

  )
}



/*


*/