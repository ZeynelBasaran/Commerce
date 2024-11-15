import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ContextPage } from "../ContextApi/ContextPage";
import Rating from "../Compononts/Rating";
import Comments from "../Compononts/Comments";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductPage() {

  const { products, addToBasket, decreaseFromBasket } = useContext(ContextPage);
  const { id } = useParams();

  let selectedItem = products.find((item) => {
    return item.id == id;
  });

  const { title, images, description, price, rating, stock, reviews } =
    selectedItem;

  useEffect(() => {

  }, [])


  const decreaseItemBtn = () => {
    decreaseFromBasket(selectedItem);
  };
  const increaseItemBtn = () => {
    addToBasket(selectedItem);
  };


  
  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased ">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img className="w-full dark:hidden" src={images[0]} alt="" />
            <img className="w-full hidden dark:block" src={images[0]} alt="" />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1
              className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
            >
              {title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p
                className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
              >
                ${price}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <Rating rating={rating} />
                </div>
                <p
                  className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                >
                  ({rating})
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {reviews.length} Yorum
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                onClick={increaseItemBtn}
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                <AddShoppingCartIcon />
                Sepete Ekle
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>


      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0  bg-white antialiased dark:bg-gray-900 border-2">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 ">
          <div className="flex items-center gap-2 my-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Yorumlar</h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <Rating rating={rating} />
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">({rating})</p>
              <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"> {reviews.length} Reviews </a>
            </div>


          </div>

          {reviews.map((item, key) => {
            return <Comments key={key} item={item} />
          })}


        </div>
      </div>

    </section>
  );
}

export default ProductPage;

