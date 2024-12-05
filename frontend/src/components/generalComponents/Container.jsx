import React from 'react'

function Container({className = '', ...props}) {
  return (
    <div className= {` bg-gray-900 p-8 rounded-lg shadow-2xl flex-col place-items-center justify-center text-white ${className}`} {...props}>    
    </div>
  )
}

export default Container
