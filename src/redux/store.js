import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "./Reducer/authorSlice";
import cartSlice from "./Reducer/cartSlice";
import favoriteSlice from "./Reducer/favoriteSlice";
import genreSlice from "./Reducer/genreSlice";
import productsSlice from "./Reducer/productsSlice";
import { UserReducer } from "./Reducer/UserReducer";
import { addCheckOutReducer } from "./Reducer/CheckOutReducer";


const store = configureStore({
    reducer: {
        cart : cartSlice,
        user: UserReducer,
        products: productsSlice,
        genre: genreSlice,
        favories : favoriteSlice,
        author : authorSlice,
        checkout: addCheckOutReducer
    }
})


export default store;