import React from 'react'
import { DatePicker } from 'antd';
import { useState, useEffect} from 'react';
import useStore from '../Store';
import { useParams } from "react-router-dom";

function BookNow() {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(null);
    const { fetchVenue, venue, bookNow, editBooking, deleteBooking } = useStore();


    let { venueId, isBooked } = useParams();

    const handleCheckInDateChange = (date, dateString) => {
        
        setCheckInDate(JSON.stringify(dateString));
      };
    
      const handleCheckOutDateChange = (date, dateString) => {
     
        setCheckOutDate(JSON.stringify(dateString));
      };

      const handleGuestsChange = (e) => {
        setGuests(JSON.parse(e.target.value));
       
      };

   



  useEffect(() => {
    fetchVenue(venueId);
  }, [fetchVenue, venueId]);

    if (!venue) {
        return <div>Loading...</div>; 
      }

    const { name, price, id, maxGuests } = venue;

    const venueID = id;

    const bookers = venue.bookings;

    let booker;

    if (venue && venue.bookings) {
        booker = venue.bookings.find(booking => booking.customer.name === localStorage.getItem('user'));
    }
    
    const bookerID = booker ? booker.id : null;


     function onSubmit() {

        if (isBooked) {
          editBooking(checkInDate, checkOutDate, guests, venueID, bookerID);
          
        } else {
        if (!checkInDate || !checkOutDate || !guests) {
            alert('Please fill in all fields.');
            return;
          }
            bookNow(checkInDate, checkOutDate, guests, venueID);
            
        }
      }

      function deleteBookings() {
        deleteBooking(bookerID);
      }

  return (
    <div className="max-w-lg mx-auto mt-8 p-10">
    <h2 className="text-2xl font-bold mb-4">Venue Booking Form</h2>
    <h3>{name}</h3>
    <p>{price}</p>
    <p>{maxGuests}</p>
    <form className="space-y-4" >
        <div className="grid gap-y-2 gap-x-2">
            {/* Guests */}
            <div className="col-span-1">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
                <input type="text" name="guests" id="guests" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleGuestsChange} />
            </div>
           
            <div className="col-span-2 my-10">
                <div className="flex justify-between space-x-4">
                    <DatePicker onChange={handleCheckInDateChange} placeholder='Check in' format={"DD-MMM-YYYY"} popupClassName='text-xs w-72' className='text-xs font-bold text-black' />
                    <DatePicker onChange={handleCheckOutDateChange} placeholder='Check Out' format={"DD-MMM-YYYY"} popupClassName='text-xs w-72' className='text-xs font-bold text-black' />
                </div>
            </div>
        </div>
   
    </form>   
      <div className="flex justify-end">
       
            <button  className="bg-black text-white px-4 py-2 rounded-md" onClick={onSubmit}>{isBooked ? 'Edit Booking' : 'Book Now'} </button>
            {isBooked && <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={deleteBookings}>Cancel Booking</button>}
        </div>
</div>

  )
}

export default BookNow