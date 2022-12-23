import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
    totalCost: number
}

let initialState: CartState = {
    totalCost: 0
}

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        increaseTotalCost(state, action: PayloadAction<number>){
            state.totalCost = state.totalCost + action.payload
        },
        decreaseTotalCost(state, action: PayloadAction<number>){
            state.totalCost = state.totalCost - action.payload
        }
    }
})

export default cartReducer.reducer
export const {decreaseTotalCost, increaseTotalCost} = cartReducer.actions