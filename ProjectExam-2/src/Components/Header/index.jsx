import LogoBrand from "../Logo"
import Navigation from "../Navigation"

function Header() {
  return (
    <div className='bg-background-color-navigation lg:grid lg:grid-rows-1 lg:grid-cols-3 flex flex-wrap items-center justify-between p-2 sticky top-0 z-[20] mx-auto w-full'>
      <LogoBrand />
      <Navigation />
    </div>
  )
}

export default Header