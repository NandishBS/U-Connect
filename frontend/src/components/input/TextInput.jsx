import React, {useId} from 'react'

function TextInput({className, label , ...props}) {
    const id = useId();
    return (
    <div className={`w-full`}>
        {label && <label className='p-3' htmlFor={id}>{label}</label>}
        <input id={id} className= {`w-full p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none transition-all autofill:bg-gray-800 ${className}`} autoComplete='off'  type="text" {...props}/>
    </div>
  )
}

export default TextInput
