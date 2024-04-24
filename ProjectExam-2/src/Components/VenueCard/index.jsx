import { Link } from "react-router-dom";
import StarRating from "../StarRating";



function Venue({ venue, isBooked }) {
  const media = venue.media[0];
  const location = venue.location;
 

  return (
    
    <div className="grid grid-cols-2 items-center  bg-white p-3">
      <div>
        <img src={media.url} alt={media.alt} className="object-cover rounded-md size-32" />
      </div>
      <div>
        <div className="flex justify-between flex-wrap">
             <h2 className="font-bold ">{venue.name}</h2>
             <h3>{venue.price}<span className="text-xs">/night</span></h3>
        </div>
        <div>
          <p>{location.city}, {location.country}</p>
          <div className="flex justify-between">
            <StarRating venue={venue} />
            <p>{venue.rating}</p>
          </div>
            <p>Max Guest: {venue.maxGuests}</p>
        </div>
        {!isBooked ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"><Link to={`/venue/${venue.id}`}>Book</Link></button> : <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"><Link to={`/book-now/${venue.id}/${isBooked}`}>Edit Booking</Link></button>}
  
     
      </div>
    </div>
    
  )
}

export default Venue