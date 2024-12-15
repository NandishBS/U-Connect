import axios from 'axios'
const base_url = process.env.REACT_APP_API_URL

class PostService {
    uploadPost = async (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key])
            }

            for (const key in formData) {
                console.log(key, ':', formData)
            }

            try {
                const response = await axios.post(base_url + '/post/upload-post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    editPost = async (post_id, data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key])
            }

            for (const key in data){
                console.log(key, data[key])
            }
            const response = await axios.post(base_url + `/post/edit-post/${post_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    deletePost = async (post_id)=>{
        try {
            const response = await axios.post(base_url + `/post/delete-post/${post_id}`);
            return response
        } catch (error) {
            console.log(error)
        }
    }

    getPosts = async (page = 1 , limit = 20) =>{
        try {
            const response = await axios.get(base_url + `/post/get-posts?page=${page}&limit=${limit}`);
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    like = async (postId) =>{
        try {
            const response = await axios.post(base_url + `/post/like`,{postId});
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    unlike = async(postId) =>{
        try{
            const response = await axios.post(base_url+`/post/unlike`,{postId});
            console.log(response)
            return response;
        }catch (error){
            console.log(error)
        }
    }

    comment = async(postId, text) =>{
        try{
            const response = await axios.post(base_url+`/post/comment`,{postId , text});
            console.log(response)
            return response;
        }catch (error){
            console.log(error)
        }
    }

    replyComment = async(commentId, text) =>{
        console.log(commentId, text)
        try{
            const response = await axios.post(base_url+`/post/replycomment`,{commentId , text});
            console.log(response)
            return response;
        }catch (error){
            console.log(error)
        }
    }
}

const postService = new PostService;

export default postService