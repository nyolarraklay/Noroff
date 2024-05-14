import Search from '../SearchComponent'
import Destinations from '../Destinations'
import { useState } from 'react'



function Home() {

const [searchData, setSearchData] = useState('');


  return (
    <div>
      <Search onStateChange={setSearchData}/>
      <Destinations searchResults={searchData} />
     
    </div>
  )
}

export default Home