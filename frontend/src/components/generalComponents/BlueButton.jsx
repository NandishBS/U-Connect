import React from 'react'

function BlueButton({className}) {

    return (
        <button type="submit"
            className={`w-full py-3 bg-gradient-to-r from-violet-600 to-blue-500 rounded-md text-white hover:scale-105 transition duration-300 ${className}`} >
            Login
        </button>
    )
}

export default BlueButton
