import axios from "axios";

export const API_URL = 'http://localhost:5000/'

const apiInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

apiInstance.interceptors.request.use((config:any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

apiInstance.interceptors.response.use((config)=> {
    return config;
}, async (error) => {
    try {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry){
            originalRequest._isRetry = true;
            const response = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return apiInstance.request(originalRequest);
        }
    } catch (error: any) {
        console.log(error);
    }
    throw error;
})

export type LoginData = {
    username: string;
    password: string;
}

export type RegistrationData = {
    name: string;
    surname: string;
    yearOfBirth: string;
    email: string;
    country: string;
    username: string;
    password: string;
}


export const authApi = {
    login(data: LoginData) {
        return apiInstance.post('/login', { data })
            .then(response => response.data)
    },
    logout() {
        return apiInstance.delete('/logout')
    },
    registration(data: RegistrationData) {
        return apiInstance.post('/register', { data })
            .then(response => response.data)
    },

}