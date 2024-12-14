import React from 'react'
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";

function PostDownBar({post}) {
  return (
    <div className="py-4 flex justify-between place-items-center">
                <div className="flex gap-4">
                    <div className="flex gap-1">
                        <FaRegHeart className="size-7 hover:text-gray-500 cursor-pointer" />
                        <p className="text-lg font-semibold hover:text-gray-500 cursor-pointer">
                            {post.likes.length} likes
                        </p>
                    </div>

                    <div className="flex gap-1">
                        <FaRegComment className="size-7 hover:text-gray-500 cursor-pointer" />
                        <p className="text-lg font-semibold hover:text-gray-500 cursor-pointer">
                            {post.comments.length}
                        </p>
                    </div>
                </div>

                <div className="text-gray-300">
                    {new Date(post.createdAt).toDateString()}
                </div>
            </div>
    )
}

export default PostDownBar
