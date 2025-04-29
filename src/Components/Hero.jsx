import React from "react";
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useProductById } from "../Services/ApiService";
import Loading from "./Loading";



export default function Hero() {
  const { addToBasket } = useContext(ContextPage);
  const navigate = useNavigate();

  const { data, isLoading } = useProductById("78");
  
  

  if (isLoading) return <Loading display={"bg-white py-8 antialiased dark:bg-gray-900 md:py-16 container"} />


  const { title, description, images, id } = data;

  return data && (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 container">
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <div className="col-span-12 md:col-span-7 md:text-start">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl text-center md:text-left">{title}</h1>
          <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl text-center md:text-justify">{description}</p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => { addToBasket(data); }}
              className="	cursor-pointer text-sm  rounded-lg text-white bg-pink-700 px-5 py-2.5 font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              Sepete Ekle
            </button>
            <a
              onClick={() => navigate("/product/" + id)}
              className="cursor-pointer inline-flex items-center justify-center px-5 py-3 ml-3 text-base font-medium text-center rounded-lg  text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              İncele
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 md:mt-0 md:flex">
          <img className="object-cover" src={images[0]} />
        </div>
      </div >

    </section >
  );
}

