import { Link } from "react-router-dom";
import StarRating from "../StarRating";

function Venue({ venue }) {
  const media = venue.media[0];
  const location = venue.location;

  return (
    <Link to={`/venue/${venue.id}`}>
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
     
      </div>
    </div>
    </Link>
  )
}

export default Venue