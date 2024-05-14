import React from 'react'
import useStore from '../Store';
import { useEffect } from 'react';
import Venues from '../VenueCard';


function FullListVenues() {
    const { venues, fetchVenues } = useStore();


    useEffect(() => {
        fetchVenues();
    }, [fetchVenues]);

  return (
<div className='body-content'>
  <div className='divStyle-content'>
    <h1 className='heading-venueManager'>All Venues</h1>
    <div className='p-10 flex flex-col gap-6'>
      {venues.map((venue) => <Venues venue={venue} key={venue.id}  />)}  
    </div>
  </div>
</div>
   
  )
}

export default FullListVenues