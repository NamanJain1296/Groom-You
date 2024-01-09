import axios from "axios";

let baseURL = "http://localhost:3005";

const publicReq = axios.create({ // for no token
    baseURL,
})

const privateReq = axios.create({ // for token
    baseURL,
})

const imageUpload = axios.create({ // for imgs 
    baseURL,
})

imageUpload.defaults.headers.common["Content-Type"] = "multipart/form-data";

imageUpload.interceptors.request.use(async (config)=>{ // Like middleware
    const token = localStorage.getItem("access_token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
})

privateReq.interceptors.request.use((config) =>{
    const token = localStorage.getItem("access_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    } // Bearer Keyword
    return config;
})

export { imageUpload, privateReq }
export default publicReq;