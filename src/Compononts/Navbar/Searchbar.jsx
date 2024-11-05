import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useState,useContext } from 'react';
import { ContextPage } from '../../ContextApi/ContextPage';
import { useEffect } from 'react';
import axios from 'axios';




function Searchbar() {
    const { products,setProducts,setLoading  } = useContext(ContextPage);
    const [searchValue,setSearchValue] = useState("")

 

    const changeİnputValue = (e) =>{
        setSearchValue(e.target.value)
    }
    
    const searchValueBtn =async (e) =>{

        e.preventDefault()
        await axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}search?q=${searchValue}`)
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(true);
        });
    }


    return (

        <form className="max-w-md mx-auto">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Ara</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required onChange={changeİnputValue}/>
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={searchValueBtn}>Ara</button>
        </div>
    </form>

        

    )
}

export default Searchbar


/*
   useEffect(()=>{
    },[searchValue])


const filtered =  products.filter((item)=>item.title.toLowerCase().includes(searchValue.toLowerCase()))
        console.log(filtered)
        setProducts(filtered)



*/