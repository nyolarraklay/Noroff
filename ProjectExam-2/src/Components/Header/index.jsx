import LogoBrand from "../Logo"
import Navigation from "../Navigation"

function Header() {
  return (
    <div className='bg-background-color-navigation md:grid md:grid-rows-1 md:grid-cols-3 flex flex-wrap items-center justify-between p-2 sticky top-0 z-[20] mx-auto w-full'>
      <LogoBrand />
      <Navigation />
    </div>
  )
}

export default Header