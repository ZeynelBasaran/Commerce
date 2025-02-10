import React from 'react'
import { getCategoriesPagesData } from '../Services/ApiService'
import {  useContext } from 'react'
import { ContextPage } from '../ContextApi/ContextPage';
import StickyBox from "react-sticky-box";






function Filter() {
  const { setLoading, categories, setProducts, isVisible } = useContext(ContextPage);

  const choseCategory = async (item) => {
    setLoading(true)
    try {
      const data = await getCategoriesPagesData(item.slug)
      setProducts(data.products)
      setLoading(false)
    } catch (error) {
      console.error("getCategoriesPagesData Hatası", error)
    }
  }


  return (
    <StickyBox className={`self-start sm:block ${isVisible} `}  >
      <section className=' bg-white dark:border rounded-lg'>
        <ul className='grid grid-cols-4 sm:grid-cols-1 p-2' style={{ minWidth: "120px" }}>
          {categories.map((item, key) => <li className='text-sm	cursor-pointer p-1 hover:shadow-xl flex' key={`${item.name}key`} onClick={() => { choseCategory(item) }}>{item.name}</li>)}
        </ul>
      </section>
    </StickyBox>

  )
}

export default Filter;







