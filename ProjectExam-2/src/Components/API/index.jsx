import React from 'react'
import useStore from '../Store';
import { useEffect } from 'react';
import Venues from '../Venues';


function ApiLists() {
    const { venues, fetchVenues } = useStore();

    const popularDestinations = venues.slice(0, 5).sort((a, b) => b.rating - a.rating);
console.log(popularDestinations);
    useEffect(() => {
        fetchVenues();
    }, [fetchVenues]);

  return (
    <div className='p-10 space-y-6'>
      {popularDestinations.map((venue) => <Venues venue={venue} key={venue.id}  />)}
       
    </div>
  )
}

export default ApiLists