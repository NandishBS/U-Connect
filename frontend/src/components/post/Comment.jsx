import React, { useRef, useState } from 'react'
import UserCard from '../user/UserCard'
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import Modal from '../generalComponents/Modal.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import { addReply } from '../../app/postSlice.js';
import postService from '../../app/services/post';

function Comment({comment , post}) {
    const [openReply, setOpenReply] = useState(false);
    const myCommentRef = useRef();
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleComment = () =>{
        setOpenReply(false)

        postService.replyComment(comment._id, myCommentRef.current.value)

        const newReply = {
            post_id : post._id,
            comment_id : comment._id,
            reply : {
                author: {
                    usn: user.usn,
                    username: user.username,
                    avatar: user.avatar,
                },
                text: myCommentRef.current.value,
            }
        }
        dispatch(addReply(newReply));
    }
    
  return (
    <div className='w-full'>
        <UserCard user={comment.author} className={"text-sm"} vertical={true} avatarSize={7}/>
            <div className='ml-8'>
                <div className='break-words max-w-80'>{comment.text}</div>
                <div onClick={()=>{setOpenReply(true)}} className='text-cyan-500 cursor-pointer'>reply</div>
            </div>
            <div className='ml-8 break-words'>
                {comment.replies.map(reply => 
                    <div className='flex justify-center place-items-center' >
                        <div className='w-4'>
                            <MdOutlineSubdirectoryArrowRight />
                        </div>
                        <div className='break-words overflow-hidden min-w-full'>
                        <UserCard user={reply.author} className={"text-sm"} vertical={true} avatarSize={7}/>
                        <div className='ml-8 w-full overflow-hidden max-w-72'><p className='line-wrap break-words'>{reply.text}</p></div>
                        </div> 
                    </div>
                )}
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
  )
}

export default Comment
