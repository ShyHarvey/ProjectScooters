import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { catalogApi } from '../http/axios'

export type Scooter = {
    name: string,
    cost: string,
    id: number
}
type ScooterState = {
    scooters: Scooter[],
    loading: boolean
}

let initialState: ScooterState = {
    scooters: [],
    loading: true
}

export const getScooters = createAsyncThunk<void>('scootersCatalog/getScooters',
    async (data, { dispatch }) => {
        const response = await catalogApi.getScooters()
        dispatch(setScootersBase(response))
    })

export const scootersCatalogReducer = createSlice({
    name: 'scootersCatalog',
    initialState,
    reducers: {
        setScootersBase(state, action: PayloadAction<Scooter[]>) {
            state.scooters = [...action.payload]
        },
    },
    extraReducers: builder => {
        builder.addCase(getScooters.pending, state => {
            state.loading = true
        })
        builder.addCase(getScooters.fulfilled, state => {
            state.loading = false
        })
    }
})

export default scootersCatalogReducer.reducer
export const { setScootersBase } = scootersCatalogReducer.actions