import axios, { AxiosResponse } from "axios";
import { Scooter } from "../redux/sccotersCatalogReducer";

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
    async getScooters(): Promise<Scooter[]> {
        let promise = new Promise<Scooter[]>((resolve, reject) => {
            setTimeout(() => resolve(
                [
                    {
                        name: 'Kugoo Kirin M1',
                        cost: '10000',
                        id: 1
                    },
                    {
                        name: 'Kugoo Kirin M2',
                        cost: '15000',
                        id: 2
                    },
                    {
                        name: 'Kugoo Kirin M3',
                        cost: '20000',
                        id: 3
                    },
                    {
                        name: 'Kugoo Kirin M4',
                        cost: '25000',
                        id: 4
                    },
                    {
                        name: 'Kugoo Kirin M1',
                        cost: '10000',
                        id: 5
                    },
                    {
                        name: 'Kugoo Kirin M2',
                        cost: '15000',
                        id: 6
                    },
                    {
                        name: 'Kugoo Kirin M3',
                        cost: '20000',
                        id: 7
                    },
                    {
                        name: 'Kugoo Kirin M4',
                        cost: '25000',
                        id: 8
                    },
                    {
                        name: 'Kugoo Kirin M1',
                        cost: '10000',
                        id: 9
                    },
                    {
                        name: 'Kugoo Kirin M2',
                        cost: '15000',
                        id: 10
                    },
                    {
                        name: 'Kugoo Kirin M3',
                        cost: '20000',
                        id: 11
                    },
                    {
                        name: 'Kugoo Kirin M4',
                        cost: '25000',
                        id: 12
                    },
                    {
                        name: 'Kugoo Kirin M1',
                        cost: '10000',
                        id: 13
                    },
                    {
                        name: 'Kugoo Kirin M2',
                        cost: '15000',
                        id: 14
                    },
                    {
                        name: 'Kugoo Kirin M3',
                        cost: '20000',
                        id: 15
                    },
                    {
                        name: 'Kugoo Kirin M4',
                        cost: '25000',
                        id: 16
                    },
                    {
                        name: 'Kugoo Kirin M1',
                        cost: '10000',
                        id: 17
                    },
                    {
                        name: 'Kugoo Kirin M2',
                        cost: '15000',
                        id: 18
                    },
                    {
                        name: 'Kugoo Kirin M3',
                        cost: '20000',
                        id: 19
                    },
                    {
                        name: 'Kugoo Kirin M4',
                        cost: '25000',
                        id: 20
                    },
                    {
                        name: 'Kugoo Kirin M1',
                        cost: '10000',
                        id: 21
                    },
                    {
                        name: 'Kugoo Kirin M2',
                        cost: '15000',
                        id: 22
                    },
                    {
                        name: 'Kugoo Kirin M3',
                        cost: '20000',
                        id: 23
                    },
                    {
                        name: 'Kugoo Kirin M4',
                        cost: '25000',
                        id: 24
                    },
                ]
            ), 3000)
        });
        let result = await promise;
        return result
    }
}