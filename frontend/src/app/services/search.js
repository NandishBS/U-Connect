import axios from 'axios'
const base_url = process.env.REACT_APP_API_URL

class SearchService{
    getAllUsers = async () =>{
        try {
            const response = await axios.get(base_url + '/user/get-all-users')
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
}

const searchService = new SearchService();
export default searchService;