import * as React from "react";
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router";
import Rating from "./Rating";
import { useProducts, useCategoryData,useSearch } from "../Services/ApiService";
import Loading from "./Loading"
import { useState,useMemo } from "react";

import { useDebounce } from "../Hooks/useDebounce";

const SearchPage = () => {
    const navigate = useNavigate();
  const { addToBasket,searchValue,setSearchValue,searchResultsState, setSearchResultsState } = useContext(ContextPage);

  //Search Debunce
  const debouncedSearchTerm = useDebounce(searchValue, 800)
  const { data, isLoading, isSuccess } = useSearch(debouncedSearchTerm);

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (isSuccess && searchResults?.length > 0) {
        setSearchResultsState(searchResults); // Datayı state'e kaydet
        setSearchValue(""); // İnputu temizle
      }
    }
  }, [debouncedSearchTerm, isSuccess, searchResults]);


  const productsToDisplay = useMemo(() => {
    if (searchResultsState.length > 0) return searchResultsState;
    if (filter.length > 0) return filterProduct;
    return allProducts;
  }, [searchResultsState, filter, filterProduct, allProducts]);

  if (debouncedSearchTerm && isLoading) return <Loading display={""} />

  return (
    <main className='flex-grow'>

    </main>
  )
}

export default SearchPage