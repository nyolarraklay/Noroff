import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react';
import  useStore  from '../Store';
import { useNavigate } from 'react-router-dom';
import { MdClose, MdOutlineMenu } from "react-icons/md";


function NavLinks()  {
    const { isLoggedIn } = useStore()
    return (
        < >  
           <NavLink to='/'>
                <p>  Home </p>
            </NavLink>
            <NavLink to='/venues'>
                <p>  Venues </p>
            </NavLink>
          
                {isLoggedIn ? 
            <NavLink to='/bookings'>
                <p>  Bookings </p>
            </NavLink> : 
            <NavLink to='./log-in'>
                <p>  Bookings </p>
            </NavLink>}
           <NavLink to='/about'>
               <p>  About  </p>
                
            </NavLink>
            <NavLink to='/contacts'>
                <p>  Contacts </p>
            </NavLink>
            {!isLoggedIn ? <><NavLink to='/log-in'><p>Sign in</p></NavLink> <NavLink to='/sign-up'><p> Create Account </p></NavLink>  </>  : <button  onClick={logOutHandler}> Log Out </button>} 
        
        </ >
    )
}


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
<>
    <div className="md:col-span-2 md:grid  ">
        <nav className='flex justify-end' >
            <div className='hidden md:flex md:mx-2 md:space-x-2  '>
                <div className='flex items-center space-x-1 md:space-x-2' id='navMenu'>
                     <NavLinks />
                </div>   
            </div>
            <div className='md:hidden'>
                   <button onClick={hideNavHandler} aria-label={hideNav ? "Close Navigation" : "Open Navigation"}>{hideNav ? <MdClose/> :<MdOutlineMenu />}</button>
            </div>
           
         
        </nav>
       
     
    </div>
     {hideNav && (
            <div className='flex flex-col items-center basis-full p-2 space-y-3 md:hidden'>
                <div className='flex flex-col flex-wrap space-y-1 text-lg' id='navMenu'>
                     <NavLinks />
                </div>
              
                <div>
                     <Link to="/sign-up/venue-manager">
                    <p className='font-bold text-center text-sm'>Are you a venue manager?</p>
                    <p className='italic text-center'>Click here</p>
                </Link>
                </div>
               
            </div>
               
            
        )}
</>
  )
}

export default Navigation


       {/* {hideNav && 
            <div className='bg-black p-5 inset-0 top-16 h-screen z-50 absolute md:h-0 md:bg-none md:static md:flex'>
    
  
        {!isLoggedIn && <div className='text-white text-center p-6 m-6 text-sm font-bold' onClick={hideNavHandler}>
            <Link to="/sign-up/venue-manager">
            <p>Are you a venue manager?</p>
            <p>Click here</p>
            </Link>
        </div>}
       
            </div>
    
            } */}








