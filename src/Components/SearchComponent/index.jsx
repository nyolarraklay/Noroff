import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import useStore from "../Store";
import { set } from 'react-hook-form';






function Search({onStateChange}) {
  const { searchVenues } = useStore();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
 
    async function handleSearch(query) {

      if (!query) {
       
        setSearchResults([]);
        onStateChange([]);
        return;
      }
      setLoading(true);

      try {
        const result = await searchVenues(query);
        setSearchResults(result || []); 
        onStateChange(result || []);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
        onStateChange([]);
      } finally {
        setLoading(false);
      }
    }
    
    
    
  return (
    <div className="pt-20 px-8 bg-background-home bg-cover bg-center bg-no-repeat w-full h-72 sm:flex sm:flex-col sm:items-center sm:justify-center lg:relative lg:h-56 lg:bg-background-home-lg lg:bg-center ">
        <h1 className="text-white text-lg mb-3 text-center sm:text-2xl font-bold font-serif">Your Budget-Friendly Vacation Solution!</h1>
        <div className="bg-background-color-navigation  p-4 flex flex-col space-y-4 max-w-2xl ">
     
            <div className="flex items-center justify-between p-2 bg-white rounded-lg mt-2">
              <LuSearch />
            <label htmlFor="searchInput" className="sr-only">Search for a venue...</label>
               <input type="search" 
                  id="searchInput"
                className="w-full ml-2 bg-transparent focus:outline-none text-black font-bold"
                placeholder="Search for a venue..."
                onChange ={(e) => handleSearch(e.target.value)}
                />

            </div>
            {loading && <p className="text-white">Searching...</p>}
           
        </div>
        
    </div>
  )
}

export default Search