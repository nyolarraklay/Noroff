import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { DatePicker, Space } from 'antd';
import useStore from "../Store";
import SearchResults from "../Search";
import {  useNavigate } from 'react-router-dom';




function Search() {
  const { venues } = useStore();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const navigate = useNavigate();

      const handleSearchChange = (e) => {
        setSearchText(e.target.value);
      };

    const fetchSearchVenues = (searchText) => {
      const filteredVenues = venues.filter((venue) => venue && venue.name && venue.name.toLowerCase().includes(searchText.toLowerCase()))
      setSearchResults(filteredVenues);
      navigate('/search-results', { state: { results: filteredVenues } });
    };

    const handleChange = () => {
      fetchSearchVenues(searchText);
    };
  
    const handleCheckInDateChange = (date, dateString) => {
      console.log(date, dateString);
      setCheckInDate(date);
    };
  
    const handleCheckOutDateChange = (date, dateString) => {
      console.log(date, dateString);
      setCheckOutDate(date);
    };

  return (
    <div className="pt-20 px-8 bg-background-home bg-cover bg-center bg-no-repeat w-full h-72">
        <div className="bg-black w-full h-48 opacity-100 p-4 flex flex-col space-y-4">
     
            <div className="flex items-center justify-between p-2 bg-white rounded-lg mt-2 w-full">
              <LuSearch />
            <label htmlFor="searchInput" className="sr-only">Search for a venue...</label>
               <input type="search" 
                  id="searchInput"
                className="w-full ml-2 bg-transparent focus:outline-none text-black font-bold"
                placeholder="Search for a venue..."
                value={searchText}
                onChange={handleSearchChange}
                />
            </div>
            <div className='flex items-center justify-between p-2 bg-white rounded-lg mt-2 w-full'>
                <div>
                  <Space direction="vertical">
                  <DatePicker onChange={handleCheckInDateChange} placeholder='Check in' format={"ddd-MMM-YYYY"} popupClassName='text-xs w-72'
                 className='text-xs font-bold text-black'
                 />
                  </Space>  
                </div>
                <div>
                  <Space direction="vertical">
                    <DatePicker onChange={handleCheckOutDateChange}
                  placeholder='Check Out'
                   format={"ddd-MMM-YYYY"}
                   popupClassName='text-xs w-72'
                 className='text-xs font-bold text-black'
                    />
                  </Space>  
                </div>  
            </div>

            <button onClick={handleChange} className='text-white bg-blue-500 rounded-md p-2' >Search</button>
             
           
        </div>

    </div>
  )
}

export default Search