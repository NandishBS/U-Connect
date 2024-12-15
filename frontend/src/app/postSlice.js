import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts : [],
    page : 1,
}
const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        setPosts : (state, action)=>{
           state.posts = [...state.posts , ...action.payload]
        },
        incrPage : (state, action)=>{
            state.page = state.page + 1
        },
        likePost : (state, action)=>{
            state.posts = state.posts.map((post)=>{
                if(post._id === action.payload.post){
                    post.likes.push(action.payload)
                }
                return post;
            })
        },
        addComment : (state, action)=>{
            state.posts = state.posts.map((post)=>{
                if(post._id === action.payload.post){
                    post.comments = [action.payload, ...post.comments]
                }
                return post
            })
        },
        addReply: (state, action)=>{
            state.posts = state.posts.map((post)=>{
                if(post._id === action.payload.post_id){
                    post.comments = post.comments.map(comment => {
                        if(comment._id === action.payload.comment_id){
                            comment.replies = [action.payload.reply, ...comment.replies]
                        }
                        return comment
                    })
                }
                return post
            })
        },
        unlikePost : (state, action)=>{
            state.posts = state.posts.map((post)=>{
                if(post._id === action.payload.post){
                    post.likes = post.likes.filter((like)=> like.author.usn !== action.payload.usn)
                    return post
                }
                return post
            })
        }
    }
})

export const {setPosts, incrPage , likePost, unlikePost, addComment, addReply} = postSlice.actions;
export default postSlice.reducer;