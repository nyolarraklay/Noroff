import { Link } from "react-router-dom";
import StarRating from "../StarRating";



function Venues({ venue, isBooked, venueManager }) {


  if (!venue) {
    return <div>Loading...</div>; 
  }

  const media = venue.media;
  const location = venue.location;
  const image = media && media.length > 0 ? (
    <img src={media[0].url} alt={media[0].alt} className="object-cover rounded-md size-48 md:w-80 lg:size-full" />
  ) : null

  



  return (
    
    <div className="bg-white p-1 rounded-md border border-gray-200 shadow-md  grid lg:grid-cols-6 grid-rows-1 gap-4 ">
        <div className="col-span-2">
    {image}
        </div>
      
       
        <div className="grid grid-rows-3 col-span-2">
          <div className="row-span-2 space-y-2" >
             <h2 className="location-heading">{location.city}, {location.country}</h2>
          <div className="flex">
            <p className="bg-background-button px-2 text-white me-2">{venue.rating}</p>
            <StarRating venue={venue} />  
          </div>
          <p className="text-lg font-medium italic">Max Guest: {venue.maxGuests}</p>
          <div className="flex flex-col flex-wrap">
            <h2 className="font-bold text-xl font-sans">{venue.name}</h2>
            <p>{venue.price}<span className="text-xs">/night</span></p>
          </div>
          </div>
         
          {venueManager ? (<button><Link to={`/edit-venue/${venue.id}/${venueManager}`}>Edit</Link></button> ) : (<div className="content-end">
          {!isBooked ? <button ><Link to={`/venue/${venue.id}`}>Book Now</Link></button> : <button className="text-xs"><Link to={`/book-edit/${venue.id}/${isBooked}`}>Edit Booking</Link></button>} </div>)
          }
     
        </div>
    </div>
    
  )
}

export default Venues