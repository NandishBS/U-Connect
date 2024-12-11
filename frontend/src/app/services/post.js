import axios from 'axios'
const base_url = process.env.REACT_APP_API_URL

class PostService {
    uploadPost = async ( data ) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key])
        }
        const response = await axios.post(base_url + '/post/upload-post', formData);
        return response
    }
}

const postService = new PostService;

export default postService