import axios from 'axios'

const tokenHandlerInterceptor = async (response) => {
    console.log("hi", response)
    
    if(response.staus === 401){
        const data = await axios.patch(process.env.REACT_APP_API_URL + "/user/refresh")
        console.log(data)
        return response
    }
    
    console.log("response is not 401")
    return response

    
    
    
    // if (error.status === 401) {
    //     const data = (await axios.patch(process.env.REACT_APP_API_URL + "/user/refresh")).data
    //     console.log("refresh is called")
    //     console.log(data)
    //     return axios(error.config)
    // }
    // else if (error.status === 403) {
    //     console.log(error);
    // }
    // else {

    // }
}

export { tokenHandlerInterceptor }