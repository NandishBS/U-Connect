import React from 'react'
import DefaultCoverImage from '../../../assets/defaultCoverImage.jpg'
import { FaGithub , FaLink } from "react-icons/fa";

function ProjectCard({post}) {
  return (
    <div className="w-full border p-2 border-gray-700 rounded-xl flex justify-between place-items-center">
            <div className='aspect-square h-32 rounded-lg overflow-hidden'>
                <img src={post.coverImage ? post.coverImage : DefaultCoverImage } className='w-full h-full object-cover' />
            </div>
            <div className='w-72 h-32 flex-col'>
                
                <div className='w-full text-lg h-1/2 flex justify-center border border-transparent p-2 border-b-gray-700 place-items-end break-words overflow-clip'>{post.title ? post.title.toUpperCase() : "Empty Title"}</div>
                
                <div className='w-full h-1/2 flex justify-center place-items-center gap-3'>
              
              <button href={post.sourceCode}  target={post.sourceCode && '_blank'} onClick={()=>{ if(post.sourceCode){window.open(post.sourceCode)}}} ><div className='p-2 cursor-pointer border flex justify-center place-items-center gap-2 border-gray-400 hover:text-gray-500 rounded-full'><FaGithub size={25}/> Source Code</div></button>
                
                <button href={post.projectLink} onClick={()=>{ if(post.projectLink){window.open(post.projectLink)}}} target={post.projectLink && '_blank'}><div className='p-2 cursor-pointer border flex justify-center place-items-center gap-2 border-gray-400  hover:text-gray-500 rounded-full'><FaLink size={20}/> Project Link</div></button>
                
                </div>
            </div>
    </div>
  )
}

export default ProjectCard
