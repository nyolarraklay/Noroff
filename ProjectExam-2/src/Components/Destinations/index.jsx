import ShortListVenue from "../API"


function Destinations() {
  return (
    <div className="bg-background-destinations py-10 px-5 lg:pt-14">
        <h2 className="font-bold text-center text-2xl md:text-4xl font-serif">Popular Destination</h2>
        <ShortListVenue />        
    </div>
  )
}

export default Destinations