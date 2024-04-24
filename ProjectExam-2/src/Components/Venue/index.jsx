import useStore from "../Store";
import { useParams, Link } from "react-router-dom";
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

  const {address, city, zip, country, continent} = location || {};
  const locationNameParts = [];
if (address) locationNameParts.push(address);
if (city) locationNameParts.push(city);
if (zip) locationNameParts.push(zip);
if (country) locationNameParts.push(country);
if (continent) locationNameParts.push(continent);

const locationName = locationNameParts.join(", ");

  // Check if Wi-Fi is available in the facilities
  const { wifi, parking, breakfast, pets } = meta || {};
  const facilitiesAvailable = {
    wifi: wifi !== undefined && wifi,
    parking: parking !== undefined && parking,
    breakfast: breakfast !== undefined && breakfast,
    pets: pets !== undefined && pets
  };


  return (
    <div className="flex flex-col items-center bg-black text-white p-4 rounded-lg shadow-lg  border border-white m-2">
      <div className="grid grid-cols-2 items-center bg-white text-black p-3 gap-1">
        <div>
          {images}
        </div>
        <div>
          <div className="flex justify-between flex-wrap">
            <h2 className="font-bold">{name}</h2>
            <h3>{price}<span className="text-xs">/night</span></h3>
          </div>
          <div>
            <p>Location: {city}, {country}</p>
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
        <div className="flex flex-wrap p-4 justify-between gap-3">
          <div className="flex items-center space-x-2">
              <FaWifi /> {facilitiesAvailable.wifi ? <p>Wifi</p> : <p>No Wifi</p>}
          </div>
          <div className="flex items-center space-x-2">
         <IoFastFoodOutline /> {facilitiesAvailable.breakfast ? <p>Breakfast</p> : <p>No Breakfast</p>}
          </div>
          <div className="flex items-center space-x-2">
        <FaParking /> {facilitiesAvailable.parking ? <p>Parking</p> : <p>No Parking</p>}
          </div>
          <div className="flex items-center space-x-2">
          <MdOutlinePets /> {facilitiesAvailable.pets ? <p>Pets Allowed</p> : <p>No Pets Allowed</p>}
          </div>
        </div>
        <div className="text-left">
        <h2 className="font-bold p-3">Location</h2>
        <p className="p-3">  {locationName}</p>
        </div>
      </div>
      <button className="bg-blue-500 text-white rounded-md p-2 my-10"><Link to={`/book-now/${id}`}> Book Now</Link> </button>
    </div>
  );
}

export default VenueIndividual;