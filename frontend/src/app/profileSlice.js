import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts : [],
    profile : null
}
const profileSlice = createSlice({
    name : "profile",
    initialState,
    reducers : {
        clearProfile : (state, action)=>{
            state.posts = []
            state.profile = null
        },
        setProfile : (state, action)=>{
            state.profile = action.payload
        },
        setPosts : (state, action)=>{
           state.posts = [...action.payload]
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
        },
    }
})

export const {setPosts, setProfile, clearProfile, incrPage , likePost, unlikePost, addComment, addReply} = profileSlice.actions;
export default profileSlice.reducer;