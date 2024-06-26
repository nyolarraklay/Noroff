import React from 'react'
import useStore from '../Store';
import { useEffect, useState } from 'react';
import Venue from '../VenueCard';
import { Link } from 'react-router-dom'
import Loader from '../Loader';


function ShortListVenue() {
    const { venues, fetchVenues } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    

    const popularDestinations = venues.slice(0, 6).sort((a, b) => b.rating - a.rating);


    useEffect(() => {
      const loadVenues = async () => {
          setIsLoading(true);
          await fetchVenues();
          setIsLoading(false);
      };

      loadVenues();
  }, [fetchVenues]);


  return (
    <div>
            {isLoading ? ( <div id="loader">
                <Loader/> </div>
            ) : (
    <div className='mx-auto mt-8'>
      <div className='grid xs:grid-rows-3 md:grid-rows-2 xs:grid-flow-col gap-4 grid-cols-1 xs:grid-cols-none'>
       {popularDestinations.map((venue) => <Venue venue={venue} key={venue.id}/>)} 
      </div>
      <div className="flex justify-center mt-6">
          <button ><Link to={'/venues'}> See all </Link> </button>
      </div>
    </div>
            )}
    </div>
   
  )
}

export default ShortListVenue