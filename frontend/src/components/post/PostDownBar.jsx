import React, { useEffect, useState } from 'react'
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../app/postSlice.js';
import Modal from '../generalComponents/Modal.jsx';
import UserCard from '../user/UserCard.jsx';
import OpenedPost from './OpenedPost.jsx';
import postService from '../../app/services/post.js';

function PostDownBar({post}) {
    const [liked, setLiked] = useState(false)
    const user = useSelector(state=> state.auth)
    const dispatch = useDispatch();
    const [openLikeList, setOpenLikeList] = useState(false)
    const [openPost , setOpenPost] = useState(false)

    const checkLike = ()=>{
        const check = post.likes.some(like => like.author.usn === user.usn);
        if(check){
            setLiked(true)
        }else{
            setLiked(false)
        }
    }

    const handleLike = ()=>{
        if(liked){
            postService.unlike(post._id)
            dispatch(unlikePost({post : post._id , usn : user.usn}))
          setLiked(false)
        }else{
            postService.like(post._id)
            dispatch(likePost({post: post._id, author: { usn: user.usn, username: user.username, avatar: user.avatar,},}))
            setLiked(true)

        }
    }

    useEffect(()=>{
        checkLike()
    },[])

  return (
    <div className="py-4 flex justify-between place-items-center">
                <div className="flex gap-4">
                    <div className="flex gap-1">
                        {liked ? <FaHeart className="size-7 text-red-500 cursor-pointer" onClick={handleLike} />  : <FaRegHeart className="size-7 hover:text-gray-500 cursor-pointer" onClick={handleLike} />}
                        <div onClick={()=>{setOpenLikeList(true)}}>
                        <p className="text-lg font-semibold hover:text-gray-500 cursor-pointer">
                            {post.likes.length} likes
                        </p>
                        </div>
                    </div>

                        {openLikeList && <Modal className="bg-opacity-30" close={()=>{setOpenLikeList(false)}}>
                            <div className='bg-gray-950 p-2 border border-gray-800 rounded-md w-96 overflow-y-auto'>
                                {post.likes.length === 0 ?
                                <div className='h-20 flex-col flex justify-center place-items-center'>
                                    <span className='font-bold text-2xl'>No likes for this Post</span>
                                </div> :
                                post.likes.map(like => <UserCard user={like.author} avatarSize={10} /> )                       
                            }                                              
                           </div>
                        </Modal>}
                    
                    <div onClick={()=>{setOpenPost(true)}} className="flex gap-1">
                        <FaRegComment className="size-7 hover:text-gray-500 cursor-pointer" />
                        <p className="text-lg font-semibold hover:text-gray-500 cursor-pointer">
                            {post.comments.length}
                        </p>
                    </div>
                </div>

                <div className="text-gray-300">
                    {new Date(post.createdAt).toDateString()}
                </div>

                
                {openPost && <OpenedPost post={post} close={()=>{setOpenPost(false)}} />}
            </div>
    )
}

export default PostDownBar
