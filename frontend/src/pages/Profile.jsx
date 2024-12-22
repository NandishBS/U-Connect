import React, { useEffect, useState } from 'react'
import { Navigate, useParams} from 'react-router-dom'
import profileService from '../app/services/profile'
import UserProfile from "../assets/UserProfileEmpty.png";
import Modal from '../components/generalComponents/Modal.jsx';
import { IoMdSettings } from "react-icons/io";
import { FaGithub , FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile, setPosts, setProfile } from '../app/profileSlice';
import ProfilePosts from '../components/user/ProfilePosts';
import ProfileProjects from '../components/user/ProfileProjects';
import { MdEdit } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import authentication from '../app/services/authentication';
import EditProfile from '../components/user/EditProfile';
import FollowersList from '../components/user/FollowersList';
import "./pages.css"
import { FaXmark } from "react-icons/fa6";

function Profile() {
    const {usn} = useParams()
    const user = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile.profile)
    const posts = useSelector(state => state.profile.posts)
    const [showAvatar, setShowAvatar] = useState(false);
    const [loading , setLoading] = useState(true)
    const dispatch = useDispatch()
    const [togglePosts, setTogglePosts] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [friendStatus, setFreindStatus] = useState(null);
    const [disable, setDisable] = useState(false)

    const buttonClass = "px-3 py-1 bg-blue-600 disabled:bg-gray-600 mx-2 rounded-md"

    const logout = async ()=>{
        try {
            const response = await authentication.logout()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const acceptInvitation = async () =>{
        setDisable(true)
        await profileService.acceptInvitation(profile._id);
        await fetchFriendDetails()
        setDisable(false)
    }
    const deleteInvitation = async()=>{
        setDisable(true)
        await profileService.deleteInvitation(profile._id);
        await fetchFriendDetails()
        setDisable(false)
    }
    const connect = async()=>{
        setDisable(true)
        await profileService.sendInvitation(profile._id);
        await fetchFriendDetails()
        setDisable(false)
    }
    const disconnect = async()=>{
        setDisable(true)
        await profileService.disconnect(profile._id);
        await fetchFriendDetails()
        setDisable(false)
    }

    
    const fetchProfile = async ()=>{
        try {
            setLoading(true)
            const profile = await profileService.getProfile(usn);
            dispatch(setProfile(profile))
            dispatch(setPosts(profile.posts))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        fetchProfile()
        setShowFollowers(false)
        return () =>{
            dispatch(clearProfile())
        }
    },[usn])
    
    const fetchFriendDetails = async ()=>{
        const response = await profileService.checkFriendStatus(profile._id);
        setFreindStatus(response);
    }

    useEffect(()=>{
        if(profile){
         fetchFriendDetails();
        }
    },[profile])

    return (
    <div className='max-w-xl lg:max-w-2xl w-full place-self-start flex-col'>
      {!usn && <Navigate to={`/profile/${user.usn}`}/>}
      {!loading && 
      <div className='w-full h-fit'>
        <div className='w-full h-fit flex mt-5 border-b-2 border-b-gray-700 pb-4'>
        <div className='w-2/5 flex justify-center place-items-center'>
        <div className={`aspect-square w-40 px-1`}>
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
        </div>

          <div className='w-3/5'>
            <div className='flex justify-between place-items-center break-words gap-2'>
              <p className='text-xl px-2 max-w-full line-clamp-1 break-words overflow-clip'>{profile?.username}</p>
              <div onClick={()=>{setShowOptions(true)}} className='h-full px-2'>
                <IoMdSettings className='hover:animate-spin cursor-pointer' size={30}/>
              </div>
            </div>


            <div className='px-2 max-w-full'>
                <div className='flex gap-10 w-full justify-start place-items-center'>
              <p className='overflow-clip break-words line-clamp-1'>{profile?.usn}</p>
              {user.usn !== profile?.usn && <div className='flex place-items-center'>
                <div>
                    {friendStatus === 'disconnected' && 
                    <button disabled={disable} className={buttonClass} onClick={connect}>Connect</button>}
                    
                    {friendStatus === 'connected' && 
                    <button disabled={disable} className={buttonClass} onClick={disconnect}>Disconnect</button>}

                    {friendStatus === 'sent' && <div>
                        <button className='py-1 px-3 border border-gray-600 rounded-md'>Pending</button>
                        <button disabled={disable} className={buttonClass} onClick={deleteInvitation}>Withdraw</button>
                    </div> }
                    {friendStatus === 'recieved' && <div>
                        <button disabled={disable} className={buttonClass} onClick={acceptInvitation} >Accept</button> 
                        <button disabled={disable} className={buttonClass} onClick={deleteInvitation} >Reject</button> 
                    </div> }
                </div>
            </div>}
                </div>
              <p className='overflow-clip break-words line-clamp-1'> {profile?.fullName} </p>
              <p className='overflow-clip break-words line-clamp-1'> {profile?.email} </p>
              <p className='overflow-clip break-words my-2 line-clamp-3'>{profile?.bio}</p>
            </div>

            

            <div className='flex gap-2'>
              <div className='text-md bg-gray-950 rounded-md py-1 px-2'> <span>{profile?.posts.length} </span> posts </div>

              <div onClick={()=>{setShowFollowers(true)}} className='text-md bg-gray-950 cursor-pointer rounded-md py-1 px-2'> <span>{profile?.connections.length}</span> connections </div>
              
              <button href={profile?.github}  target={profile?.github && '_blank'} onClick={()=>{ if(profile?.github){window.open(profile?.github)}}} >
              <div className='text-md  rounded-md py-1 px-2 cursor-pointer flex place-items-center gap-2'> <FaGithub size={30}/></div>
              </button>

              <button href={profile?.linkedin}  target={profile?.linkedin && '_blank'} onClick={()=>{ if(profile?.linkedin){window.open(profile?.linkedin)}}} >
              <div className='text-md  rounded-md py-1 px-2 cursor-pointer flex place-items-center gap-2'> <FaLinkedin size={30} /></div>
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-evenly place-items-center text-xl'>
           <div onClick={()=>{setTogglePosts(true)}} className={`flex border-t-2 border-transparent cursor-pointer transition-all place-items-center justify-center pb-3 px-5 ${togglePosts && 'border-white font-bold'} `}>posts</div>
           <div onClick={()=>{setTogglePosts(false)}} className={`flex border-t-2 border-transparent cursor-pointer transition-all place-items-center justify-center pb-3 px-5 ${!togglePosts && 'border-white font-bold'} `}>projects</div>
        </div>
        <div className='flex flex-wrap w-full'>
            {togglePosts && <ProfilePosts posts = {posts} />}
            {!togglePosts && <ProfileProjects/>}
        </div>
   
        {showOptions && (
                <Modal
                    className="bg-opacity-30"
                    close={() => {
                        setShowOptions(false);
                    }}
                >
                    <div className="w-80 rounded-lg border border-gray-500 flex-col p-2 bg-gray-900">
                        {user.usn === profile?.usn && <div onClick={() => { setShowOptions(false); setShowEdit(true); }}
                            className="w-full flex gap-2 justify-center place-items-center cursor-pointer border-b border-b-gray-700 rounded-md mb-2 hover:bg-gray-800 h-10" >
                            <MdEdit className="size-5" />
                            <span className="font-semibold">Edit</span>
                        </div>}

                        <div onClick={()=>{logout()}} className="w-full flex gap-2 justify-center place-items-center cursor-pointer border-b border-b-gray-700 rounded-md mb-2 hover:bg-gray-800 h-10">
                            <IoLogOut className='size-6'/>
                            <span className='font-semibold'>Logout</span>
                        </div>

                        {/* <div
                            onClick={() => {
                                setShowOptions(false);
                                setShowDelete(true);
                            }}
                            className="w-full flex gap-2 justify-center place-items-center cursor-pointer border-b border-b-gray-700 rounded-md mb-2 hover:bg-gray-800 text-red-500 h-10"
                        >
                            <FaTrash />
                            <span className="font-semibold">Delete</span>
                        </div> */}
                    </div>
                </Modal>
            )}
        {showEdit && (
                <Modal className="bg-opacity-30" close={() => {  setShowEdit(false); }} >
                    <EditProfile profile={profile} />
                </Modal>
            )}

            {showFollowers && <div className="fixed inset-1 scrollbar-hide bg-black flex justify-center bg-opacity-30 overflow-auto" onClick={(e)=>{e.stopPropagation() ;setShowFollowers(false)}}>
            <FaXmark className="fixed top-6 right-6 z-10 size-10 cursor-pointer" 
            onClick={(e)=>{e.stopPropagation() ;setShowFollowers(false)}}/>
            
            <div onClick={(e)=>{e.stopPropagation()}} className='rounded-md h-fit w-96'>
                <div className='bg-gray-950 border border-gray-800 rounded-md my-5 flex-col p-2'>
                    <div className='w-full flex justify-center place-items-center'>
                        <span className='font-bold text-xl'>Connections:</span>
                    </div>
                    <div>
                        <FollowersList type={"connections"} users={profile?.connections} placeholder={"No Connections Yet !"}/>
                    </div>
                </div>


                {profile?.usn === user.usn && <div className='bg-gray-950 border border-gray-800 rounded-md my-5 flex-col p-2'>
                    <div className='w-full flex justify-center place-items-center'>
                        <span className='font-bold text-xl'>Invitations:</span>
                    </div>
                    <div>
                        <FollowersList type={"invitations"} users={profile?.invitations} placeholder={"You Have No Invitations !"}/>
                    </div>
                </div>}
                
                {profile?.usn === user.usn && <div className='bg-gray-950 border border-gray-800 rounded-md my-5 flex-col p-2'>
                    <div className='w-full flex justify-center place-items-center'>
                        <span className='font-bold text-xl'>Invitations sent:</span>
                    </div>
                    <div>
                        <FollowersList type={"invitationSent"} users={profile?.invitationSent} placeholder={"No Invitations are sent !"}/>
                    </div>
                </div>}
            </div>
            </div>}
      </div>}
    </div>
  )
}

export default Profile
