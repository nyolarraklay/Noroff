import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="body-content p-5">
      <div className='divStyle-content space-y-5 '>
          <h1 className=" bg-background-home  bg-cover bg-center h-64 flex items-center justify-center text-6xl text-black">About Us</h1>
          <p className="text-lg text-black">
          Welcome to <span className='font-bold'>BOOKIPEDIA</span>, your premier destination for seamless and hassle-free booking experiences. Whether you are planning a vacation, business trip, or a special event, we are here to help you find the best accommodations and venues that suit your needs and preferences.
        </p>
        <p className="text-lg text-black">
          At <span className='font-bold'>BOOKIPEDIA</span>, we believe in providing our customers with an easy-to-use platform that offers a wide range of options, from luxurious hotels and cozy bed and breakfasts to modern conference centers and charming wedding venues. Our extensive database ensures that you have access to the best deals and the most accurate information, making your booking process as smooth as possible.
        </p>
        <p className="text-lg text-black">
          Our team of dedicated professionals is committed to delivering excellent customer service. We are always available to assist you with any inquiries, provide personalized recommendations, and ensure that your booking experience is nothing short of exceptional. We value your trust and strive to exceed your expectations every step of the way.
        </p>
        <p className="text-lg text-black">
          Thank you for choosing <span className='font-bold'>BOOKIPEDIA</span> as your trusted partner for all your booking needs. We look forward to helping you create unforgettable memories and successful events.
        </p>

      </div>
    </div>
  )
}

export default About