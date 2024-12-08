import axios from 'axios'
import authentication from '../services/authentication'

const tokenHandlerInterceptor = async (error) => {
    if (error.config && error.config.__isRetryRequest) {
        return Promise.reject(error);
      }
    
      if (error.response && error.response.status === 403) {
        console.log("Logged out successfully");
        return Promise.reject(error);
      }
    
      if (error.response && error.response.status === 401) {
        try {
          error.config.__isRetryRequest = true;
          const response = await axios.patch(process.env.REACT_APP_API_URL+"/user/refreshaccesstoken");
          console.log("got new accesstoken", response)
          return axios(error.config);
        } catch (err) {
          console.log("Logged out from try-catch block");
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
}

export { tokenHandlerInterceptor }