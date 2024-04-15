import ShortListVenue from "../API"
import { Link } from 'react-router-dom'

function Destinations() {
  return (
    <div>
        <div className="flex justify-between p-4">
            <h2 className="font-bold">Popular Destination</h2>
            <p><Link to={'/venues'}> See all</Link> </p>
        </div>
        <ShortListVenue />
    </div>
  )
}

export default Destinations