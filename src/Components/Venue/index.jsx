import useStore from "../Store";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import { FaWifi, FaParking  } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import Calendar from "../Calendar";
import moment from "moment";
import Loader from "../Loader";


function VenueIndividual() {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchVenue, venue, isLoggedIn } = useStore();
  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const loadVenue = async () => {
      await fetchVenue(id);
      setIsLoading(false);
    };
    loadVenue();
  }, [fetchVenue, id]);

  if (!venue) {
    return <Loader/>; 
  }

  const { name, price, media, rating, maxGuests, description, meta, location, bookings } = venue;
  const image = media && media.length > 0 ? (
    <img src={media[0].url} alt={media[0].alt} className="object-cover rounded-md h-52 w-72" />
  ) : null

const images = media && media.length > 0 ? media.map((image, index) => (
  <img key={index} src={image.url} alt={image.alt} className="object-cover rounded-md h-52 w-72" />
)) : null;




const bookingDates =  bookings && bookings.length > 0 ? bookings.map((booking, index) => {
  const startDate = moment(booking.dateFrom).format("YYYY-MM-DD");
  const endDate = moment(booking.dateTo).format("YYYY-MM-DD");

  return {
    title: "Booked",
    start: startDate,
    end: endDate,
  };
}) : [];


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
    <div>
    {isLoading ? (
       <Loader />
    ) : (
      <>
       <div className="body-content">
    <div className="divStyle-content m-2 space-y-5">
      <div className="flex flex-col items-center xs:flex-row bg-background-color-navigation text-black">
        <div>
        {image}
        </div>
        <div className="px-0 py-5 xs:py-0 xs:px-5">
          <div className="flex justify-between flex-wrap">
            <h2 className="font-bold text-2xl">{name.length > 15 ? name.substring(0, 10) + '...'  : name}</h2>
            <h3 className="basis-full text-yellow-400">{price}<span className="text-xs">/night</span></h3>
          </div>
          <div>
            <p>Location: {city.length > 15 ? city.substring(0, 10) + '...'  : city}, {country.length > 15 ? country.substring(0, 10) + '...'  : country}</p>
            <div className="flex place-items-center">
              <p>Ratings: </p>
            <p className="bg-background-button px-2 py-1 text-white mx-2">{rating}</p>
              <StarRating venue={venue} />
              
            </div>
            <p>Max Guests: {maxGuests}</p>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="font-bold text-xl text-black uppercase">Description</h2>
        <p className="p-3">{description.length > 5
         ? description.substring(0, 10) + '...'  : description}</p>
        <h2 className="font-bold text-xl text-black uppercase">Facilities</h2>
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
        <h2 className="font-bold text-xl text-black uppercase">Location</h2>
        <p className="p-3">  {locationName.length > 15 ? locationName.substring(0, 10) + '...'  : locationName}</p>
        </div>
        <div>
          <h2 className="font-bold text-xl text-black uppercase">Images</h2>
          <div className="flex flex-wrap gap-2 p-4">
            {images}
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl text-black uppercase">Check Availability</h2>
          <Calendar isBooked={bookingDates} />
        </div>
   
      </div>
      <button className="bg-blue-500 text-white rounded-md p-2 my-10"> 
      {isLoggedIn ? <Link to={`/book-now/${id}`}> Book Now</Link> : <Link to={`/log-in`}> Book Now</Link>} </button>
      
      
    </div>
    </div>
      </>
    )}
    </div>
   
  );
}

export default VenueIndividual;