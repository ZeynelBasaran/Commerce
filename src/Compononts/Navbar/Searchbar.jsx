import React, { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useState, useContext } from 'react';
import { ContextPage } from '../../ContextApi/ContextPage';


import axios from 'axios';
import { useNavigate } from 'react-router';




function Searchbar() {
    const { setProducts, setLoading, products, searchValue, setSearchValue } = useContext(ContextPage);


    const navigate = useNavigate()

    /*
    useEffect(() => {

    }, [])

    */



    const searchValueBtn = async (e) => {
        e.preventDefault()
        await axios
            .get(`${import.meta.env.VITE_APP_BASE_URL}search?q=${searchValue}`)
            .then((res) => {
                setProducts(res.data.products);
                navigate(`/search/${searchValue}`)
                setLoading(false);
            })
            .catch((err) => {
                setLoading(true);
            });
        setSearchValue("")
    }


    return (
        <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Ara</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon />
                </div>
                <input value={searchValue} type="search" id="search" name='search' className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => { setSearchValue(e.target.value) }} />
                <button type="submit" className=" absolute end-2.5 bottom-2.5 rounded-lg text-white bg-pink-700 px-5 py-2.5 text-sm font-medium hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={searchValueBtn}>Ara</button>
            </div>
        </form>
    )
}

export default Searchbar



