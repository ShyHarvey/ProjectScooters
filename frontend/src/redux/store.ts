import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import scootersCatalogReducer from "./scootersCatalogReducer";
import favoritesReducer from "./favoritesReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    catalog: scootersCatalogReducer,
    favorites: favoritesReducer
})

const store = configureStore({
    reducer: rootReducer,
})


export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch