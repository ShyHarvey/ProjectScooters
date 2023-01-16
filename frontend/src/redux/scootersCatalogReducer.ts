import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { catalogApi } from '../http/axios'

export type Scooter = {
    name: string,
    cost: string,
    image: string,
    description: string,
    rating: string,
    id: number
}
type ScooterState = {
    scooters: Scooter[],
    loading: boolean,
    query: string,
    pageNumber: number,
}

let initialState: ScooterState = {
    scooters: [],
    loading: true,
    query: '',
    pageNumber: 1
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
        dispatch(setScootersBase([response.data]))
    })

export const scootersCatalogReducer = createSlice({
    name: 'scootersCatalog',
    initialState,
    reducers: {
        setScootersBase(state, action: PayloadAction<Scooter[]>) {
            state.scooters = [...action.payload]
        },
        setPage(state, action: PayloadAction<number>) {
            state.pageNumber = action.payload
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
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
    }
})

export default scootersCatalogReducer.reducer
export const { setScootersBase, setPage, setQuery } = scootersCatalogReducer.actions