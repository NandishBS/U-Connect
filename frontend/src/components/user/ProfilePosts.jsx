import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Post from './post/Post.jsx'
import Modal from '../generalComponents/Modal.jsx'
import { FaXmark } from "react-icons/fa6";

function ProfilePosts({posts}) {
  posts = posts.filter(post => post.type === 'post')
  const [openPost, setOpenPost] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openedPost, setOpenedPost] = useState(null)
  return (
    <>
      {posts.map((post, index) => <div className='aspect-square w-1/3 p-1 cursor-pointer'>
        <div onClick={(e)=>{e.stopPropagation();setOpenedPost(post);setOpenPost(true);
        }} className='w-full h-full'>
          <img key={index} src={post.content} className='w-full h-full object-cover' />
      {openPost && <div className='bg-black fixed inset-0 flex justify-center place-items-center ' onClick={(e)=>{
        e.stopPropagation();
        setOpenPost(false)}}>
            <FaXmark onClick={(event)=>{ event.stopPropagation(); setOpenPost(false)}} size={30} className='fixed top-2 right-2 z-20'/>
            <div key={index} onClick={(e)=>{e.stopPropagation()}} className='max-w-96'>
            <Post key={index} post={openedPost}/>
            </div>
          </div>}
      </div>
    </div>)}
    </>
  )
}

export default ProfilePosts
