import React, { useState } from 'react'
import UserProfile from "../../assets/UserProfileEmpty.png";
import { Link } from 'react-router-dom';
import Modal from '../generalComponents/Modal.jsx';

function UserCard({user, className , vertical=false , avatarSize=12}) {
    const [showAvatar, setShowAvatar] = useState(false);

  return (
    <div className={`w-full flex justify-start place-items-center my-1 p-2 rounded-md ${className}`}>
            <div className={`aspect-square size-${avatarSize} mr-4`}>
                <img
                    onClick={() => {
                        setShowAvatar(true);
                    }}
                    src={user.avatar ? user.avatar : UserProfile}
                    className="w-full h-full cursor-pointer rounded-full"
                />
            </div>

            <div className="w-full h-full flex place-items-center hover:text-gray-400">
                <Link className={vertical && 'flex place-items-center gap-2'} to={`/profile/${user.usn}`}>
                        <div className="font-bold text-md">
                            {user.username}
                        </div>
                        <div className={vertical && 'text-md'}>
                            {user.usn}
                        </div>           
                </Link>
            </div>


            {showAvatar && (
                <Modal
                    className="bg-opacity-60"
                    close={() => {
                        setShowAvatar(false);
                    }}
                >
                    <div className="aspect-square w-80">
                        <img
                            src={
                                user.avatar
                                    ? user.avatar
                                    : UserProfile
                            }
                            className="w-full h-full cursor-pointer rounded-full"
                        />
                    </div>
                </Modal>
            )}

    </div>
  )
}

export default UserCard
