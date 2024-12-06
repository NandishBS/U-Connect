import React from 'react'

function Container({children, className = '', ...props}) {
  return (
    <div className= {`bg-gray-950 p-8 rounded-lg shadow-2xl ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Container
