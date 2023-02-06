import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from '../http/axios'


type AdminData = {
    loading: boolean
}

let initialState: AdminData = {
    loading: false
}

export const fetchAddNewItem = createAsyncThunk<void, any>('admin/fetchAddNewItem',
    async (data) => {
        await adminApi.addNewItem(data)
    })

export const appReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAddNewItem.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchAddNewItem.fulfilled, state => {
            state.loading = false
        })
    }
})

export default appReducer.reducer
export const { setLoading } = appReducer.actions