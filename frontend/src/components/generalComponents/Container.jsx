import React from 'react'

function Container({className = '', ...props}) {
  return (
    <div className= {`max-w-sm bg-gray-900 p-8 rounded-lg shadow-2xl w-full flex justify-center text-white ${className}`} {...props}>    
    </div>
  )
}

export default Container
