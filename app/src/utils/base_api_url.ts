import axios from "axios";


const apiUrl = 'http://localhost:5000/api'
const baseApiUrl = axios.create({
     baseURL:'http://localhost:5000/api',
     withCredentials : true
})
const api = axios.create({
     baseURL:apiUrl,
     withCredentials:true
})
const authApi = axios.create({
     baseURL:apiUrl.concat('/auth'),
     withCredentials:true
})
const profileApi = axios.create({
     baseURL:apiUrl.concat('/profile'),
     withCredentials:true
}) 
const articleApi = axios.create({
     baseURL:apiUrl.concat('/article'),
     withCredentials:true
})

export {
     api,
     authApi,
     articleApi,
     profileApi
}
export default baseApiUrl