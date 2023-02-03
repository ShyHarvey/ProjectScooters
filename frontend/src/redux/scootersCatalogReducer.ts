import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { catalogApi } from '../http/axios'


type Images = {
    link: string
}
export interface Scooter {
    name: string,
    cost: string,
    images: Images[],
    description?: string,
    rating: string,
    id: number
}
export type Comment = {
    name: string,
    avatar: string,
    body: string,
    rating: string,
}
type ScooterState = {
    scooters: Scooter[],
    comments: Comment[],
    loading: boolean,
    query: string,
    pageNumber: number,
    totalItems: number
}

let initialState: ScooterState = {
    scooters: [],
    comments: [],
    loading: true,
    query: '',
    pageNumber: 1,
    totalItems: 0
}

type GetScootersData = {
    page: number,
    query: string
}

export const getScooters = createAsyncThunk<void, GetScootersData>('scootersCatalog/getScooters',
    async (data, { dispatch }) => {
        const response = await catalogApi.getScooters(data.page, data.query)
        dispatch(setScootersBase(response.data))
    })

export const getOneScooterData = createAsyncThunk<void, string>('scootersCatalog/getOneScooterData',
    async (data, { dispatch }) => {
        const response = await catalogApi.getOneScooter(data)
        dispatch(setOneScooter(response.data))
    })
export const getComments = createAsyncThunk<void, void>('scootersCatalog/getComments',
    async (_, { dispatch }) => {
        const response = await catalogApi.getComments()
        dispatch(setComments(response.data))
    }
)

export const scootersCatalogReducer = createSlice({
    name: 'scootersCatalog',
    initialState,
    reducers: {
        setScootersBase(state, action: PayloadAction<{ amount: number, products: Scooter[] }>) {
            state.scooters = [...action.payload.products]
            state.totalItems = action.payload.amount
        },
        setOneScooter(state, action: PayloadAction<Scooter>) {
            state.scooters[0] = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.pageNumber = action.payload
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
        setComments(state, action: PayloadAction<Comment[]>) {
            state.comments = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getScooters.pending, state => {
            state.loading = true
        })
        builder.addCase(getScooters.fulfilled, state => {
            state.loading = false
        })
        builder.addCase(getOneScooterData.pending, state => {
            state.loading = true
        })
        builder.addCase(getOneScooterData.fulfilled, state => {
            state.loading = false
        })
        builder.addCase(getComments.pending, state => {
            state.loading = true
        })
        builder.addCase(getComments.fulfilled, state => {
            state.loading = false
        })
    }
})

export default scootersCatalogReducer.reducer
export const { setScootersBase, setPage, setQuery, setComments, setOneScooter } = scootersCatalogReducer.actions