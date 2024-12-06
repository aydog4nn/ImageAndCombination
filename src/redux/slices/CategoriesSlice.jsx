import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allCategories: [],
    selectedCategory : [],
    categoryProducts: [],
    loading: false,
    error: null,
};

const BASE_URL = "http://localhost:8080/api/category";

export const fetchCategoryById = createAsyncThunk(
    "categories/fetchCategoryById",
    async (categoryId) => {
        const response = await axios.get(`${BASE_URL}/${categoryId}`);
        console.log(response.data);
        return response.data;
    }
);

export const fetchAllCategory = createAsyncThunk(
    "categories/fetchAllCategory",
    async () => {
        const response = await axios.get(BASE_URL);
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

export const selectCategoryById = (state, categoryId) => {
    const categories = state.categories.allCategories;
    return categories ? categories.find((category) => category.id === categoryId) : undefined;
}

export const fetchProductsByCategoryId = createAsyncThunk(
    "categories/fetchProductsByCategoryId",
    async (categoryId,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/${categoryId}/products`);
            console.log("Products fetched:",response.data);
            return response.data;
        }
        catch (error) {
            console.error("Error fetcing products:",error);
            return rejectWithValue(error.message);
        }
    }
)

// eslint-disable-next-line react-refresh/only-export-components
const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
        },
    },
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
                state.selectedCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.allCategories = action.payload;
            })
            .addCase(fetchAllCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductsByCategoryId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryProducts = action.payload;
            })
            .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});


export const selectedProductsByCategory = (state) => state.categories.categoryProducts;
export const {setSelectedCategory} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
