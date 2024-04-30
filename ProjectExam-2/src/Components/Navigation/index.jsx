import { Link } from 'react-router-dom'
import { FcHome, FcOrganization, FcCalendar, FcAbout, FcAssistant } from "react-icons/fc";
import { useState } from 'react';
import  useStore  from '../Store';
import { useNavigate } from 'react-router-dom';


function Navigation() {
    const { isLoggedIn, logOut } = useStore()
    const [hideNav, setHideNav] = useState(false)
    const hideNavHandler = () => {
        setHideNav(!hideNav)
    }
    const navigate = useNavigate()


    const logOutHandler = () => {
        logOut()
        navigate('/')
        hideNavHandler()
    }

  return (

    <div>
        <div className='flex justify-between items-center bg-gray-200 p-2'>
            <p className='text-2xl'>BOOKIPEDIA.com</p>
            <button onClick={hideNavHandler} className='text-2xl cursor-pointer'>☰</button>
        </div>
        {hideNav && 
    <div className='bg-black p-5 fixed w-full h-full z-50'>
       {!isLoggedIn ?  <Link to='./log-in'> <p className='bg-red-200 text-center cursor-pointer text-lg' onClick={hideNavHandler}> Sign in / Create Account </p> </Link> : <p className='bg-red-200 text-center cursor-pointer text-lg' onClick={logOutHandler}> Log Out </p>} 
        <ul className='flex flex-col items-start mt-5 gap-5 p-6' onClick={hideNavHandler}>
            <li className='w-full '> <Link to='/'>
                <div className='flex items-center rounded-lg bg-white p-1 justify-center'>
                    <FcHome className='text-xl'/>
                    <p className='text-xl'>  Home </p>
                </div>
              </Link></li>
            <li className='w-full '><Link to='/venues'>
            <div className='flex items-center rounded-lg bg-white p-1 justify-center'>
                    <FcOrganization  className='text-xl'/>
                    <p className='text-xl'>  Venues </p>
                </div>
                </Link></li>
            <li className='w-full '>
                {isLoggedIn ? <Link to='/bookings'>
            <div className='flex items-center rounded-lg bg-white p-1 justify-center'>
                    <FcCalendar className='text-xl'/>
                    <p className='text-xl'>  My Bookings </p>
                </div></Link> : <Link to='./log-in'>
            <div className='flex items-center rounded-lg bg-white p-1 justify-center'>
                    <FcCalendar className='text-xl'/>
                    <p className='text-xl'>  My Bookings </p>
                </div></Link>}</li>
            <li className='w-full '><Link to='/about'>
            <div className='flex items-center rounded-lg bg-white p-1 justify-center'>
                    <FcAbout className='text-xl'/>
                    <p className='text-xl'>  About Us </p>
                </div></Link></li>
            <li className='w-full '><Link to='/contacts'>
            <div className='flex items-center rounded-lg bg-white p-1 justify-center'>
                    <FcAssistant className='text-xl'/>
                    <p className='text-xl'>  Contacts </p>
                </div></Link></li>
        </ul>
        <div className='text-white text-center p-6 m-6 text-sm font-bold' onClick={hideNavHandler}>
            <Link to="/sign-up/venue-manager">
            <p>Are you a venue manager?</p>
            <p>Click here</p>
            </Link>
        </div>
       
    </div>
    
        }
    </div>
  )
}

export default Navigation











