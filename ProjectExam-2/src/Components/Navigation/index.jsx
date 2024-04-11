import { Link } from 'react-router-dom'
import { FcHome, FcOrganization, FcCalendar, FcAbout, FcAssistant } from "react-icons/fc";
import { useState } from 'react';

function Navigation() {
    const [hideNav, setHideNav] = useState(false)
    const hideNavHandler = () => {
        setHideNav(!hideNav)
    }
  return (

    <div>
        <div className='flex justify-between items-center bg-gray-200 p-2'>
            <p className='text-2xl'>book with us</p>
            <button onClick={hideNavHandler} className='text-2xl cursor-pointer'>☰</button>
        </div>
        {hideNav && 
    <div className='bg-black p-5 fixed w-full h-full z-50'>
        <p className='bg-red-200 text-center cursor-pointer text-lg'><Link to='./sign-in'>Sign in</Link> / <Link to='./register'>Create Account</Link></p>
        <ul className='flex flex-col items-start mt-5 gap-5' onClick={hideNavHandler}>
            <li > <Link to='/'>
                <div className='flex items-center rounded-lg bg-white p-1'>
                    <FcHome className='text-xl'/>
                    <p className='text-xl'>  Home </p>
                </div>
              </Link></li>
            <li><Link to='/venues'>
            <div className='flex items-center rounded-lg bg-white p-1'>
                    <FcOrganization  className='text-xl'/>
                    <p className='text-xl'>  Venues </p>
                </div>
                </Link></li>
            <li><Link to='/bookings'>
            <div className='flex items-center rounded-lg bg-white p-1'>
                    <FcCalendar className='text-xl'/>
                    <p className='text-xl'>  My Bookings </p>
                </div></Link></li>
            <li><Link to='/about'>
            <div className='flex items-center rounded-lg bg-white p-1'>
                    <FcAbout className='text-xl'/>
                    <p className='text-xl'>  About Us </p>
                </div></Link></li>
            <li><Link to='/contacts'>
            <div className='flex items-center rounded-lg bg-white p-1'>
                    <FcAssistant className='text-xl'/>
                    <p className='text-xl'>  Contacts </p>
                </div></Link></li>
        </ul>
    </div>
        }
    </div>
  )
}

export default Navigation