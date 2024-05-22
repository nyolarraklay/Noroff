import React from 'react'

function Loader() {
  return (
    <div data-testid="loader" className='loader'>
        <div className='gear'></div>
        <div className='gear'></div>
        <div className='gear'></div>
    </div>
  )
}

export default Loader