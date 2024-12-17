import axios from 'axios'
const base_url = process.env.REACT_APP_API_URL

class ProfileService{
    getProfile = async (usn)=>{
        try {
            const response = await axios.get(base_url+"/profile/get-profile/"+usn);
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

const profileService = new ProfileService;
export default profileService