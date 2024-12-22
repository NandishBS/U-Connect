import React from 'react'
import { IoChatboxEllipses, IoChatboxEllipsesOutline ,IoAddCircle , IoAddCircleOutline ,IoNotifications, IoNotificationsOutline, IoSearchOutline , IoSearchSharp ,IoHome, IoHomeOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import UConnectText from '../generalComponents/UConnectText';
import { FaUser, FaRegUser } from "react-icons/fa6";
import UConnectLogo from '../../assets/U-Connect_logo.png'

function NavBar() {
  const navLinkClassName = "bg-black h-full hover:bg-gray-800 rounded-md p-3 flex justify-center place-items-center md:h-14 w-full"
  const iconClassName = "aspect-square w-full h-full"
  const navRouter = [
    {
      path : '/',
      icon1: <IoHome className={iconClassName} />,
      icon2: <IoHomeOutline className={iconClassName}/>,
      text: "Home"
    },
    // {
    //   path : '/chat',
    //   icon1: <IoChatboxEllipses className={iconClassName}/>,
    //   icon2: <IoChatboxEllipsesOutline className={iconClassName}/>,
    //   text : "Chat"
    // },
    {
      path : '/create-post',
      icon1: <IoAddCircle className={iconClassName}/>,
      icon2: <IoAddCircleOutline className={iconClassName}/>,
      text : "Create"
    },
    {
      path : '/search',
      icon1: <IoSearchSharp className={iconClassName}/>,
      icon2: <IoSearchOutline className={iconClassName}/>,
      text: "Search"
    },
    // {
    //   path : '/notifications',
    //   icon1: <IoNotifications className={iconClassName}/>,
    //   icon2: <IoNotificationsOutline className={iconClassName}/>,
    //   text: "Notification"
    // },
    {
      path : '/profile',
      icon1 : <FaUser className={iconClassName}/>,
      icon2 : <FaRegUser className={iconClassName}/>,
      text : "Profile"
    }
  ]
  
  return (
    <div className='bg-black border border-gray-600 fixed left-0 bottom-0 w-screen h-16 md:top-0 md:h-screen md:w-fit lg:w-2/12 flex min-w-fit border-l-0
    md:flex-col justify-center place-items-center md:justify-start md:place-items-start md:gap-2 p-2 text-xl'>
          <div className='flex justify-center place-items-center md:w-full transition-all'>
            <div className='transition-all hidden lg:block my-2 mt-3 font-semibold'><UConnectText className={"text-4xl"}/></div>
            </div>
          
          {
            navRouter.map((navItem, index)=>{
              return(
                <NavLink key={index} to={navItem.path} className={navLinkClassName}>
                {
                  ({isActive})=>{
                    if(isActive){
                      return <div className='flex justify-start place-items-center lg:w-full gap-0 lg:gap-3 transition-all'>
                        <div className='h-10 transition-all'>{navItem.icon1}</div> <div className='font-bold transition-all hidden lg:block'>{navItem.text}</div>
                        </div>
                    }else{
                      return <div className='flex justify-start place-items-center lg:w-full gap-0 lg:gap-3'>
                        <div className='h-8 transition-all'>{navItem.icon2}</div>
                         <div className='transition-all hidden lg:block'>{navItem.text}</div>
                        </div>
                    }
                  }
                }
                </NavLink>
              )
            })
          }
    </div>
  )
}

export default NavBar