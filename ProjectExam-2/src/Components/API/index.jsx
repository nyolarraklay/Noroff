import React from 'react'
import useStore from '../Store';
import { useEffect } from 'react';
import Venue from '../VenueCard';
import { Link } from 'react-router-dom'


function ShortListVenue() {
    const { venues, fetchVenues } = useStore();
    

    const popularDestinations = venues.slice(0, 5).sort((a, b) => b.rating - a.rating);
    useEffect(() => {
        fetchVenues();
    }, [fetchVenues]);

  return (
    <div className='body-content'>
      <div className='divStyle-content'>
          <div className='p-10 space-y-6'>
            {popularDestinations.map((venue) => <Venue venue={venue} key={venue.id}  />)}
          </div>
          <div className="flex justify-center">
          <button ><Link to={'/venues'}> See all </Link> </button>
        </div>
      </div>
    </div>
   
  )
}

export default ShortListVenue