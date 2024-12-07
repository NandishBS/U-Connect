import axios from 'axios'

const tokenHandlerInterceptor = async (error) => {
    console.log("hi",error)
    try {
        if(error.status === 401){
            const data = (await axios.patch(process.env.REACT_APP_API_URL+"/user/refresh")).data
            console.log(data)
            return axios(error.config)
        }
        if(error.status === 403){
            console.log(error.response.data.message);
        }
    } catch (error) {
        //logout button effect
        //redirect to login
    }
}

export {tokenHandlerInterceptor}