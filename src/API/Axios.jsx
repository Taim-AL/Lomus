import axios from "axios";

// export const BASE_URL = 'http://192.168.137.1:8000/api';
export const BASE_URL = 'http://localhost:8000/api';
export default axios.create({
    baseURL:BASE_URL,
})

export const axiosPrivate =  axios.create({
    baseURL:BASE_URL,
    headers : {
        'Content-Type' : 'application/json',
    },
    withCredentials:true ,
})
