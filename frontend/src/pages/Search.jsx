import React, { useEffect, useRef, useState } from 'react'
import searchService from '../app/services/search';
import UserCard from '../components/user/UserCard';
import { IoSearchSharp } from "react-icons/io5";
import './pages.css'

function Search() {
  const [usersList, setUsersList] = useState([]);
  const [searchBarValue , setSearchBarValue] = useState('');
  const displayUsersList = usersList.filter(user => (user.usn.toLowerCase().includes(searchBarValue.toLowerCase()) || user.username.toLowerCase().includes(searchBarValue.toLowerCase()) || user.fullName.toLowerCase().includes(searchBarValue.toLowerCase())))

  const fetchAllUsers = async ()=>{
    const response = await searchService.getAllUsers();
    setUsersList(response)
  }

  const changeEventHandler = (event)=>{
     setSearchBarValue(event.target.value)
  }

  useEffect(()=>{
    fetchAllUsers()
  },[])

  return (
    <>
      <div className='fixed top-2 left mx-auto bg-gray-900 max-w-md w-full p-1 flex justify-center place-items-center rounded-full'>
        <input type="text" className='bg-gray-900 w-full rounded-l-full px-4 py-2 outline-none' value = {searchBarValue} onChange={changeEventHandler} />
        <div className= 'py-2 px-2 rounded-r-full cursor-pointer'>
        <IoSearchSharp size={30}/>
        </div>
      </div>
      <div className='fixed top-20 bottom-20 border border-gray-700 rounded-md px-2 max-w-md w-full max-h-full overflow-scroll scrollbar-hide'>
        { displayUsersList.map(user => <UserCard user={user} avatarSize={10}/> )}
      </div>
    </>
  )
}

export default Search
