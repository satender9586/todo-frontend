
import axios, { InternalAxiosRequestConfig } from 'axios';
import { getToken } from "../utils/Helper";


let instence = axios.create({});
// const basePublicUrl = import.meta.env.VITE_DEVELOMENT_URL || "https://toda-backend-mign.onrender.com/api/v1/"
const basePublicUrl =  "https://toda-backend-mign.onrender.com/api/v1/"
instence.defaults.baseURL = basePublicUrl;
instence.defaults.timeout = 6000;


instence.interceptors.request.use(
  (reqest: InternalAxiosRequestConfig) => {
    const accessToken = getToken(); 
    if (accessToken) {    
      reqest.headers['authorization'] = `bearer ${accessToken}`;
    }

    return reqest; 
  },
  (error) => {
    return Promise.reject(error); 
  }
);

instence.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instence;
