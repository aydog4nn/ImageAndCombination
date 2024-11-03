import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./slices/UserSlice.jsx"
import CategoriesSlice from "./slices/CategoriesSlice.jsx";
import ProductSlice from "./slices/ProductSlice.jsx"

export const store = configureStore({
    reducer: {
        users: UserSlice,
        categories : CategoriesSlice,
        products : ProductSlice,
    },
})


