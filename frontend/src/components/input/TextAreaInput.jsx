import React from 'react'
import "./TextAreaInput.css"

function TextAreaInput({className, ...props}) {
  return (
      <textarea className={`min-w-80 scrollbar-hide text-xl bg-gray-900 placeholder:text-gray-300 overflow-auto scrollbar-hide resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 p-3 rounded-md transition-all ${className} `} {...props}/>
  )
}

export default TextAreaInput
