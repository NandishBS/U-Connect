import React from 'react'

function RedButton({className, children = '',...props}) {

    return (
        <button type="submit"
            className={`w-full py-3 bg-gradient-to-r from-red-700 to-orange-600 rounded-md text-white hover:scale-105 transition duration-300 ${className}`} {...props} >
                {children}
        </button>
    )
}

export default RedButton
