import axios from 'axios'

const tokenHandlerInterceptor = async (error) => {
    if(error.status === 401){
        console.log("this is 401 error")
        try {
            const refreshresponse = await axios.patch(process.env.REACT_APP_API_URL + "/user/refreshaccesstoken")
            console.log("refresh response error",refreshresponse)
        } catch (err) {
            error.status = 403
            return error
        }
    }
    
    return error
}

export { tokenHandlerInterceptor }