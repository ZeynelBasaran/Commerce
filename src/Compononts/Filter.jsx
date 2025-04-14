import React, { useState } from 'react'
import { useContext } from 'react'
import { ContextPage } from '../ContextApi/ContextPage';
import { useCategory, useCategoryData } from "../Services/ApiService";
import Loading from './Loading';





function Filter() {
  const { setFilter, isVisible, setIsVisible } = useContext(ContextPage);
  const { data, isLoading } = useCategory();
  const [selected, setSelected] = useState([]);

  const handleChange = (e) => {
    const category = e.target.value;
    setSelected((prev) => {
      if (prev.includes(category)) {
        // Kategori zaten seçiliyse, çıkar
        return prev.filter(item => item !== category);
      } else {
        // Kategori seçili değilse, ekle
        return [...prev, category];
      }
    });
  };



  if (isLoading) return <Loading display={"col-span-6 md:col-span-3 w-full flex flex-col"}/>

  return (

    <section className="col-span-6 md:col-span-3 w-full flex flex-col">
      <div className='flex justify-center items-center my-4'>
        <button
          className="cursor-pointer text-sm  rounded-lg text-white bg-pink-700  font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 flex items-center py-2 px-10"
          type="button" onClick={() => { isVisible === "hidden" ? setIsVisible("") : setIsVisible("hidden") }}>
          Filtrele
          <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      <div className={`${isVisible} bg-white rounded-lg shadow dark:bg-gray-700 transition-all duration-500 w-full p-4 `}>
        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Kategoriler
        </h6>
        <ul className="space-y-2 text-sm grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1 " aria-labelledby="dropdownDefault">

          {data.map((item, i) =>

            <li className="flex items-center" key={`${item.name}${i}`} >
              <input
                id={item.name}
                className='w-4 h-4 bg-pink-100 border-pink-300 rounded text-pink-600 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-pink-700 focus:ring-2 dark:bg-pink-600 dark:border-pink-500 accent-pink-500'
                type="checkbox"
                value={item.slug}
                checked={selected.includes(item.slug)}
                onChange={handleChange}
              />
              <label htmlFor={item.name} className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer'>

                {item.name}
              </label>
            </li>

          )}







        </ul>
        <div className='flex flex-row md:flex-col md:gap-y-4 justify-between lg:flex-row lg:justify-between mt-10 '>

          <button type='button' className='cursor-pointer text-sm rounded-lg text-white bg-pink-700 font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 px-4 py-2' onClick={(e) => {
            e.preventDefault(); // Olası bir form submitini engeller
            setFilter(selected);
          }}>Filtrele</button>

          <button className='cursor-pointer text-sm rounded-lg text-white bg-pink-700 font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 px-4 py-2' onClick={() => { setSelected([]) }}>Temizle</button>

        </div>
      </div>


    </section>



  )
}

export default Filter;

/*

<section className=' bg-white dark:border rounded-lg'>
<h2 className='text-center font-bold'>Filtrele</h2>
<ul className='grid grid-cols-4 sm:grid-cols-1 p-2 min-h-[120px]'>
  {data.map((item, i) =>
    <li className='text-sm	cursor-pointer p-1 hover:shadow-xl flex items-center' key={`${item.name}${i}`} >
      <label key={item.name} className='text-black'>
        <input
          className='mr-2 text-black'
          type="checkbox"
          value={item.slug}
          checked={selected.includes(item.slug)}
          onChange={handleChange}
        />
        {item.name}
      </label>
    </li>
  )}


</ul>


</section>


*/





