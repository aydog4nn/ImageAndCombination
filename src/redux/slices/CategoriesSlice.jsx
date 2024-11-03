import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allCategories: [],
    category: [],
    loading: false,
    error: null,
};

const BASE_URL = "http://localhost:8080/api/category";

export const fetchCategoryById = createAsyncThunk(
    "categories/fetchCategoryById",
    async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        console.log(response.data);
        return response.data;
    }
);

export const fetchAllCategory = createAsyncThunk(
    "categories/fetchAllCategory",
    async () => {
        const response = await axios.get(BASE_URL);
        console.log(response.data)
        return response.data;
    }
);






export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (category) => {
        const response = await axios.post(BASE_URL, category);
        console.log("Gönderilen veri:", response.data);
        return response.data;
    }
);

const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.category.push(action.payload);
                state.loading = false;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.allCategories = action.payload;
            })


    }
});

export const selectCategoryById = (state, id) =>
    state.category.categories.find((category) => category.id === id);

export default CategoriesSlice.reducer;
