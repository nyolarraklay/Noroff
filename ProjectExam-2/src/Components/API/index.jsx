import React from 'react'
import useStore from '../Store';
import { useEffect } from 'react';
import Venue from '../VenueCard';


function ShortListVenue() {
    const { venues, fetchVenues } = useStore();
    

    const popularDestinations = venues.slice(0, 5).sort((a, b) => b.rating - a.rating);
    useEffect(() => {
        fetchVenues();
    }, [fetchVenues]);

  return (
    <div className='p-10 space-y-6'>
      {popularDestinations.map((venue) => <Venue venue={venue} key={venue.id}  />)}
       
    </div>
  )
}

export default ShortListVenue