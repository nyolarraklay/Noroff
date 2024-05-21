import React from 'react'
import { DatePicker } from 'antd';
import { useState, useEffect} from 'react';
import useStore from '../Store';
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';

function BookNow() {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(null);
    const { fetchVenue, venue, bookNow, editBooking, deleteBooking } = useStore();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


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

      const venueWithBookings = venue && venue.bookings ? venue.bookings : [];

      const bookedDates = venueWithBookings.map((booking) => {

        const startDate = moment(booking.dateFrom).format("YYYY-MM-DD");
        const endDate = moment(booking.dateTo).format("YYYY-MM-DD");
        return {
          title: "Booked",
          start: startDate,
          end: endDate,
        };
      }) 
   

  useEffect(() => {
    const loadVenue = async () => {
      setIsLoading(true); 
      await fetchVenue(venueId);
      setIsLoading(false);
    }
    loadVenue();
        
  }, [fetchVenue, venueId]);

    if (!venue) {
        return <div>Loading...</div>; 
      }

    const { name, price, id, maxGuests } = venue;

    const venueID = id;

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
            navigate(`/`);
            
        }
      }
      function deleteBookings() {
        deleteBooking(bookerID);
        navigate(`/`);
      }


  return (

    <div className="flex flex-col bg-background-venue mx-auto text-white p-4 rounded-lg shadow-lg border border-white m-2 space-y-5">
    {isLoading ? (
        <div className="text-center">Loading...</div>
    ) : (
        <>

    <div className="flex items-center">
       <div className="flex flex-col bg-background-venue mx-auto p-4 rounded-lg shadow-lg  border border-white m-2 space-y-5">
    <h2 className="text-4xl font-bold mb-4 uppercase">Venue Booking Form</h2>
    <h3 className='text-2xl uppercase'>{name.length < 30 ? name : "No name"}</h3>
    <p>{price} / night</p>
    <p>Max Guests: {maxGuests}</p>
    <form className="space-y-4" >
        <div className="grid gap-y-2 gap-x-2">
            {/* Guests */}
            <div className="col-span-1">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
                <input type="text" name="guests" id="guests" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black" onChange={handleGuestsChange} />
            </div>
           
            <div className="col-span-2 my-10">
            <h2 className='text-md uppercase'>Please select your date of visit</h2>
                <div className="flex flex-col xs:flex-row justify-between">
                    <DatePicker onChange={handleCheckInDateChange} placeholder='Check In'  format={"DD-MMM-YYYY"} popupClassName='text-xs w-72' className='text-xs font-bold text-black'
                    disabledDate={(current) => {
                    const date = current.format("YYYY-MM-DD");
                    return current && current < new Date() || bookedDates.some((booking) => {
                    return date >= booking.start && date <= booking.end;
                    });
                    }}
                    />
              
                    <DatePicker onChange={handleCheckOutDateChange} placeholder='Check Out' format={"DD-MMM-YYYY"} popupClassName='text-xs w-72' className='text-xs font-bold text-black'
                    disabledDate={(current) => {
                    const date = current.format("YYYY-MM-DD");
                    return current && current < new Date() || bookedDates.some((booking) => {
                    return date >= booking.start && date <= booking.end;
                    }
                    );
                    }}
                    />
                </div>
            </div>
        </div>
   
    </form>   
      <div className="flex justify-end">
       
            <button  className="bg-black text-white px-4 py-2 rounded-md" onClick={onSubmit}>{isBooked ? 'Edit Booking' : 'Book Now'} </button>
            {isBooked && <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={deleteBookings}>Cancel Booking</button>}
        </div>
</div>
    </div>
    </>
    )}
    </div>
    

  )
}

export default BookNow