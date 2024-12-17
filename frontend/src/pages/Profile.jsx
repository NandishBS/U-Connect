import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import profileService from '../app/services/profile'
import UserProfile from "../assets/UserProfileEmpty.png";
import Modal from '../components/generalComponents/Modal.jsx';

function Profile() {
    const {usn} = useParams()
    const [profile, setProfile] = useState(null)
    const [showAvatar, setShowAvatar] = useState(false);

    const fetchProfile = async ()=>{
      try {
        const profile = await profileService.getProfile(usn);
        setProfile(profile);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        fetchProfile()
    },[])
 
    return (
    <div className='max-w-xs w-full place-self-start flex-col bg-blue-400'>
      {/* this is top profile box */}
      <div className='w-full h-fit flex p-2 bg-red-400'>
        {/* this is profile */}
        <div className={`aspect-square h-full mr-4`}>
                <img onClick={() => { setShowAvatar(true); }}
                    src={profile?.avatar ? profile?.avatar : UserProfile}
                    className="w-full h-full cursor-pointer rounded-full"/>

                {showAvatar && ( <Modal className="bg-opacity-60" close={() => {setShowAvatar(false);}}>
                    <div className="aspect-square w-80">
                        <img src={ profile?.avatar ? profile?.avatar : UserProfile }
                            className="w-full h-full cursor-pointer rounded-full"/>
                    </div>
                </Modal>)}
          </div>

          {/* this is left bar with some info */}
          <div>
            username and usn
          </div>
          <div>

          </div>
      </div>

    </div>
  )
}

export default Profile
