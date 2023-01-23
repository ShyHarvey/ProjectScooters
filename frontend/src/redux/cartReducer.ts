import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Scooter } from './scootersCatalogReducer'


export interface ScooterForCart extends Scooter {
    number: number
}

type CartState = {
    totalCost: number
    totalNumber: number
    cartItems: ScooterForCart[]
}

let initialState: CartState = {
    totalCost: 0,
    totalNumber: 0,
    cartItems: []
}

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<ScooterForCart>) {
            let index = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.cartItems[index].number = state.cartItems[index].number + 1
            } else {
                state.cartItems.push(action.payload)
            }
            state.totalNumber = state.totalNumber + 1
            state.totalCost = state.totalCost + +action.payload.cost
        },
        reduceItemCountInCart(state, action: PayloadAction<ScooterForCart>) {
            let index = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (state.cartItems[index].number > 1) {
                state.cartItems[index].number = state.cartItems[index].number - 1
            } else {

            }
            state.totalNumber = state.totalNumber - 1
            state.totalCost = state.totalCost - +action.payload.cost
        },
        deleteItemFromCart(state, action: PayloadAction<{ id: number, cost: string, number: number }>) {
            let index = state.cartItems.findIndex(item => item.id === action.payload.id)
            state.cartItems.splice(index, 1)
            state.totalCost = state.totalCost - (+action.payload.cost * action.payload.number)
            state.totalNumber = state.totalNumber - action.payload.number
        }

    }
})

export default cartReducer.reducer
export const { addItemToCart, reduceItemCountInCart, deleteItemFromCart } = cartReducer.actions