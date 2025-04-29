import SearchIcon from '@mui/icons-material/Search';
import { useContext,useEffect } from 'react';
import { ContextPage } from '../../ContextApi/ContextPage';
import { useDebounce } from '../../Hooks/useDebounce';
import { useSearch } from '../../Services/ApiService';





function Searchbar() {
    const { searchValue, setSearchValue } = useContext(ContextPage);
 
    /*
    const debouncedSearchTerm = useDebounce(searchValue, 1000);

    // React Query hook doğrudan burada çağrılır
    const { data, isLoading, error } = useSearch(debouncedSearchTerm);

    useEffect(() => {
        if (debouncedSearchTerm && data) {
            console.log("API Sonuçları:", data);
        }
    }, [debouncedSearchTerm, data]);

    */


    return (
        <div className="max-w-md mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon />
                </div>
                <input value={searchValue} type="search" id="search" name='search' className="block w-full p-4 ps-10 text-sm  border border-pink-300 rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-black dark:focus:ring-pink-500  outline-none focus:outline-none" required onChange={(e) => { setSearchValue(e.target.value) }} placeholder='Ara...' />

            </div>
        </div>
    )
}

export default Searchbar



