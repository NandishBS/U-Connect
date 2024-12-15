import React, { useState } from 'react'
import OpenedPost from './OpenedPost.jsx'

function PostDescription({post}) {
  const [openPost, setOpenPost] = useState(false)

  return (
    <div className="mb-3 w-full break-words">
                <p className="line-clamp-2"> {post.description}</p>
                <div className="text-cyan-400 cursor-pointer" onClick={()=>{setOpenPost(true)}}> 
                <p>more</p></div>
                {openPost && <OpenedPost post={post} close={()=>{setOpenPost(false)}} />}
    </div>
  )
}

export default PostDescription
