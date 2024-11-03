import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    products: [],
    allProducts: [],
    selectedProduct: {},
    loading: false,
    error: null,
}

const BASE_URL_PRODUCTS = "http://localhost:8080/api/products";


export const addProducts = createAsyncThunk(
    "categories/addProducts",
    async (products) => {
        const response = await axios.post(BASE_URL_PRODUCTS, products);
        console.log("Gönderilen ürünler:", response.data);
        return response.data;
    }
)

export const fetchAllProduct = createAsyncThunk(
    "categories/fetchAllProduct",
    async () => {
        const response = await axios.get(BASE_URL_PRODUCTS);
        console.log(response.data)
        return response.data;
    }
)

export const fetchProductsById = createAsyncThunk(
    "categories/fetchProducts",
    async (id) => {

        const response = await axios.get(BASE_URL_PRODUCTS + "/" + id);
        console.log(
            response.data
        )
        return response.data;
    }
)

const ProductSlice = createSlice({

        name: "products",
        initialState,
        reducers: {
            setSelectedProduct: (state, action) => {
                state.selectedProduct = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(addProducts.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addProducts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.products.push(action.payload)
                })
                .addCase(addProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message
                })

                .addCase(fetchAllProduct.pending, (state ) => {
                    state.loading = true;
                })
                .addCase(fetchAllProduct.fulfilled, (state, action) => {
                    state.loading = false;
                    state.allProducts = action.payload;
                })
                .addCase(fetchAllProduct.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message
                })

                .addCase(fetchProductsById.pending, (state) => {
                    state.loading = true;
                })
                .addCase(fetchProductsById.fulfilled, (state, action) => {
                    state.loading = false;
                    state.selectedProduct = action.payload;
                })
                .addCase(fetchProductsById.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message
                })
        }


    }
)

export const {setSelectedProduct} = ProductSlice.actions

export default ProductSlice.reducer