import React from 'react'

function PostDescription({post}) {
  return (
    <div className="mb-3 w-full">
                <p className="line-clamp-2"> {post.description}</p>
                <div className="text-cyan-400">more</div>
    </div>
  )
}

export default PostDescription
