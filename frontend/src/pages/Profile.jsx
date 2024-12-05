import React from 'react'
import { useParams , redirect} from 'react-router-dom'

function Profile() {
  const login = false;
  if(!login){
    redirect("/login")
  }
    const {usn} = useParams()

  return (
    <div>
      this is profile
      {usn}
    </div>
  )
}

export default Profile
