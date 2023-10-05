import axios from "axios";

export const API_URL = 'http://localhost:80'

const API_SECRET = import.meta.env.VITE_API_SECRET

const instance = axios.create({  
    baseURL: API_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use( (config) => {
    config.headers['authorization'] = `${API_SECRET}`
    return config;
})


export default instance;