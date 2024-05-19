import { useLocation } from "react-router-dom";
import Venue from "../VenueCard";

function SearchResults() {
    const location = useLocation();
    const { results } = location.state || {};

    if (!results || results.length === 0 || results === undefined) {
        return (
            <div className="text-center">
                <h2 className="font-bold">No results found</h2>
            </div>
        );
    }


    return (
      <div>
        <h2 className="font-bold text-center">Search Results</h2>
        <div className="p-3">
          {results.map((venue) => (
           <Venue venue={venue} key={venue.id} />
          ))}
        </div>
      </div>
    );
  }
  
  export default SearchResults;