import React from 'react'
import { getCategories, getCategoriesPagesData } from '../Services/ApiService'
import { useEffect, useContext } from 'react'
import { ContextPage } from '../ContextApi/ContextPage';
import StickyBox from "react-sticky-box";






function Filter() {
  const { setLoading, categories, setCategories, setProducts,isVisible } = useContext(ContextPage);

  const fetchData = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
      setLoading(false)
    } catch (error) {
      console.error("getCategories Hatası", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])



  const choseCategory = (item) => {
    const fetchData = async () => {
      try {
        const data = await getCategoriesPagesData(item.slug)
        setProducts(data.products)
        setLoading(false)
      } catch (error) {
        console.error("getCategoriesPagesData Hatası", error)
      }
    }
    fetchData()
  }


  
  return (
    <StickyBox className={`self-start sm:block ${isVisible} `}  >
    <section className=' bg-white dark:border rounded-lg'>
      <ul className='grid grid-cols-4 sm:grid-cols-1 p-2' style={{minWidth:"120px"}}>
        {categories.map((item,key)=> <li className='text-sm	cursor-pointer p-1 hover:shadow-xl flex' key={`${item.name}key`} onClick={() => { choseCategory(item) }}>{item.name}</li>)}
      </ul>
    </section>
    </StickyBox>
    
  )
}

export default Filter;







