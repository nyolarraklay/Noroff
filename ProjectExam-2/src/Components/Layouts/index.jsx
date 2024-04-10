import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
             <Header />
        <Outlet />
        </div>
        <div>
           <Footer /> 
        </div>
       
        
    </div>
  )
}

export default Layout