import * as React from "react";
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext } from "react";
import { useNavigate,useParams } from 'react-router';
import { useEffect } from "react";




export default function Basket() {
  const { basket, decreaseFromBasket, addToBasket, removeItemFromBasket, basketPrice, totalAmount } = useContext(ContextPage);
  const navigate = useNavigate()
 
  useEffect((
  ) => { totalAmount() }, [basket])

  const decreaseItemBtn = (item) => {
    decreaseFromBasket(item);
  };
  const increaseItemBtn = (item) => {
    addToBasket(item);
  };
  const removeItemBtn = (item) => {
    removeItemFromBasket(item);
  };

  function formatToCurrency(num) {
    // Sayıyı virgülden sonra 2 basamakla sınırlayıp USD simgesi ekler ve binlik ayraç kullanır
    return '$' + num.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <div className="flex-grow dark:bg-gray-900 dark:text-white p-4">
      <section className="container bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto  px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Sepetteki Ürünler</h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">

                {basket?.map((item, key) => (
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6" key={`${item.title}${key}`}>
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="w-20 shrink-0 md:order-1">
                        <img className="h-20 w-20 dark:hidden" src={item.images[0]} alt="imac image" />
                        <img className="hidden h-20 w-20 dark:block" src={item.images[0]} alt="imac image" />
                      </a>

                      <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button type="button" id="decrement-button-5" onClick={() => { decreaseItemBtn(item) }} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <span type="text" id="counter-input-5" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">{item.adet}</span>
                          <button type="button" id="increment-button-5" onClick={() => { increaseItemBtn(item) }} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">${item.price}</p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a onClick={() => navigate("product/" + item.id)} className="text-base font-medium text-gray-900 hover:underline dark:text-white cursor-pointer">{item.title}</a>

                        <div className="flex gap-4">
                          <button onClick={() => { removeItemBtn(item) }} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500 item-cursor">
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Sepetten Çıkar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                )}

              </div>

            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Toplam</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Vergisiz Toplam</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">{formatToCurrency(basketPrice-(basketPrice*0.2))}</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">KDV %20</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">{formatToCurrency(basketPrice*0.2)}</dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Toplam Tutar</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">{formatToCurrency(basketPrice)}</dd>
                  </dl>
                </div>
                
                <a href="#" className="flex w-full items-center justify-center rounded-lg bg-pink-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Satın Al</a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> veya </span>
                  <a onClick={()=>{navigate("/")}} title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700  focus:outline-none dark:text-primary-500 cursor-pointer hover:underline">
                    Alışverişe Devam Et
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>


    </div>

  );
}




/*


*/
