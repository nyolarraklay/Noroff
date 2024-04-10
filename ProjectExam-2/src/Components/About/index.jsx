import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="max-w-md mx-auto mt-8 space-y-10 p-10">
          <h1 className="text-2xl font-bold mb-4 text-center">About Us</h1>
          <p className="text-lg">
           Course Assignment  for Noroff JS frameworks module. 
           To apply the knowledge of React to build an eCommerse site.
          </p>
           <button className='bg-green-500 p-2 rounded-md'>  <Link to="/" className="text-white hover:text-yellow-200">Go back to the homepage</Link></button>
    </div>
  )
}

export default About