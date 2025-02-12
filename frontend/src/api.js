import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const apiURL = "https://6cd635e1-92c5-468c-a855-aef35962b522-dev.e1-eu-north-azure.choreoapis.dev/website/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL, 
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api