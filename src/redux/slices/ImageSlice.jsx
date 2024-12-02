import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    data: null,
}

const BASE_URL = "http://localhost:8080/api/file/upload";

// API'ye fotoğraf yükleme işlemi
export const uploadPhoto = createAsyncThunk(
    "image/uploadImage",
    async (photo, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", photo); // Fotoğrafı form-data formatında gönderiyoruz

            const response = await axios.post(BASE_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data; // JSON yanıtını döndürüyoruz
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fotoğraf yüklenirken hata oluştu.");
        }
    }
);

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
            .addCase(uploadPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // API'den gelen JSON verisi
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = photoSlice.actions;

export default photoSlice.reducer;