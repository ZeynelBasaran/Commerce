import React from 'react'
import { getCategories, getCategoriesPagesData } from '../Services/ApiService'
import { useEffect,useContext } from 'react'
import { ContextPage } from '../ContextApi/ContextPage';




function Filter() {
  const { setLoading,categories,setCategories,setProducts } = useContext(ContextPage);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
        setLoading(false)
      } catch (error) {
        console.error("getCategories Hatası", error)
      }
    }
    fetchData()

  }, [])



  const choseCategory= (item) =>{
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
    <div>
      <ul>
        {categories.map((item,key)=> <li onClick={()=>{choseCategory(item)}} key={`${item.name}key`}>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default Filter