import React from 'react'
import { getCategories, getCategoriesPagesData } from '../Services/ApiService'
import { useEffect, useContext } from 'react'
import { ContextPage } from '../ContextApi/ContextPage';




function Filter() {
  const { setLoading, categories, setCategories, setProducts } = useContext(ContextPage);

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
    <section className=' bg-white border border-gray-200 rounded-lg'>
      <ul className='grid grid-cols-3 sm:grid-cols-1' style={{minWidth:"120px"}}>
        {categories.map((item,key)=> <li className='text-sm	cursor-pointer p-1 hover:shadow-xl flex' key={`${item.name}key`} onClick={() => { choseCategory(item) }}>{item.name}</li>)}
      </ul>
    </section>
  )
}

export default Filter;



