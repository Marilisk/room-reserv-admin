import axios from "axios";

//export const API_URL = 'http://localhost:80'
export const API_URL = 'https://secondapi.spboptis.ru:3443'


//const API_SECRET = import.meta.env.VITE_API_SECRET

const instance = axios.create({  
    baseURL: API_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use( (config) => {
    config.headers['authorization'] = "45913410-5c7f-11ee-a132-d9aecc67d3a6"
    return config;
})


export default instance;