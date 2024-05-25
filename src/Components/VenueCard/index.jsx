import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import Loader from "../Loader";



function Venues({ venue, isBooked, venueManager }) {


  if (!venue) {
    return <Loader />; 
  }

  const media = venue.media;
  const location = venue.location || {};
  const city = location.city || '';
  const country = location.country || '';
  const image = media && media.length > 0 ? (
    <img src={media[0].url} alt={media[0].alt} className="object-cover rounded-md size-full" />
  ) : null

  const truncatedCity = city.length > 10 ? city.substring(0, 10) + '...' : city;
  const truncatedCountry = country.length > 10 ? country.substring(0, 10) + '...' : country;

  return (
   
        <div className="bg-background-venue p-1 rounded-md border border-gray-200 shadow-md  grid xs:grid-cols-6 grid-rows-1 gap-4">
        <div className="col-span-1 xs:col-span-2">
          {image}
        </div>

        <div className=" xs:col-span-3">
          <div className=" space-y-5" >
          <p className="location-heading">{truncatedCity}, {truncatedCountry}</p>
            <div className="flex">
              <p className="bg-background-button px-2 text-white me-2">{venue.rating}</p>
              <StarRating venue={venue} />  
            </div>
            <p className="text-lg font-medium italic">Max Guest: {venue.maxGuests}</p>
            <div className="flex flex-col flex-wrap">
              <p className="font-bold text-lg font-sans">{venue.name.length > 20 ? venue.name.substring(0, 10) + '...' : venue.name} </p>
              <p>{venue.price}<span className="text-xs">/night</span></p>
            </div>
            {venueManager ? (<button><Link to={`/edit-venue/${venue.id}/${venueManager}`}>Edit</Link></button> ) : (<div className="flex justify-center ">
          {!isBooked ? <button><Link to={`/venue/${venue.id}`}>Book Now</Link></button> : <button className="text-xs"><Link to={`/book-edit/${venue.id}/${isBooked}`}>Edit Booking</Link></button>} </div>)
          }
          </div>
         
        </div>
    </div>
     
    
    
    
  )
}

export default Venues