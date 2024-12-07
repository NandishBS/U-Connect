import axios from "axios";

const withCredentials = (request)=>{
    request.withCredentials = true;
    return request;
}

export {withCredentials}