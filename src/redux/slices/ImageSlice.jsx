import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    productData: null,
    userData: null,
}

const BASE_URL = "http://localhost:8080/api/products/file";
const BASE_URL2 = "http://localhost:8080/api/users/file";
// API'ye fotoğraf yükleme işlemi
export const uploadToProductPhoto = createAsyncThunk(
    "image/uploadToProductPhoto",
    async ({photo,id},{ rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", photo); // Fotoğrafı form-data formatında gönderiyoruz

            const response = await axios.post(`${BASE_URL}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data)
            return response.data; // JSON yanıtını döndürüyoruz
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fotoğraf yüklenirken hata oluştu.");
        }
    }
);

export const uploadToUserPhoto = createAsyncThunk(
    "image/uploadToUserPhoto",
    async (photo,id,{ rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", photo);

            const response = await axios.post(`${BASE_URL2}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fotograf yuklenirken hata olustu.")
        }

    }
)

const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadToProductPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadToProductPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.productData = action.payload; // API'den gelen JSON verisi
            })
            .addCase(uploadToProductPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(uploadToUserPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadToUserPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload; // API'den gelen JSON verisi
            })
            .addCase(uploadToUserPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetState } = photoSlice.actions;

export default photoSlice.reducer;