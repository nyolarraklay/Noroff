import useStore from "../Store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import StarRating from "../StarRating";

function VenueIndividual() {
  const { fetchVenue, venue } = useStore();
  let { id } = useParams();

  useEffect(() => {
    fetchVenue(id);
  }, [fetchVenue, id]);

  if (!venue) {
    return <div>Loading...</div>; // Show a loading indicator while venue is being fetched
  }

  const { name, price, media, rating, maxGuests } = venue;

  // Check if media is defined and not empty before mapping
  const images = media && media.length > 0 ? media.map((image, index) => (
    <img key={index} src={image.url} alt={image.alt} className="object-cover rounded-md size-32" />
  )) : null;

  return (
    <div>
      <div className="grid grid-cols-2 items-center  bg-white p-3">
        <div>
          {images}
        </div>
        <div>
          <div className="flex justify-between flex-wrap">
            <h2 className="font-bold">{name}</h2>
            <h3>{price}<span className="text-xs">/night</span></h3>
          </div>
          <div>
            <p>Location</p>
            <div className="flex justify-between">
              <StarRating venue={venue} />
              <p>{rating}</p>
            </div>
            <p>Max Guests: {maxGuests}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueIndividual;