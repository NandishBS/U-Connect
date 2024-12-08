import axios from 'axios'
import authentication from '../services/authentication'

const tokenHandlerInterceptor = async (error) => {
    if(error.status === 403){
        await authentication.logout()
    }
    else if(error.status === 401){
        try {
            const response = await axios.patch(process.env.REACT_APP_API_URL+"/user/refreshaccesstoken")
            const retryResponse = await axios(error.config)
            console.log("retry response", retryResponse)
        } catch (err) {
            console.log("logged out from try catch block")
        }
    }else{
        return error
    }
}

export { tokenHandlerInterceptor }