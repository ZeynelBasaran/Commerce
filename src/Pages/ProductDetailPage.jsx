import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ContextPage } from "../ContextApi/ContextPage";
import Rating from "../Components/Rating";
import Comments from "../Components/Comments";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Loading from "../Components/Loading";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useProductById } from "../Services/ApiService";



function ProductDetailPage() {
  const { addToBasket } =
    useContext(ContextPage);
  const { id } = useParams();

  //Data Fetching
  const { data, isLoading } = useProductById(id);


  if (!id) return <p>Ürün seçilmedi.</p>;
  if (isLoading) return <Loading display={"bg-white md:py-16 dark:bg-gray-900 antialiased"}/>;

  return data && (
    <section className="flex flex-grow flex-col py-8 bg-white md:py-16 dark:bg-gray-900 antialiased ">
      <div className="container px-4 mx-auto 2xl:px-0 ">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <Slide>
            {data.images?.map((item) => (
              <div
                key={`${item.title}a`}
                className="shrink-0 max-w-md lg:max-w-lg mx-auto"
              >
                <img className="w-full dark:hidden object-cover" src={item} alt="" />
                <img className="w-full hidden dark:block " src={item} alt="" />
              </div>
            ))}
          </Slide>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {data.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                ${data.price}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <Rating rating={data.rating} />
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({data.rating})
                </p>
                <a
                  href="#comm"
                  className="text-sm font-medium leading-none text-gray-900  hover:underline dark:text-white"
                >
                  {data.reviews?.length} Yorum
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                onClick={() => { addToBasket(data) }}
                href="#"
                title=""
                className="flex items-center justify-center rounded-lg text-white bg-pink-700 px-5 py-2.5 text-sm font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 "
                role="button"
              >
                <AddShoppingCartIcon />
                Sepete Ekle
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      <div
        id="comm"
        className="max-w-screen-xl px-4 mx-auto 2xl:px-0  bg-white antialiased dark:bg-gray-900 border-2"
      >
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 ">
          <div className="flex items-center gap-2 my-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Yorumlar
            </h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <Rating rating={data.rating} />
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({data.rating})
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900  dark:text-white"
              >
                {data.reviews?.length} Yorum
              </a>
            </div>
          </div>

          {data.reviews?.map((item, key) => {
            return <Comments key={key} item={item} />;
          })}
        </div>
      </div>

    </section>

  )

    ;
}

export default ProductDetailPage;

