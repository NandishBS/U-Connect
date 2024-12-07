import axios from 'axios'
const base_url = process.env.REACT_APP_API_URL

class AuthServices {
    verify = async ({ usn, username, password, role }) => {
        const response = await axios.post(base_url + '/user/verify', { usn, username, password, role });
        return response
    }
    register = async ({ usn, username, password, role, otp }) => {
        const response = await axios.post(base_url + '/user/register', { usn, username, password, role, otp });
        return response
    }
    login = async ({ usn, password }) => {
        const response = await axios.post(base_url + '/user/login', { usn, password });
        console.log(response.data)
        return response
    }
    logout = async () => {
        const response = await axios.post(base_url + '/user/logout');
        return response
    }
    forgetPassword = async ({ usn }) => {
        const response = await axios.post(base_url + '/user/forgetpassword', { usn });
        return response
    }
    resetPassword = async ({ usn, otp, password }) => {
        const response = await axios.patch(base_url + '/user/resetpassword', { usn, otp, newPassword : password },{});
        console.log(response)
        return response
    }
    getUserInfo = async () => {
        const response = await axios.get(base_url + '/user/getuserinfo')
        return response
    }
}

const authentication = new AuthServices()

export default authentication