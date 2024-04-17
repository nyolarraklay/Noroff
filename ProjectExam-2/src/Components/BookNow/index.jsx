import React from 'react'
import { DatePicker, Space } from 'antd';
import { useState } from 'react';

function BookNow() {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const handleCheckInDateChange = (date, dateString) => {
        console.log(date, dateString);
        setCheckInDate(date);
      };
    
      const handleCheckOutDateChange = (date, dateString) => {
        console.log(date, dateString);
        setCheckOutDate(date);
      };
  
  return (
    <div className="max-w-lg mx-auto mt-8 p-10">
    <h2 className="text-2xl font-bold mb-4">Venue Booking Form</h2>
    <form className="space-y-4">
        <div className="grid gap-y-2 gap-x-2">
            {/* Name */}
            <div className="col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" name="phone" id="phone" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Address */}
            <div className="col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" id="address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* City */}
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" id="city" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* State */}
            <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input type="text" name="state" id="state" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Country */}
            <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" name="country" id="country" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Zip */}
            <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip</label>
                <input type="text" name="zip" id="zip" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div className="col-span-2 my-10">
                <div className="flex justify-between space-x-4">
                    <DatePicker onChange={handleCheckInDateChange} placeholder='Check in' format={"ddd-MMM-YYYY"} popupClassName='text-xs w-72' className='text-xs font-bold text-black' />
                    <DatePicker onChange={handleCheckOutDateChange} placeholder='Check Out' format={"ddd-MMM-YYYY"} popupClassName='text-xs w-72' className='text-xs font-bold text-black' />
                </div>
            </div>



        </div>
        <div className="flex justify-end">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Book Now</button>
        </div>
    </form>
</div>

  )
}

export default BookNow