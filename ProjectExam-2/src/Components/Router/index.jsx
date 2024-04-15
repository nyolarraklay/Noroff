import {createBrowserRouter} from 'react-router-dom';
import App from '../../App';
import Home from '../Home'
import About from '../About'
import Contacts from '../Contact'
import Venues from '../Venues'
import MyBookings from '../Bookings'
import RouteNotFound from '../Error'
import VenueIndividual from '../Venue'

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
        
    ]
}])

export default router