import React, { useRef, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import PostContent from './PostContent.jsx'
import Comment from './Comment.jsx'
import UserCard from '../UserCard.jsx'
import { FaRegSquarePlus, FaSquarePlus } from "react-icons/fa6";
import Modal from '../../generalComponents/Modal.jsx'
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../../app/profileSlice.js'
import "./style.css"
import postService from '../../../app/services/post.js'

function OpenedPost({post , close}) {
    const [openReply, setOpenReply] = useState(false);
    const myCommentRef = useRef();
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleComment = () =>{
        setOpenReply(false)

        postService.comment(post._id, myCommentRef.current.value)

        const newComment = {
            post: post._id,
            author: {
                usn: user.usn,
                username: user.username,
                avatar: user.avatar,
            },
            text: myCommentRef.current.value,
            replies: [],
        }
        dispatch(addComment(newComment));
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center place-items-center overflow-auto' 
    onClick={close}>
            <div className="z-10 bg-black flex justify-center place-items-center flex-wrap md:flex-nowrap" onClick={(e)=> e.stopPropagation()} >

                    <div className='w-96 aspect-[10/16]'>
                    <PostContent post={post}/>
                    </div>


                    <div className='w-96 min-h-full aspect-[10/16] border border-gray-700 rounded-xl flex-col justify-center place-items-center overflow-y-auto scrollbar-hide relative'>
                    <FaXmark className="absolute top-2 right-2 z-10 size-8 cursor-pointer"  
                     onClick={() => {close();}} />

                        <UserCard user={post.author} avatarSize={10} vertical={true}/>

                        <div className='w-full p-2 border-b-2 border-b-gray-600'>
                        {post.description}
                        </div>
             
                        <div className='flex bg-black border-b-2 border-gray-700 w-full justify-center place-items-center p-2'>
                        <FaRegSquarePlus className='cursor-pointer' onClick={()=>{setOpenReply(true)}} size={30}/>
                        </div>

                        {post.comments.map(comment => <Comment comment={comment} post={post} /> )}

                        {openReply && <Modal className={"opacity-90"} close={()=>{setOpenReply(false)}}>
                        <div className='bg-black rounded-md  z-30 flex gap-3'>
                        <input className='w-96 h-12 bg-black rounded-md p-3' autoFocus placeholder='drop your comment' type="text" ref={myCommentRef} />
                        <button onClick={handleComment}>
                            <IoIosSend size={40}/>
                        </button>
                        </div>
                        </Modal>}                  
                    </div>
            </div>
    </div>
  )
}

export default OpenedPost
