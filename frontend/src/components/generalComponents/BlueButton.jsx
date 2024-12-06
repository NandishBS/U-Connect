import React from 'react'

function BlueButton({className, children = '',...props}) {

    return (
        <button type="submit"
            className={`w-full py-3 bg-gradient-to-r from-violet-700 to-blue-500 rounded-md text-white hover:scale-105 transition duration-300 ${className}`} {...props} >
                {children}
        </button>
    )
}

export default BlueButton
