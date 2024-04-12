
function StarRating({venue}) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < venue.rating) {
            stars.push(<span key={i} className="text-yellow-500">★</span>);
        } else {
            stars.push(<span key={i} className="text-gray-400">★</span>);
        }
    }

  return (
    <div>
        {stars}
    </div>
   
  )
}

export default StarRating