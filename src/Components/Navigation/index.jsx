import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react';
import  useStore  from '../Store';
import { useNavigate } from 'react-router-dom';
import { MdClose, MdOutlineMenu } from "react-icons/md";


function NavLinks({ hideNav})  {
    const { isLoggedIn, logOut } = useStore()
    const navigate = useNavigate()
    const logOutHandler = () => {
        logOut()
        navigate('/')
        hideNav()
    }

    return (
        < >  
           <NavLink to='/' onClick={hideNav}>
                <p>  Home </p>
            </NavLink>
            <NavLink to='/venues' onClick={hideNav}>
                <p>  Venues </p>
            </NavLink>
          
                {isLoggedIn ? 
            <NavLink to='/bookings' onClick={hideNav}>
                <p>  Profile </p>
            </NavLink> : 
            <NavLink to='./log-in' onClick={hideNav}>
                <p className='hidden'>  Profile </p>
            </NavLink>}
           <NavLink to='/about' onClick={hideNav}>
               <p>  About  </p>
                
            </NavLink>
            <NavLink to='/contacts' onClick={hideNav}>
                <p>  Contacts </p>
            </NavLink>
            {!isLoggedIn ? <><NavLink to='/log-in' onClick={hideNav}><p>Sign in</p></NavLink> <NavLink to='/sign-up' onClick={hideNav}><p> Create Account </p></NavLink>  </>  : <button  onClick={logOutHandler}> Log Out </button>} 
        
        </ >
    )
}


function Navigation() {
    
    const [hideNav, setHideNav] = useState(false)
    const hideNavHandler = () => {
        setHideNav(!hideNav)
    }
    


  return (
<>
    <div className="md:col-span-2 md:grid  ">
        <nav className='flex justify-end' >
            <div className='hidden md:flex md:mx-2 md:space-x-2  '>
                <div className='flex items-center space-x-1 md:space-x-2' id='navMenu'>
                     <NavLinks  />
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
                     <NavLinks hideNav={hideNavHandler} />
                </div>
              
                
                <div>
                     <Link to="/sign-up/venue-manager" onClick={hideNavHandler}>
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

