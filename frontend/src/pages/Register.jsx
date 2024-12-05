import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div>
      register page
      do you have account already ? <Link to="/login">login</Link>
    </div>
  )
}

export default Register
