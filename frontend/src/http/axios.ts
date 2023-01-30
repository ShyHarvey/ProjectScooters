import axios, { AxiosResponse } from "axios";
import { Scooter, Comment } from "../redux/scootersCatalogReducer";

export const API_URL = process.env.REACT_APP_API_URL

export type LoginData = {
    email: string,
    password: string,
}

export type RegistrationData = {
    name: string,
    surname: string,
    yearOfBirth: number,
    email: string,
    country: string,
    username: string,
    password: string,
}

type AuthResponse = {
    accessToken: string;
}




const apiInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,

})

apiInstance.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})

apiInstance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    try {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            const response = await axios.get(`${API_URL}auth/refreshtoken`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return apiInstance.request(originalRequest);
        }
    } catch (error: any) {
        console.log(error);
    }
    throw error;
})



export const authApi = {
    async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return apiInstance.post<AuthResponse>('auth/login', { email, password })
    },
    async logout(): Promise<void> {
        return apiInstance.get('/auth/logout')
    },
    async registration(data: RegistrationData): Promise<AxiosResponse<AuthResponse>> {
        return apiInstance.post<AuthResponse>('auth/registration', { ...data })
    },

}



export const catalogApi = {
    async getScooters(page: number, query: string = ''): Promise<AxiosResponse<Scooter[]>> {
        return axios.get<Scooter[]>(`https://63be716bf5cfc0949b5795e9.mockapi.io/mock/scooters?search=${query}&page=${page}&limit=20`)
    },
    async getOneScooter(id: string): Promise<AxiosResponse<Scooter>> {
        return axios.get<Scooter>(`https://63be716bf5cfc0949b5795e9.mockapi.io/mock/scooters/${id}`)
    },
    async getComments(): Promise<AxiosResponse<Comment[]>> {
        return axios.get<Comment[]>(`https://63be716bf5cfc0949b5795e9.mockapi.io/mock/comments`)
    }
}