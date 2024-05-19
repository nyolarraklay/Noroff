import {createBrowserRouter} from 'react-router-dom';
import App from '../../App';
import Home from '../Home'
import About from '../About'
import Contacts from '../Contact'
import Venues from '../Venues'
import MyBookings from '../Bookings'
import RouteNotFound from '../Error'
import VenueIndividual from '../Venue'
import SearchResults from '../Search'
import BookNow from '../BookNow';
import LogIn from '../LogIn';
import SignUp from '../Signup';
import VenueManagerSignUp from '../VenueManagerSignUp';
import MyProfile from '../Profile';
import CreateVenueForm from '../CreateVenue';



const router = createBrowserRouter([{

    path: "/",
    element: <App />,
    errorElement: <RouteNotFound />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contacts", element: <Contacts /> },
        { path: "/venues", element: <Venues /> },
        { path: "/bookings", element: <MyBookings /> },
        { path: "/venue/:id", element: <VenueIndividual /> },
        { path: '/search-results', element: <SearchResults /> },
        { path: "/book-now/:venueId", element: <BookNow /> },
        { path: "/book-edit/:venueId/:isBooked", element: <BookNow /> },
        { path: "/log-in", element: <LogIn /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/sign-up/venue-manager", element: <VenueManagerSignUp /> },
        { path: "/editProfile/:loggedIn", element: <MyProfile /> },
        { path: "/addVenue/:loggedIn", element: <CreateVenueForm /> },
        { path: "/edit-venue/:venueId/:venueManager", element: <CreateVenueForm /> },
     

    ]
}])

export default router