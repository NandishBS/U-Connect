import React from 'react'
import UserCard from './UserCard'

function FollowersList({users, placeholder}) {
  return (
    <>
        {users?.map(user => <UserCard user={user} avatarSize= "10"/>)}

        {(users?.length === 0) &&
            <div className= "w-full flex justify-center place-items-center h-20">
                {placeholder}
            </div>
        }
    </>
  )
}

export default FollowersList
