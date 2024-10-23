import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ContextPage } from "../ContextApi/ContextPage";
import Rating from "../Compononts/Rating";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ToastContainer, toast } from 'react-toastify';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function ProductPage() {
  const { products, addToBasket,removeFromBasket, basket,addLocalStorage } = useContext(ContextPage);
  

  const { id } = useParams();

  let selectedItem = products.find((item) => {
    return item.id == id;
  });

  
  const { title, images, description, price, rating, stock } =
    selectedItem;

  useEffect(() => {
    
  }, []);
  //const adet = basket.filter((item)=> {return item.id ==selectedItem.id ? item.adet : null})
  
    //console.log(adet?.[0].adet)

  const addClick = () => {
    addToBasket(selectedItem);
  };
  const removeClick = () => {
    removeFromBasket(selectedItem);
  };

  return (
    <>
      <div className="container flex">

        <div className="" style={{width:"400px", height:"600px"}}>
          <img src={images} alt="" style={{maxWidth:"100%", maxHeight:"100%" }}/>
        </div>

        <div className="">
          <h1>{title}</h1>
          <div>
            <Rating rating={rating} />
          </div>
          <h5>{description}</h5>
          <h1>{price}</h1>
          
          <div className="flex justify-between items-center">
            <div className="flex">
              <p>Adet Seçimi</p>
              <p>
                Toplam Stok <span>{stock}</span>
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <RemoveCircleOutlineIcon onClick={removeClick}/>
              
              <AddCircleOutlineIcon onClick={addClick} />
            </div>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addClick}>Sepete Ekle</button>
        </div>
      </div>
    </>
  );
}

export default ProductPage;

/*

{adet ? <p>{adet[0].adet}</p>  : <p>0</p>}
*/
