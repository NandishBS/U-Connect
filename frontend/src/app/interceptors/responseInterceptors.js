import axios from 'axios'

const tokenHandlerInterceptor = async (error) => {
    if(error.status === 401){
        console.log("this is 401 error")
        try {
            const refreshresponse = await axios.patch(process.env.REACT_APP_API_URL + "/user/refreshaccesstoken")
            return(refreshresponse)
        } catch (err) {
            return err
        }
    }
    return error
}

export { tokenHandlerInterceptor }