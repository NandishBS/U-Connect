import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectCard from './post/ProjectCard.jsx'
import Post from './post/Post.jsx'
import { FaXmark } from 'react-icons/fa6'

function ProfileProjects() {
  const [openPost, setOpenPost] = useState(false)
  const posts = useSelector(state => state.profile.posts.filter(post => post.type === 'project'))
  return (
    <>
      {posts.map((post, index) => <div className='flex-col p-1 mx-auto'>
          <div onClick={(e)=>{e.stopPropagation();setOpenPost(true)}}>
          <ProjectCard post={post} />
          </div>

          {openPost && <div className='bg-black fixed inset-0 flex justify-center place-items-center ' onClick={(e)=>{
        e.stopPropagation();
        setOpenPost(false)}}>
            <FaXmark onClick={(event)=>{ event.stopPropagation(); setOpenPost(false)}} size={30} className='fixed top-2 right-2 z-20'/>
            <div onClick={(e)=>{e.stopPropagation()}} className='max-w-screen-md'>
            <Post post={post}/>
            </div>
          </div>}
      </div>)}
    </>
  )
}

export default ProfileProjects
