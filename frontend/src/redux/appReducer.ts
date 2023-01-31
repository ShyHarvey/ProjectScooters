import { createSlice } from '@reduxjs/toolkit'



type App = {
    theme: 'light' | 'dark'
}

let initialState: App = {
    theme: 'light'
}

export const appReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light'
        }
    }
})

export default appReducer.reducer
export const { toggleTheme } = appReducer.actions