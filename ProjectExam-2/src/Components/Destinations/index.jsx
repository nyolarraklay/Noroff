import ShortListVenue from "../API"
import Venue from "../VenueCard"


function Destinations({searchResults}) {

  return (
        searchResults.length >= 1 ? <div className="bg-background-destinations py-10 px-5 lg:pt-14">
          <h2 className="font-bold text-center text-2xl md:text-4xl font-serif">Search Results</h2>
          <div className='body-content'>
            {searchResults.map((user) => (
              <Venue key={user.id} venue={user}/>
            ))}
          </div>
          </div> :

          <div className="bg-background-destinations py-10 px-5 lg:pt-14">
           <h2 className="font-bold text-center text-2xl md:text-4xl font-serif">Popular Destination</h2>
            <ShortListVenue />        
          </div>
  )
}

export default Destinations