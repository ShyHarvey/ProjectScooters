import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { API_URL, authApi, LoginData, FetchRegistrationData } from '../http/axios'
import jwt_decode from "jwt-decode";
import axios, { AxiosError } from 'axios';
import { clearCartState, getCartAfterLogin, getCartFromServer } from './cartReducer';

type AuthState = {
    id: number | null,
    username: string | null,
    role: 'ROLE_USER' | 'ROLE_ADMIN' | null,
    isAuth: boolean,
    loading: boolean,
    axiosError: boolean,
}

type AccessTokenDecoded = {
    id: number,
    name: string,
    surname: string,
    email: string,
    role: 'ROLE_USER' | 'ROLE_ADMIN',
}


const initialState: AuthState = {
    id: null,
    username: null,
    role: null,
    isAuth: false,
    loading: false,
    axiosError: false,
}

export const fetchRegistration = createAsyncThunk<void, FormData>('auth/fetchRegistration',
    async (data, { dispatch }) => {
        const response = await authApi.registration(data)
        localStorage.setItem('token', response.data.accessToken)
        let userData = jwt_decode<AccessTokenDecoded>(response.data.accessToken)
        dispatch(setUsername(userData.name))
        dispatch(setRole(userData.role))
        dispatch(setUserId(userData.id))
        dispatch(setIsAuth(true))
    })

export const fetchLogin = createAsyncThunk<void, LoginData>('auth/fetchLogin',
    async (data, { dispatch }) => {
        try {
            const response = await authApi.login(data.email, data.password)
            localStorage.setItem('token', response.data.accessToken)
            let userData = jwt_decode<AccessTokenDecoded>(response.data.accessToken)
            dispatch(setUsername(userData.name))
            dispatch(setRole(userData.role))
            dispatch(setUserId(userData.id))
            dispatch(setIsAuth(true))
            dispatch(setError(false))
            dispatch(getCartAfterLogin())
        } catch (err: any | unknown) {
            let error: AxiosError = err
            dispatch(setError(error.isAxiosError))
        }
    })
export const fetchLogout = createAsyncThunk('auth/fetchLogout',
    async (data, { dispatch }) => {
        try {
            await authApi.logout()
            localStorage.removeItem('token')
            dispatch(setUsername(null))
            dispatch(setUsername(null))
            dispatch(setUserId(null))
            dispatch(setRole(null))
            dispatch(setIsAuth(false))
            dispatch(clearCartState())
        } catch (error) {
            console.log(error)
        }
    })
export const checkAuth = createAsyncThunk('auth/checkAuth',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get(`${API_URL}auth/getnewaccesstoken`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            let userData = jwt_decode<AccessTokenDecoded>(response.data.accessToken)
            dispatch(setUsername(userData.name))
            dispatch(setRole(userData.role))
            dispatch(setIsAuth(true))
            dispatch(getCartAfterLogin())
        } catch (error: any) {
            console.log(error?.response)
        }
    })

export const authSLice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUserId(state, action: PayloadAction<number | null>) {
            state.id = action.payload
        },
        setUsername(state, action: PayloadAction<string | null>) {
            state.username = action.payload
        },
        setRole(state, action: PayloadAction<'ROLE_USER' | 'ROLE_ADMIN' | null>) {
            state.role = action.payload
        },
        setError(state, action: PayloadAction<boolean>) {
            state.axiosError = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchLogin.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLogin.fulfilled, state => {
            state.loading = false
        })
        builder.addCase(fetchRegistration.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchRegistration.fulfilled, state => {
            state.loading = false
        })
        builder.addCase(fetchLogout.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLogout.fulfilled, state => {
            state.loading = false
        })
    }
})


export default authSLice.reducer
export const { setIsAuth, setUserId, setUsername, setRole, setError } = authSLice.actions