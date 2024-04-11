import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { DatePicker, Space } from 'antd';




function Search() {
    const [search, setSearch] = useState('')
    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };


    const handleSearch = (value) => {
        setSearch(value)
    }

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
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className='flex items-center justify-between p-2 bg-white rounded-lg mt-2 w-full'>
                <div>
            <Space direction="vertical">
                 <DatePicker onChange={onChange} placeholder='Check in' format={"ddd-MMM-YYYY"} popupClassName='text-xs w-72'
                 className='text-xs font-bold text-black'
                 />
                 </Space>  
            </div>
            <div>
            <Space direction="vertical">
                 <DatePicker onChange={onChange} 
                  placeholder='Check Out'
                   format={"ddd-MMM-YYYY"}
                   popupClassName='text-xs w-72'
                 className='text-xs font-bold text-black'
     
                    />
                 </Space>  
            </div>  
            </div>

            <button className='text-white bg-blue-500 rounded-md p-2' >Search</button>
       
          

        </div>

    </div>
  )
}

export default Search