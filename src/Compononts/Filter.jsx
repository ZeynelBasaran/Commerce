import React from 'react'
import { getCategories } from '../Services/ApiService'
import { useEffect,useContext } from 'react'
import { ContextPage } from '../ContextApi/ContextPage';




function Filter() {
  const { setLoading,categories,setCategories } = useContext(ContextPage);

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

  return (
    <div>
      <ul>
        {categories.map((item,key)=> <li key={item.name}>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default Filter