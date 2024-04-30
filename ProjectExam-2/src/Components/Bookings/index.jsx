import React, { useEffect, useState } from 'react'
import useStore from '../Store'
import styled from 'styled-components';
import Venues from '../VenueCard'
import { Link } from 'react-router-dom'

const Container = styled.div`
  background-image: url(${props => props.url});
  background-size: cover;
  position: relative;
  display: flex;
  align-items: flex-end;

  padding: 1rem;`;


function MyBookings() {
const apiKey = localStorage.getItem('apiKey')
const userName = localStorage.getItem('user')
const [user, setUser] = useState([])
const { allBookings, bookings } = useStore();
const [booked, setBooked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);  
const [showVenues, setShowVenues] = useState(true);
const [showBookings, setShowBookings] = useState(false);
const [showUsers, setShowUsers] = useState(false);

const handleShowVenues = () => {
  setShowVenues(true);
  setShowBookings(false);
  setShowUsers(false);
}

const handleShowBookings = () => {
  setShowVenues(false);
  setShowBookings(true);
  setShowUsers(false);
}

const handleShowUsers = () => {
  setShowVenues(false);
  setShowBookings(false);
  setShowUsers(true);
}


  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}/?_bookings=true`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            "X-Noroff-API-Key": apiKey,
          }
        });
        const json = await response.json();
        const user = json.data
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
    allBookings(userName);
    setBooked(true);
    setLoggedIn(true);
  }
  , []);


  const venues = user.bookings || []; 
  const bookedVenues = venues
    .filter(venue => venue) 
    .map(venue => venue.venue);



    
    const currentDate = new Date();

    const futureBookings = venues.filter(venue => {
      const checkInDate = new Date(venue.dateFrom);
      return checkInDate >= currentDate;
    });

    

 

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




  return (
    <div>
    <div className='relative p-8'>
      <Container url={url}> 
      <div className='bg-black flex'> 
  <div>
    { user.bio && <h3>{user.bio}</h3>}

 <div>
        <div className='flex-shrink-0 size,20 rounded-sm overflow-hidden' >
        <img className="h-full w-full object-cover" src={avatarUrl} alt={avatarAlt}/>
        </div>
       
      </div>
      </div>
        <div className="ml-5 ">
          <p className="text-white font-semibold">{user.name}</p>
          <p className="text-white text-sm">{user.email}</p>
          <button className="bg-white text-black p-1 rounded-lg mt-4 text-xs"><Link to={`/editProfile/${loggedIn}`}>Edit Profile</Link> </button>
        </div>
      </div>
    
      </Container>
     
    </div>
    {!user.venueManager  ? <div>
    <div>
      <h2>Upcomming Bookings</h2>

    </div>
    <div>
      <h2 className='text-center'>My Bookings</h2>
      <div className='p-10 flex flex-col gap-6'>
      {bookedVenues.map((venue) => <Venues venue={venue} key={venue.id} isBooked={booked} />)}  
      </div>
    </div>
    </div> : <div>
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
          <div>
            <Venues />
          </div>
        </div>}
        {showBookings && <div>
          <h2>All Bookings</h2>
          <div>
            <Venues />
          </div>
        </div>}
        {showUsers && <div>
          <h2>All Users</h2>
          <div>
            <Venues />
          </div>
        </div>}
      </div>
    </div>}
    
   



    </div>

    

  
  
  )
}

export default MyBookings