import React from 'react'


function Body({children}) {
  return (
    <div className='bg-black w-screen h-screen flex justify-center items-center overflow-hidden'>
     {children}
    </div>
  )
}

export default Body
