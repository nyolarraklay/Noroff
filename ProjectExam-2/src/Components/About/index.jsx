import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="body-content">
          <h1 className="heading-venueManager">About Us</h1>
          <p className="text-lg">
           Project Exam for Noroff Front-End Development Course year 2. 
           To apply the knowledge of React and frameworkss to build a Booking site.
          </p>
           <button>  <Link to="/" className="text-white hover:text-yellow-200">Go back to the homepage</Link></button>
    </div>
  )
}

export default About