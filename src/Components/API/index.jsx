import React from 'react'
import useStore from '../Store';
import { useEffect, useState } from 'react';
import Venue from '../VenueCard';
import { Link } from 'react-router-dom'
import Loader from '../Loader';


function ShortListVenue() {
    const { venues, fetchVenues } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    

    const popularDestinations = venues.slice(0, 5).sort((a, b) => b.rating - a.rating);


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
    <div className='body-content'>
      <div className='divStyle-content space-y-5'>
       
            {popularDestinations.map((venue) => <Venue venue={venue} key={venue.id}  />)}
         
          <div className="flex justify-center">
          <button ><Link to={'/venues'}> See all </Link> </button>
        </div>
      </div>
    </div>
            )}
    </div>
   
  )
}

export default ShortListVenue