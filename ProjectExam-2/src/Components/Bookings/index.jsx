import React, { useEffect, useState } from 'react'
import useStore from '../Store'
import styled from 'styled-components';
import Venues from '../VenueCard'
import { Link } from 'react-router-dom'
import moment from 'moment';


const Container = styled.div`
  background-image: url(${props => props.url});
  background-size: cover;
  position: relative;
  display: flex;
  align-items: flex-end;

  padding: 1rem;`;

  const fetchedVenues = new Set();




function MyBookings() {
const apiKey = localStorage.getItem('apiKey')
const userName = localStorage.getItem('user')
const [user, setUser] = useState([])
const {  searchProfiles, fetchVenue, createdVenues} = useStore();
const [booked, setBooked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);  
const [showVenues, setShowVenues] = useState(true);
const [showBookings, setShowBookings] = useState(false);
const [showUsers, setShowUsers] = useState(false);
const [searchResults, setSearchResults] = useState([]);
const [isVenueManager, setIsVenueManager] = useState(false);
const [venues, setVenues] = useState([]);


const handleShowVenues = () => {
  setShowVenues(true);
  setShowBookings(false);
  setShowUsers(false);
}


const handleShowBookings = () => {
  setShowVenues(false);
  setShowBookings(true);
  setShowUsers(false);

  const venueIds = venues.map((venue) => venue.id);

  const uniqueVenueIds = new Set(venueIds);

  uniqueVenueIds.forEach((id) => {
 if (!fetchedVenues.has(id)) {
    fetchVenue(id);
    fetchedVenues.add(id);
 }
  });

  }
  


const handleShowUsers = () => {
  setShowVenues(false);
  setShowBookings(false);
  setShowUsers(true);
}



useEffect(() => {
  async function fetchData() {
      try {
          // Fetch user data
          const userResponse = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}/?_bookings=true&_venues=true`, {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": apiKey,
              }
          });
          const userData = await userResponse.json();
          if (!userData.data) {
            throw new Error("User data is not available");
        }

          setUser(userData.data);

          setVenues(userData.data.venues);
          // Set states
          setBooked(true);
          setLoggedIn(true);
          setIsVenueManager(true);

       
      
      } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error (e.g., show error message to the user)
      }
  }

  fetchData();
}, [userName, apiKey]); 


const bookingsByVenue = createdVenues.map((venue) => {
  const bookings = venue.bookings;
  return (
    <div key={venue.id} className='p-2'>
      <h2 className='font-bold text-lg'> Venue: {venue.name}</h2>
      <ol className='list-decimal pl-5'>
        {bookings.map((booking) => {
          const checkInDate = moment(booking.dateFrom).format('DD-MMM-YY');
          const checkOutDate = moment(booking.dateTo).format('DD-MMM-YY');
          return (
            <li key={booking.id}>
              <p className='text-md'>Customer's Name: <span className='font-bold'> {booking.customer.name}</span></p>
              <p>Booking dates: {checkInDate} to {checkOutDate}</p> 
            </li>
          );
        })}
      </ol>
    </div>
  );
});





  
  const userBookings = user.bookings || [];
  const bookedVenues = userBookings
    .filter(venue => venue) 
    .map(venue => venue.venue);


    const currentDate = new Date();


const banner = user.banner
const { url:url, alt:alt } = banner || {};
const fullBanner = [];
if (url) fullBanner.push(url);
if (alt) fullBanner.push(alt);

const avatar = user.avatar

const { url: avatarUrl, alt: avatarAlt } = avatar || {};
const fullAvatar = [];
if (avatarUrl) fullAvatar.push(avatarUrl);
if (avatarAlt) fullAvatar.push(avatarAlt);

async function handleSearch(query) {
  const result = await searchProfiles(query);
  if (result) {
    console.log("Search result:", result);
    setSearchResults(result); 
  } else {
    console.log("No result");
  }
}
  


  return (
    <div>
    <div className='relative p-8'>
      <Container url={url}> 
         
      <div className='flex flex-col mx-auto space-y-8'> 
        <div className='text-white text-4xl sm:text-6xl italic text-center'>
          { user.bio && <h3>{user.bio}</h3>}
        </div>
        <div className='flex'>
           <div className='hidden xs:flex flex-shrink-0 size-32 sm:size-40 rounded-full overflow-hidden' >
        <img className="h-full w-full object-cover" src={avatarUrl} alt={avatarAlt}/>
        </div>
        <div className='relative'>
            <div className=" ml-2 bg-gray-500 rounded-xl relative opacity-50 w-44 sm:w-60 h-20">
         </div>
          <div className='absolute title top-2 left-5'>
          <p className="text-white font-semibold text-xl sm:text-3xl uppercase">{user.name}</p>
          <p className="text-white italic text-md sm:text-xl">{user.email}</p>
          <button className="text-xs mt-0 xs:mt-10"><Link to={`/editProfile/${loggedIn}`}>Edit Profile</Link> </button>
          </div> 
          
        </div>
      
        
        </div>
       
      </div>
    
      </Container>
     
    </div>
    {!user.venueManager  ? 

    <div>
      <h2 className='text-center text-2xl font-bold'>My Bookings</h2>
      <div className='p-10 flex flex-col gap-6'>
      {bookedVenues.map((venue) =>
       <Venues venue={venue} key={venue.id} isBooked={booked} />)}  
      </div>
    </div>
     : <div>
      <h2> You are a venue manager</h2>
      <div>
        <ul className='flex justify-evenly'>
          <li><button className='px-1 py-2 bg-white rounded-md' onClick={handleShowVenues}>All Venues</button></li>
          <li><button className='px-1 py-2 bg-white rounded-md' onClick={handleShowBookings}>All Bookings</button></li>
          <li><button className='px-1 py-2 bg-white rounded-md' onClick={handleShowUsers}>All Users</button></li>
        </ul>
      </div>
      <div> 
        {showVenues && <div>
          <h2>All Venues</h2>
          <button className="bg-white text-black p-1 rounded-lg mt-4 text-xs"><Link to={`/addVenue/${loggedIn}`}>Add Venue</Link> </button>
          <div>
            {venues.map((venue) => <Venues venue={venue} key={venue.id} venueManager={isVenueManager} />)}
          </div>
        </div>}
        {showBookings && <div className='mx-2 my-4' >
          <h1 className='font-bold text-2xl text-center'>Bookings by Venue</h1>
         {bookingsByVenue}
         
        </div>}
        {showUsers && <div>
          <h2>All Users</h2>
          <div className="flex items-center justify-between p-2 bg-white rounded-lg mt-2 w-full">
        <label htmlFor="searchInput" className="sr-only">Search for a profile...</label>
        <input 
          type="search" 
          id="searchInput"
          className="w-full ml-2 bg-transparent focus:outline-none text-black font-bold"
          placeholder="Search for a user..."
          onChange={(e) => handleSearch(e.target.value)} // Call handleSearch on input change
        />
      </div>

          <div>
          {searchResults.map((user, index) => (
                    <Container key={index}>
                      <div className='bg-black flex'>
                        <div>
                          <img className="h-20 w-20 object-cover rounded-full" src={user.avatar.url} alt={user.avatar.alt}/>
                        </div>
                        <div className="ml-5 ">
                          <p className="text-white font-semibold">{user.name}</p>
                          <p className="text-white text-sm">{user.email}</p>
                        </div>
                      </div>
                    </Container>
                  ))}
          </div>
        </div>}
      </div>
    </div>}
    
   



    </div>

    

  
  
  )
}

export default MyBookings