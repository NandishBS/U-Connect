import axios from 'axios'
const base_url = process.env.REACT_APP_API_URL

class PostService {
    uploadPost = async ( data ) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key])
        }

        for(const key in formData){
            console.log(key , ':' , formData)
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
    }
}

const postService = new PostService;

export default postService