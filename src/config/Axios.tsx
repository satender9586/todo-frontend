
import axios, { InternalAxiosRequestConfig } from 'axios';
import { getToken } from "../utils/Helper";


let instence = axios.create({});
const basePublicUrl = import.meta.env.VITE_DEVELOMENT_URL
instence.defaults.baseURL = basePublicUrl;
instence.defaults.timeout = 1000;


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
