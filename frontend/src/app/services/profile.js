import axios from 'axios'
const base_url = process.env.REACT_APP_API_URL

class ProfileService{
    getProfile = async (usn)=>{
        try {
            const response = await axios.get(base_url+"/profile/get-profile/"+(usn ? usn : ""));
            console.log(response.data.data)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
    
    editProfile = async (profile_id , data) => {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key])
            }

            for (const key in data){
                console.log(key, data[key])
            }
            const response = await axios.post(base_url + `/profile/edit-profile/${profile_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
    }
}

const profileService = new ProfileService;
export default profileService