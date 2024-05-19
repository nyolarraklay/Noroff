import React, { useEffect, useState } from 'react';
import useStore from '../Store';
import Venues from '../VenueCard';

function FullListVenues() {
    const { venues, fetchVenues } = useStore();
    const [filteredVenues, setFilteredVenues] = useState(null);
    const [filter, setFilter] = useState({ rating: 'all', price: { min: 0, max: 1000 } });
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    }

    useEffect(() => {
        const loadVenues = async () => {
            setIsLoading(true);
            await fetchVenues();
            setIsLoading(false);
        };

        loadVenues();
    }, [fetchVenues]);

    useEffect(() => {
        if (hasInteracted) {
            filterVenues();
            
        }
    }, [filter, hasInteracted, venues]);

    const filterVenues = () => {
        if (!venues) return;
        const filtered = venues.filter(venue => {
            const byRating = filter.rating === 'all' || venue.rating === parseInt(filter.rating);
            const byPrice = venue.price >= filter.price.min && venue.price <= filter.price.max;
            return byRating && byPrice;
        });
        setFilteredVenues(filtered);
    };

    const handleRatingChange = rating => {
        setFilter({ ...filter, rating });
        setHasInteracted(true);
    };

    const handlePriceChange = priceRange => {
        setFilter({ ...filter, price: priceRange });
        setHasInteracted(true);
    };

    const priceRadio = (id, min, max) => (
        <div className="flex items-center mb-2">
            <input
                type="radio"
                id={id}
                name="price"
                value={`${min} - ${max}`}
                checked={filter.price.min === min && filter.price.max === max}
                onChange={() => handlePriceChange({ min, max })}
            />
            <label className="cursor-pointer" htmlFor={id}>{id} </label>
        </div>
    );

    return (
        <div>
        {isLoading ? (
            <div className="text-center">Loading...</div>
        ) : (

        <div className='body-content'>
            <div className='divStyle-content'>
                <h1 className='heading-venueManager'>All Venues</h1>
                <div>
                  <button onClick={handleShowFilter}> {!showFilter ? "Show Filter" : "Hide filter"}</button>
                </div>
                
                <div className= {showFilter ? 'flex border p-4 flex-col' : 'hidden'}>
                     <div className="mt-10 border border-black p-4">
                     <h2 className="text-xl font-semibold mb-2">Ratings</h2>
                     <div className='flex justify-between'>
                          {[5, 4, 3, 2, 1, 0].map((rating, index) => (
                        <div key={index} className="flex items-center mb-2">
                             <input
                                type="radio"
                                id={`${rating}-stars`}
                                name="rating"
                                value={rating === 0 ? '0' : rating.toString()}
                                checked={filter.rating === (rating === 0 ? '0' : rating.toString())}
                                onChange={() => handleRatingChange(rating === 0 ? '0' : rating.toString())}
                            />
                            <label className="cursor-pointer" htmlFor={`${rating}-stars`}>{rating === 0 ? 'No stars' : `${rating} stars`}</label>
                           
                        </div>
                    ))}
                     </div>
                
                </div>
                <div className=" border border-black p-4">
                <h2 className="text-xl font-semibold mb-2">Price</h2>
                    <div className="flex flex-row justify-between">
                        {priceRadio('high', 1000, 500)}
                        {priceRadio('medium', 250, 499)}
                        {priceRadio('low', 0, 249)}
                    </div>
                </div>
                </div>
             

                {(filteredVenues && filteredVenues.length > 0 && hasInteracted) ? (
                    <div className='p-10 flex flex-col gap-6'>
                        {filteredVenues.map(venue => (
                            <Venues venue={venue} key={venue.id} />
                        ))}
                    </div>
                ) : (
                    (hasInteracted && (!filteredVenues || filteredVenues.length === 0)) ? (
                        <div className='p-10'>
                            <p>No results found.</p>
                        </div>
                    ) : (
                        <div className='p-10 flex flex-col gap-6'>
                            {venues.map(venue => (
                                <Venues venue={venue} key={venue.id} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
        )}
        </div>
    );
}

export default FullListVenues;