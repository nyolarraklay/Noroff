import useStore from "../Store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import StarRating from "../StarRating";
import { FaWifi, FaParking  } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";

function VenueIndividual() {
  const { fetchVenue, venue } = useStore();
  let { id } = useParams();

  useEffect(() => {
    fetchVenue(id);
  }, [fetchVenue, id]);

  if (!venue) {
    return <div>Loading...</div>; 
  }

  const { name, price, media, rating, maxGuests, description, meta, location } = venue;

  const images = media && media.length > 0 ? media.map((image, index) => (
    <img key={index} src={image.url} alt={image.alt} className="object-cover rounded-md size-32" />
  )) : null;

  const locationName = location && location.name ? location.name : null;

  // Check if Wi-Fi is available in the facilities
  const { wifi, parking, breakfast, pets } = meta || {};
  const facilitiesAvailable = {
    wifi: wifi !== undefined && wifi,
    parking: parking !== undefined && parking,
    breakfast: breakfast !== undefined && breakfast,
    pets: pets !== undefined && pets
  };


  return (
    <div>
      <div className="grid grid-cols-2 items-center bg-white p-3">
        <div>
          {images}
        </div>
        <div>
          <div className="flex justify-between flex-wrap">
            <h2 className="font-bold">{name}</h2>
            <h3>{price}<span className="text-xs">/night</span></h3>
          </div>
          <div>
            <p>Location: {locationName}</p>
            <div className="flex justify-between">
              <StarRating venue={venue} />
              <p>{rating}</p>
            </div>
            <p>Max Guests: {maxGuests}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold p-3">Description</h2>
        <p className="p-3">{description}</p>
        <h2 className="font-bold p-3">Facilities</h2>
        <div className="flex flex-wrap p-4">
          <div className="flex">
              <FaWifi /> {facilitiesAvailable.wifi ? <p>Wifi</p> : <p>No Wifi</p>}
          </div>
      <div className="flex">
         <IoFastFoodOutline /> {facilitiesAvailable.breakfast ? <p>Breakfast</p> : <p>No Breakfast</p>}
      </div>
       <div className="flex">
        <FaParking /> {facilitiesAvailable.parking ? <p>Parking</p> : <p>No Parking</p>}
       </div>
       <div className="flex">
          <MdOutlinePets /> {facilitiesAvailable.pets ? <p>Pets Allowed</p> : <p>No Pets Allowed</p>}
       </div>
        
      
        </div>
       
        

       
      </div>
      <div>
        <h2>Location</h2>
        {/* Render location details here if available */}
      </div>
    </div>
  );
}

export default VenueIndividual;